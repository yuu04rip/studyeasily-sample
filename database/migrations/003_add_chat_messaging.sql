-- =====================================================
-- Migration: Add Chat and Messaging System
-- Created: 2026-01-05
-- Description: Adds tables for chat, messaging, groups, and document sharing
-- =====================================================

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    type ENUM('one-to-one', 'group', 'course') NOT NULL DEFAULT 'one-to-one',
    course_id INT NULL,
    avatar VARCHAR(255),
    is_18_plus BOOLEAN DEFAULT FALSE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_course (course_id),
    INDEX idx_created_by (created_by),
    INDEX idx_18_plus (is_18_plus)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create chat participants table
CREATE TABLE IF NOT EXISTS chat_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('member', 'admin', 'instructor') DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_read_at TIMESTAMP NULL,
    
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_participant (chat_id, user_id),
    INDEX idx_chat (chat_id),
    INDEX idx_user (user_id),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NOT NULL,
    author_id INT NOT NULL,
    message_type ENUM('text', 'document', 'image', 'video', 'link') DEFAULT 'text',
    text TEXT,
    file_url VARCHAR(500),
    file_name VARCHAR(255),
    file_size INT,
    status ENUM('sent', 'delivered', 'read') DEFAULT 'sent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_chat (chat_id),
    INDEX idx_author (author_id),
    INDEX idx_type (message_type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create message reactions table (optional)
CREATE TABLE IF NOT EXISTS message_reactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_id INT NOT NULL,
    user_id INT NOT NULL,
    emoji VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_reaction (message_id, user_id, emoji),
    INDEX idx_message (message_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for testing
-- Create sample chats
INSERT INTO chats (name, type, created_by, course_id) VALUES
('Prof. Mario Bianchi', 'one-to-one', 4, NULL),
('Gruppo React Avanzato', 'group', 4, 2),
('Corso Web Development - Discussione', 'course', 2, 1);

-- Add chat participants
INSERT INTO chat_participants (chat_id, user_id, role) VALUES
-- One-to-one chat
(1, 4, 'member'),
(1, 2, 'member'),
-- Group chat
(2, 4, 'member'),
(2, 2, 'instructor'),
-- Course chat
(3, 4, 'member'),
(3, 5, 'member'),
(3, 2, 'instructor');

-- Add sample messages
INSERT INTO messages (chat_id, author_id, message_type, text, status) VALUES
-- One-to-one chat messages
(1, 4, 'text', 'Buongiorno Prof! Ho una domanda sull\'esercizio 3', 'read'),
(1, 2, 'text', 'Ciao Marco! Certo, dimmi pure', 'read'),
(1, 4, 'text', 'Non capisco come implementare il useCallback nel secondo componente', 'read'),
(1, 2, 'text', 'Ottimo lavoro sull\'esercizio!', 'delivered'),

-- Group chat messages
(2, 4, 'text', 'Qualcuno può aiutarmi con useEffect?', 'read'),
(2, 2, 'text', 'Certo! useEffect si usa per gli effetti collaterali...', 'read'),

-- Course chat messages
(3, 4, 'text', 'Quando sarà la prossima lezione?', 'read'),
(3, 2, 'text', 'La prossima lezione è giovedì alle 14:00', 'delivered');

-- Rollback instructions:
-- To undo this migration, run:
-- DROP TABLE IF EXISTS message_reactions;
-- DROP TABLE IF EXISTS messages;
-- DROP TABLE IF EXISTS chat_participants;
-- DROP TABLE IF EXISTS chats;
