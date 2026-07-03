package java_app;

/**
 * OCRProcessor simulates text extraction from documents.
 * In a real environment, this would integrate with Tesseract OCR library.
 */
public class OCRProcessor {
    
    public String extractText(String filePath) {
        System.out.println("Processing OCR for: " + filePath);
        // Simulate OCR delay
        try { Thread.sleep(1000); } catch (InterruptedException e) {}
        
        // Mock extracted text based on file name or type
        if (filePath.toLowerCase().contains("invoice")) {
            return "ABC Electronics Pvt. Ltd.\nInvoice No: INV-10245\nDate: 15-06-2026\nCustomer: John Smith\nTotal Amount: INR 18,500\nGST: INR 2,850";
        } else if (filePath.toLowerCase().contains("resume")) {
            return "Jane Doe\nEmail: jane.doe@example.com\nPhone: +1-555-0199\nSkills: Java, SQL, React, AWS\nEducation: B.Tech in Computer Science";
        }
        
        return "Generic extracted text from document...";
    }
}
