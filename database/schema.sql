-- =====================================================
-- StudyEasily Database Schema
-- MySQL/PostgreSQL Compatible Schema
-- =====================================================

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS question_options;
DROP TABLE IF EXISTS test_questions;
DROP TABLE IF EXISTS course_tests;
DROP TABLE IF EXISTS course_materials;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS chat_participants;
DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS groups;
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
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'instructor', 'admin', 'tutor') NOT NULL DEFAULT 'student',
    avatar VARCHAR(500),
    birth_date DATE,
    description TEXT,
    online_status ENUM('online', 'offline', 'do-not-disturb') DEFAULT 'online',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_online_status (online_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2️⃣ COURSES Table
-- Course catalog with instructor assignment
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id INT NOT NULL,
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    image VARCHAR(500),
    theme_color VARCHAR(7) DEFAULT '#6366f1',
    banner_image VARCHAR(500),
    custom_css TEXT,
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
-- FASE 6: Chat and Groups Tables
-- =====================================================

-- 9️⃣ GROUPS Table
-- Study groups within courses
CREATE TABLE groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    course_id INT NOT NULL,
    created_by INT NOT NULL,
    description TEXT,
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 🔟 GROUP_MEMBERS Table
-- Members of study groups
CREATE TABLE group_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_group_member (group_id, user_id),
    INDEX idx_group (group_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1️⃣1️⃣ CHATS Table
-- One-on-one and group chats
CREATE TABLE chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('one-to-one', 'group') NOT NULL DEFAULT 'one-to-one',
    group_id INT,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_group (group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1️⃣2️⃣ CHAT_PARTICIPANTS Table
-- Participants in a chat
CREATE TABLE chat_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NOT NULL,
    user_id INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_chat_participant (chat_id, user_id),
    INDEX idx_chat (chat_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1️⃣3️⃣ MESSAGES Table
-- Chat messages
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NOT NULL,
    author_id INT NOT NULL,
    text TEXT NOT NULL,
    status ENUM('sent', 'delivered', 'read') DEFAULT 'sent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_chat (chat_id),
    INDEX idx_author (author_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- FASE 7: Course Materials Tables
-- =====================================================

-- 1️⃣4️⃣ COURSE_MATERIALS Table
-- Materials uploaded to courses (videos, documents, etc.)
CREATE TABLE course_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('video', 'document', 'link', 'image') NOT NULL,
    file_url VARCHAR(500),
    file_size INT,
    order_position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_type (type),
    INDEX idx_order (order_position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1️⃣5️⃣ COURSE_TESTS Table
-- Tests/quizzes created within course builder
CREATE TABLE course_tests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    time_limit INT,
    passing_score DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1️⃣6️⃣ TEST_QUESTIONS Table
-- Questions within course tests
CREATE TABLE test_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id INT NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM('multiple-choice', 'true-false', 'short-answer', 'essay') NOT NULL,
    points INT DEFAULT 1,
    order_position INT DEFAULT 0,
    
    FOREIGN KEY (test_id) REFERENCES course_tests(id) ON DELETE CASCADE,
    INDEX idx_test (test_id),
    INDEX idx_order (order_position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1️⃣7️⃣ QUESTION_OPTIONS Table
-- Answer options for multiple-choice questions
CREATE TABLE question_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    order_position INT DEFAULT 0,
    
    FOREIGN KEY (question_id) REFERENCES test_questions(id) ON DELETE CASCADE,
    INDEX idx_question (question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Sample Data (Optional - for testing)
-- =====================================================

-- Insert sample users (passwords should be hashed with bcrypt in production)
-- Including all new fields: first_name, last_name, avatar, birth_date, description, online_status
-- IMPORTANT: The password hashes below are EXAMPLES ONLY and should be replaced with proper bcrypt hashes
-- generated using a library like bcryptjs before deployment to production
INSERT INTO users (name, first_name, last_name, email, password, role, avatar, online_status) VALUES
('Admin User', 'Admin', 'User', 'admin@studyeasily.com', '$2a$10$example.hash.admin', 'admin', '/assets/avatar-default.jpg', 'online'),
('John Doe', 'John', 'Doe', 'john.doe@studyeasily.com', '$2a$10$example.hash.instructor1', 'instructor', '/assets/avatar-default.jpg', 'online'),
('Jane Smith', 'Jane', 'Smith', 'jane.smith@studyeasily.com', '$2a$10$example.hash.instructor2', 'instructor', '/assets/avatar-default.jpg', 'online'),
('Demo Student', 'Demo', 'Student', 'demo@studyeasily.com', '$2a$10$example.hash.student', 'student', '/assets/avatar-default.jpg', 'online'),
('Test Student', 'Test', 'Student', 'test@studyeasily.com', '$2a$10$example.hash.student2', 'student', '/assets/avatar-default.jpg', 'online');

-- Note: Courses, enrollments, lessons, and other data are intentionally left empty
-- This allows the platform to start fresh and be populated through the UI
-- The system is fully functional with empty data and ready to be populated

-- Sample courses are commented out - uncomment if you want initial data
-- INSERT INTO courses (title, description, instructor_id, status) VALUES
-- ('Introduction to Web Development', 'Learn the fundamentals of web development', 2, 'draft'),
-- ('Advanced React Development', 'Master React hooks and advanced patterns', 3, 'draft');

-- Sample enrollments are commented out
-- INSERT INTO enrollments (user_id, course_id, progress) VALUES
-- (4, 1, 0),
-- (4, 2, 0);

-- Sample lessons are commented out
-- INSERT INTO lessons (course_id, title, content, position) VALUES
-- (1, 'Getting Started', 'Introduction to the course', 1);

-- Sample quizzes are commented out
-- INSERT INTO quizzes (course_id, title) VALUES
-- (1, 'Introduction Quiz');

-- Sample quiz results are commented out
-- INSERT INTO quiz_results (user_id, quiz_id, score) VALUES
-- (4, 1, 0.00);

-- Sample certificates are commented out
-- INSERT INTO certificates (user_id, course_id) VALUES
-- (4, 1);
