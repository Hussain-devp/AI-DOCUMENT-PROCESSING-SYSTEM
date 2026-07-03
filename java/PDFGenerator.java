package java_app;

import java.io.FileWriter;
import java.io.IOException;

/**
 * PDFGenerator simulates generating a PDF report.
 * In a real environment, this would use iText or Apache PDFBox.
 */
public class PDFGenerator {
    
    public void generate(Document doc) {
        String fileName = "reports/" + doc.getName() + "_report.pdf";
        System.out.println("Generating PDF report: " + fileName);
        
        try (FileWriter writer = new FileWriter(fileName.replace(".pdf", ".txt"))) {
            writer.write("AI DOCUMENT PROCESSING SYSTEM - REPORT\n");
            writer.write("====================================\n");
            writer.write("Document Name: " + doc.getName() + "\n");
            writer.write("Category: " + doc.getCategory() + "\n");
            writer.write("Upload Date: " + doc.getUploadDate() + "\n\n");
            writer.write("EXTRACTED TEXT:\n");
            writer.write(doc.getRawText());
            System.out.println("Report generated successfully (as .txt for demo).");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
