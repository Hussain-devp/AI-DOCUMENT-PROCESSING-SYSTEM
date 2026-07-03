package java_app;

import java.util.List;

/**
 * ReportGenerator generates system-wide analytics reports.
 */
public class ReportGenerator {
    
    public void generateSummaryReport(List<Document> documents) {
        System.out.println("System Summary Report");
        System.out.println("---------------------");
        System.out.println("Total Documents: " + documents.size());
        
        long processed = documents.stream().filter(d -> "Processed".equals(d.getStatus())).count();
        System.out.println("Processed: " + processed);
        
        System.out.println("Recent Activities:");
        documents.stream().limit(5).forEach(d -> System.out.println("- " + d.getName() + " (" + d.getCategory() + ")"));
    }
}
