-- =====================================================
-- Migration: Add Grades System
-- Created: 2026-01-05
-- Description: Adds tables for tracking student grades, assignments, and assessments
-- =====================================================

-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    grade DECIMAL(5,2) NOT NULL,
    max_grade DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    type ENUM('quiz', 'exam', 'assignment', 'project') NOT NULL DEFAULT 'assignment',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_course (course_id),
    INDEX idx_subject (subject),
    INDEX idx_type (type),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for testing
INSERT INTO grades (user_id, course_id, title, subject, grade, max_grade, type, date) VALUES
-- Admin user grades
(1, 1, 'HTML Basics Quiz', 'Web Development', 90.00, 100.00, 'quiz', '2024-11-20 10:00:00'),
(1, 3, 'Python Final Exam', 'Data Science', 87.00, 100.00, 'exam', '2024-12-05 11:00:00'),

-- Demo student grades
(4, 1, 'HTML Basics Quiz', 'Web Development', 85.00, 100.00, 'quiz', '2024-11-15 10:00:00'),
(4, 1, 'CSS Flexbox Assignment', 'Web Development', 92.00, 100.00, 'assignment', '2024-11-22 10:00:00'),
(4, 2, 'React Hooks Exam', 'Frontend Development', 78.00, 100.00, 'exam', '2024-11-18 14:00:00'),
(4, 2, 'State Management Quiz', 'Frontend Development', 88.00, 100.00, 'quiz', '2024-11-25 14:00:00'),

-- Test student grades
(5, 3, 'NumPy Assignment', 'Data Science', 95.00, 100.00, 'assignment', '2024-12-01 09:00:00');

-- Rollback instructions:
-- To undo this migration, run:
-- DROP TABLE IF EXISTS grades;
