package java_app;

import java.util.Date;

/**
 * Document POJO representing a document record in the system.
 */
public class Document {
    private int id;
    private String name;
    private String category;
    private String rawText;
    private String filePath;
    private Date uploadDate;
    private String status;

    public Document() {}

    public Document(String name, String category, String filePath) {
        this.name = name;
        this.category = category;
        this.filePath = filePath;
        this.uploadDate = new Date();
        this.status = "Pending";
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getRawText() { return rawText; }
    public void setRawText(String rawText) { this.rawText = rawText; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public Date getUploadDate() { return uploadDate; }
    public void setUploadDate(Date uploadDate) { this.uploadDate = uploadDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "Document{" + "id=" + id + ", name='" + name + '\'' + ", category='" + category + '\'' + '}';
    }
}
