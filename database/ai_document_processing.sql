-- AI Document Processing System Database Schema
-- Created for local MySQL environment

CREATE DATABASE IF NOT EXISTS ai_document_processing;
USE ai_document_processing;

-- 1. Documents Table
-- Stores metadata and raw text of uploaded documents
CREATE TABLE IF NOT EXISTS Documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    raw_text TEXT,
    file_path VARCHAR(500),
    status VARCHAR(20) DEFAULT 'Pending',
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. ExtractedData Table
-- Stores structured fields extracted from documents
CREATE TABLE IF NOT EXISTS ExtractedData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT,
    field_name VARCHAR(100),
    field_value TEXT,
    FOREIGN KEY (document_id) REFERENCES Documents(id) ON DELETE CASCADE
);

-- 3. Reports Table
-- Stores information about generated reports
CREATE TABLE IF NOT EXISTS Reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_name VARCHAR(255),
    type VARCHAR(50),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_path VARCHAR(500)
);

-- Sample Data
INSERT INTO Documents (name, category, status, raw_text) VALUES 
('resume_john.pdf', 'Resume', 'Processed', 'John Smith, Software Engineer...'),
('invoice_442.png', 'Invoice', 'Processed', 'Vendor: Tech Solutions, Total: $500...'),
('certificate_aws.jpg', 'Certificate', 'Processed', 'Certificate of Completion for AWS Solution Architect...');

INSERT INTO ExtractedData (document_id, field_name, field_value) VALUES 
(1, 'Name', 'John Smith'),
(1, 'Skills', 'Java, Spring, MySQL'),
(2, 'Invoice Number', 'INV-442'),
(2, 'Total Amount', '$500');
