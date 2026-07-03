package java_app;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * InformationExtractor parses important fields based on document type.
 */
public class InformationExtractor {
    
    public Map<String, String> extractInfo(String text, String category) {
        Map<String, String> data = new HashMap<>();
        
        switch (category) {
            case "Invoice":
                data.put("Invoice Number", findPattern(text, "Invoice No: (\\S+)"));
                data.put("Date", findPattern(text, "Date: (\\S+)"));
                data.put("Customer", findPattern(text, "Customer: (.+)"));
                data.put("Amount", findPattern(text, "Total Amount: (.+)"));
                break;
                
            case "Resume":
                data.put("Name", text.split("\n")[0]);
                data.put("Email", findPattern(text, "Email: (\\S+)"));
                data.put("Phone", findPattern(text, "Phone: (\\S+)"));
                data.put("Skills", findPattern(text, "Skills: (.+)"));
                break;
                
            default:
                data.put("Summary", "No specific extraction rules for " + category);
        }
        
        return data;
    }
    
    private String findPattern(String text, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return "Not found";
    }
}
