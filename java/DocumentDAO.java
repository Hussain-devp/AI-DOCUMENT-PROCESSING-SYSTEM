package java_app;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DocumentDAO handles CRUD operations for the Documents table.
 */
public class DocumentDAO {
    
    public void saveDocument(Document doc) {
        String sql = "INSERT INTO Documents (name, category, file_path, status, upload_date) VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            pstmt.setString(1, doc.getName());
            pstmt.setString(2, doc.getCategory());
            pstmt.setString(3, doc.getFilePath());
            pstmt.setString(4, doc.getStatus());
            pstmt.setTimestamp(5, new Timestamp(doc.getUploadDate().getTime()));
            
            pstmt.executeUpdate();
            
            ResultSet rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                doc.setId(rs.getInt(1));
            }
            System.out.println("Document saved with ID: " + doc.getId());
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Document> getAllDocuments() {
        List<Document> documents = new ArrayList<>();
        String sql = "SELECT * FROM Documents ORDER BY upload_date DESC";
        
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                Document doc = new Document();
                doc.setId(rs.getInt("id"));
                doc.setName(rs.getString("name"));
                doc.setCategory(rs.getString("category"));
                doc.setRawText(rs.getString("raw_text"));
                doc.setFilePath(rs.getString("file_path"));
                doc.setUploadDate(rs.getTimestamp("upload_date"));
                doc.setStatus(rs.getString("status"));
                documents.add(doc);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return documents;
    }

    public void updateDocumentText(int id, String text, String category) {
        String sql = "UPDATE Documents SET raw_text = ?, category = ?, status = 'Processed' WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, text);
            pstmt.setString(2, category);
            pstmt.setInt(3, id);
            pstmt.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
