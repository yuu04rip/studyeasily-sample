-- =====================================================
-- Migration: Add Calendar Events System
-- Created: 2026-01-05
-- Description: Adds tables for calendar events and scheduling
-- =====================================================

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    color VARCHAR(7) DEFAULT '#9B6BFF',
    event_type ENUM('lesson', 'exam', 'meeting', 'workshop', 'other') DEFAULT 'other',
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_pattern VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_start_time (start_time),
    INDEX idx_end_time (end_time),
    INDEX idx_event_type (event_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create event participants table (for shared events)
CREATE TABLE IF NOT EXISTS event_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('invited', 'accepted', 'declined', 'tentative') DEFAULT 'invited',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_participant (event_id, user_id),
    INDEX idx_event (event_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for testing
INSERT INTO events (user_id, title, description, start_time, end_time, color, event_type) VALUES
-- Admin user events
(1, 'Lezione Matematica', 'Link: zoom/abc123', '2025-12-03 10:00:00', '2025-12-03 11:30:00', '#FF66D7', 'lesson'),
(1, 'Esame React', 'Esame finale del corso React', '2025-12-10 09:00:00', '2025-12-10 12:00:00', '#9B6BFF', 'exam'),
(1, 'Workshop Python', 'Workshop pratico su data science', '2025-12-15 14:00:00', '2025-12-15 17:00:00', '#35D6C6', 'workshop'),

-- Demo student events
(4, 'Tutoring Session', 'Sessione di tutoring individuale', '2025-12-05 16:00:00', '2025-12-05 17:00:00', '#FF66D7', 'meeting'),
(4, 'Team Project Meeting', 'Riunione settimanale del team', '2025-12-08 11:00:00', '2025-12-08 12:30:00', '#9B6BFF', 'meeting'),
(4, 'JavaScript Avanzato', 'Lezione su patterns avanzati JS', '2025-12-20 10:00:00', '2025-12-20 12:00:00', '#35D6C6', 'lesson');

-- Rollback instructions:
-- To undo this migration, run:
-- DROP TABLE IF EXISTS event_participants;
-- DROP TABLE IF EXISTS events;
