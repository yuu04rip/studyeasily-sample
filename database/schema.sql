-- =====================================================
-- StudyEasily Database Schema
-- MySQL/PostgreSQL Compatible Schema
-- =====================================================

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS certificates;
DROP TABLE IF EXISTS quiz_results;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS lesson_progress;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

-- =====================================================
-- FASE 2: Core Tables
-- =====================================================

-- 1️⃣ USERS Table
-- Contains all user types with role-based access
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'instructor', 'admin', 'tutor') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2️⃣ COURSES Table
-- Course catalog with instructor assignment
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id INT NOT NULL,
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_instructor (instructor_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3️⃣ ENROLLMENTS Table
-- Junction table linking students to courses
CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    progress INT DEFAULT 0,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (user_id, course_id),
    INDEX idx_user (user_id),
    INDEX idx_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- FASE 3: Course Content Tables
-- =====================================================

-- 4️⃣ LESSONS Table
-- Individual lessons within courses
CREATE TABLE lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    position INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_position (position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5️⃣ LESSON_PROGRESS Table
-- Track student progress for each lesson
CREATE TABLE lesson_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE KEY unique_lesson_progress (user_id, lesson_id),
    INDEX idx_user (user_id),
    INDEX idx_lesson (lesson_id),
    INDEX idx_completed (completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- FASE 4: Assessment Tables (Optional)
-- =====================================================

-- 6️⃣ QUIZZES Table
-- Quizzes associated with courses
CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7️⃣ QUIZ_RESULTS Table
-- Student quiz results and scores
CREATE TABLE quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_quiz (quiz_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- FASE 5: Certificates Table (Optional)
-- =====================================================

-- 8️⃣ CERTIFICATES Table
-- Course completion certificates
CREATE TABLE certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_certificate (user_id, course_id),
    INDEX idx_user (user_id),
    INDEX idx_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Sample Data (Optional - for testing)
-- =====================================================

-- Insert sample users (passwords should be hashed with bcrypt in production)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@studyeasily.com', '$2a$10$example.hash.admin', 'admin'),
('John Doe', 'john.doe@studyeasily.com', '$2a$10$example.hash.instructor1', 'instructor'),
('Jane Smith', 'jane.smith@studyeasily.com', '$2a$10$example.hash.instructor2', 'instructor'),
('Demo Student', 'demo@studyeasily.com', '$2a$10$example.hash.student', 'student'),
('Test Student', 'test@studyeasily.com', '$2a$10$example.hash.student2', 'student');

-- Insert sample courses
INSERT INTO courses (title, description, instructor_id, status) VALUES
('Introduction to Web Development', 'Learn the fundamentals of web development including HTML, CSS, and JavaScript', 2, 'published'),
('Advanced React Development', 'Master React hooks, context, and advanced patterns', 3, 'published'),
('Python for Data Science', 'Learn Python programming for data analysis and machine learning', 2, 'published'),
('Digital Marketing Masterclass', 'Complete guide to digital marketing strategies and tools', 3, 'draft');

-- Insert sample enrollments
INSERT INTO enrollments (user_id, course_id, progress) VALUES
(4, 1, 65),
(4, 2, 30),
(5, 3, 50);

-- Insert sample lessons
INSERT INTO lessons (course_id, title, content, position) VALUES
(1, 'Getting Started with HTML', 'Introduction to HTML elements and structure', 1),
(1, 'CSS Basics', 'Learn how to style your web pages with CSS', 2),
(1, 'JavaScript Introduction', 'Introduction to JavaScript programming fundamentals', 3),
(2, 'React Hooks Deep Dive', 'Master useState, useEffect, and custom hooks', 1),
(2, 'State Management with Context', 'Learn to manage global state with React Context API', 2),
(2, 'Performance Optimization', 'Optimize your React applications for better performance', 3);

-- Insert sample lesson progress
INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at) VALUES
(4, 1, TRUE, CURRENT_TIMESTAMP),
(4, 2, TRUE, CURRENT_TIMESTAMP),
(4, 4, TRUE, CURRENT_TIMESTAMP);

-- Insert sample quizzes
INSERT INTO quizzes (course_id, title) VALUES
(1, 'HTML Fundamentals Quiz'),
(1, 'CSS Mastery Test'),
(2, 'React Hooks Assessment');

-- Insert sample quiz results
INSERT INTO quiz_results (user_id, quiz_id, score) VALUES
(4, 1, 85.50),
(4, 3, 92.00);

-- Insert sample certificates
INSERT INTO certificates (user_id, course_id) VALUES
(5, 3);
