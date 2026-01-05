# Database Migrations

This directory contains database migration files for the StudyEasily platform. Each migration adds specific functionality to the database schema.

## Migration Files

### 001_add_grades_system.sql
**Created:** 2026-01-05  
**Purpose:** Adds comprehensive grades and assessment tracking

**Tables Added:**
- `grades` - Stores student grades, scores, and assessment results

**Features:**
- Track grades by course and subject
- Support for multiple assessment types (quiz, exam, assignment, project)
- Percentage-based scoring system
- Historical grade tracking with timestamps

**Sample Data:** Includes sample grades for admin and demo users

---

### 002_add_calendar_events.sql
**Created:** 2026-01-05  
**Purpose:** Adds calendar and event scheduling system

**Tables Added:**
- `events` - Stores calendar events and scheduled activities
- `event_participants` - Tracks event attendees and their response status

**Features:**
- Multiple event types (lesson, exam, meeting, workshop, etc.)
- Color-coded events for visual organization
- Event sharing and participant management
- Support for recurring events
- RSVP status tracking (invited, accepted, declined, tentative)

**Sample Data:** Includes sample events for admin and demo users

---

### 003_add_chat_messaging.sql
**Created:** 2026-01-05  
**Purpose:** Adds comprehensive chat and messaging system

**Tables Added:**
- `chats` - Chat rooms and conversation metadata
- `chat_participants` - Users in each chat with roles
- `messages` - Individual messages with support for multiple types
- `message_reactions` - Optional emoji reactions to messages

**Features:**
- Multiple chat types (one-to-one, group, course-based)
- Document and file sharing capabilities
- Message status tracking (sent, delivered, read)
- Support for text, documents, images, videos, and links
- 18+ content filtering option
- Role-based chat permissions (member, admin, instructor)
- Message reactions with emoji support

**Sample Data:** Includes sample chats and messages for testing

---

## How to Apply Migrations

### MySQL

```bash
# Apply all migrations
mysql -u username -p database_name < migrations/001_add_grades_system.sql
mysql -u username -p database_name < migrations/002_add_calendar_events.sql
mysql -u username -p database_name < migrations/003_add_chat_messaging.sql

# Or apply all at once
cat migrations/*.sql | mysql -u username -p database_name
```

### PostgreSQL

```bash
# Apply all migrations
psql -U username -d database_name -f migrations/001_add_grades_system.sql
psql -U username -d database_name -f migrations/002_add_calendar_events.sql
psql -U username -d database_name -f migrations/003_add_chat_messaging.sql

# Or apply all at once
cat migrations/*.sql | psql -U username -d database_name
```

## Rollback Instructions

Each migration file includes rollback instructions at the bottom. To undo a migration, run the DROP statements in reverse order of application.

### Example Rollback Order:
```sql
-- Rollback migration 003
DROP TABLE IF EXISTS message_reactions;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS chat_participants;
DROP TABLE IF EXISTS chats;

-- Rollback migration 002
DROP TABLE IF EXISTS event_participants;
DROP TABLE IF EXISTS events;

-- Rollback migration 001
DROP TABLE IF EXISTS grades;
```

## Dependencies

These migrations assume that the base schema (from `schema.sql`) has already been applied, including:
- `users` table
- `courses` table
- `enrollments` table

## Notes

- All migrations use `IF NOT EXISTS` to prevent errors if tables already exist
- Foreign key constraints ensure referential integrity
- Appropriate indexes are created for performance
- Sample data is included for testing and development
- All migrations support both MySQL and PostgreSQL with minor adjustments

## Testing

After applying migrations, you can verify the tables were created:

```sql
-- MySQL
SHOW TABLES;
DESCRIBE grades;
DESCRIBE events;
DESCRIBE chats;
DESCRIBE messages;

-- PostgreSQL
\dt
\d grades
\d events
\d chats
\d messages
```

## Future Migrations

When adding new migrations:
1. Use sequential numbering (004_, 005_, etc.)
2. Include a descriptive name
3. Add a header comment with date and description
4. Include rollback instructions
5. Add appropriate indexes for performance
6. Include sample data for testing
7. Update this README with migration details
