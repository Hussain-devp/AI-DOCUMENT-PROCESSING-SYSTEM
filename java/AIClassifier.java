package java_app;

/**
 * AIClassifier classifies documents into categories.
 */
public class AIClassifier {
    
    public String classify(String text) {
        text = text.toLowerCase();
        
        if (text.contains("invoice") || text.contains("total amount") || text.contains("vendor")) {
            return "Invoice";
        } else if (text.contains("resume") || text.contains("experience") || text.contains("skills")) {
            return "Resume";
        } else if (text.contains("certificate") || text.contains("candidate") || text.contains("successfully completed")) {
            return "Certificate";
        } else if (text.contains("medical") || text.contains("hospital") || text.contains("patient")) {
            return "Medical Report";
        } else if (text.contains("id card") || text.contains("date of birth") || text.contains("license")) {
            return "ID Card";
        }
        
        return "Other";
    }
}
