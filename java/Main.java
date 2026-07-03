package java_app;

import java.util.List;
import java.util.Map;

/**
 * Main class to demonstrate the workflow of the AI Document Processing System.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== AI Document Processing System ===");
        
        // 1. Initialize Components
        DocumentDAO dao = new DocumentDAO();
        OCRProcessor ocr = new OCRProcessor();
        AIClassifier classifier = new AIClassifier();
        InformationExtractor extractor = new InformationExtractor();
        PDFGenerator pdfGen = new PDFGenerator();
        
        // 2. Simulate Upload
        System.out.println("\n[1] Uploading new document...");
        Document newDoc = new Document("invoice_july_2026.png", "Pending", "/uploads/invoice_july_2026.png");
        dao.saveDocument(newDoc);
        
        // 3. Process Document
        System.out.println("\n[2] Processing Document (OCR & AI)...");
        String text = ocr.extractText(newDoc.getFilePath());
        String category = classifier.classify(text);
        
        System.out.println("Detected Category: " + category);
        
        // 4. Extract Information
        System.out.println("\n[3] Extracting Structured Data...");
        Map<String, String> data = extractor.extractInfo(text, category);
        data.forEach((k, v) -> System.out.println(k + ": " + v));
        
        // 5. Update Database
        dao.updateDocumentText(newDoc.getId(), text, category);
        newDoc.setRawText(text);
        newDoc.setCategory(category);
        newDoc.setStatus("Processed");
        
        // 6. Generate Report
        System.out.println("\n[4] Generating PDF Report...");
        pdfGen.generate(newDoc);
        
        // 7. Display Dashboard Stats
        System.out.println("\n[5] Fetching Analytics...");
        List<Document> allDocs = dao.getAllDocuments();
        ReportGenerator reportGen = new ReportGenerator();
        reportGen.generateSummaryReport(allDocs);
        
        System.out.println("\nWorkflows completed successfully.");
    }
}
