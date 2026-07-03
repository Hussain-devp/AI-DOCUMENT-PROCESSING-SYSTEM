import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

if (!fs.existsSync(".env")) {
  fs.writeFileSync(".env", "GEMINI_API_KEY=YOUR_API_KEY_HERE\n");
}
dotenv.config();

console.log("✓ Environment Loaded");

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json({ limit: '10mb' }));

  // Gemini API initialization
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "YOUR_API_KEY_HERE") {
    ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("✓ Gemini API Loaded");
  } else {
    console.error("Gemini API key missing. Add GEMINI_API_KEY to .env");
  }

  // API Route for Document Processing (OCR + Classification + Extraction)
  app.post("/api/process-document", async (req, res) => {
    try {
      const { fileData, mimeType, fileName } = req.body;

      if (!ai || !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
        console.error("Gemini API key missing. Add GEMINI_API_KEY to .env");
        throw new Error("Gemini API key missing. Add GEMINI_API_KEY to .env");
      }

      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: fileData,
                },
              },
              {
                text: `Analyze this document and extract the following information in JSON format:
                1. documentType (One of: Resume, Invoice, Receipt, Certificate, Medical Report, ID Card, Passport, Driving License, PAN Card, Other)
                2. extractedFields (Array of key-value objects representing the extracted data)
                3. keywords (Array of important keywords)
                4. summary (Short 1-sentence summary)
                
                For Resumes, extract ALL available fields: Full Name, Email Address, Phone Number, LinkedIn, GitHub, Portfolio, Address, Career Objective, Education, College Name, Degree, Branch, CGPA, Graduation Year, Technical Skills, Programming Languages, Frameworks, Databases, Tools, Projects, Project Description, Internships, Certifications, Achievements, Languages Known, Strengths, Soft Skills, Experience, Hobbies.
                For Invoices, extract: Invoice Number, Vendor Name, Customer Name, GST Number, Invoice Date, Due Date, Total Amount, Tax, Discount, Payment Status.
                For Certificates, extract: Candidate Name, Course Name, Organization, Issue Date, Certificate ID.
                For Receipts, extract: Merchant, Date, Amount, Payment Method, Transaction ID.
                For Medical Reports, extract: Patient Name, Doctor Name, Hospital, Diagnosis, Prescription, Report Date.
                For ID/Passport/Licenses: Name, ID Number, DOB, Expiry Date, Address.
                
                Also include a confidenceScore (e.g. "98.5%") for the extraction.
                IMPORTANT: If a field is missing, extract its value as "Not Found". Do not guess or hallucinate. Never leave fields blank.`,
              },
            ],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              documentType: { type: Type.STRING },
              extractedFields: { 
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    fieldName: { type: Type.STRING },
                    fieldValue: { type: Type.STRING }
                  },
                  required: ["fieldName", "fieldValue"]
                }
              },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              summary: { type: Type.STRING },
              confidenceScore: { type: Type.STRING },
            },
            required: ["documentType", "extractedFields", "keywords", "summary", "confidenceScore"],
          },
        },
      });

      const result = JSON.parse(response.text);
      
      // Simulating saving the structured fields into a MySQL database
      console.log(`[MySQL DB] Saving structured fields for document: ${fileName}`);
      console.log(`[MySQL DB] INSERT INTO documents (type, confidence) VALUES ('${result.documentType}', '${result.confidenceScore}')`);
      if (Array.isArray(result.extractedFields)) {
          for (const field of result.extractedFields) {
             let valStr = typeof field.fieldValue === 'object' ? JSON.stringify(field.fieldValue) : field.fieldValue;
             console.log(`[MySQL DB] INSERT INTO extracted_data (document_id, field_name, field_value) VALUES (LAST_INSERT_ID(), '${field.fieldName}', '${String(valStr).substring(0, 50)}')`);
          }
      }

      res.json({
        success: true,
        fileName: fileName,
        ...result
      });
    } catch (error: any) {
      console.error("Processing error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✓ Server Running`);
    console.log(`Preview server running on http://localhost:${PORT}`);
  });
}

startServer();
