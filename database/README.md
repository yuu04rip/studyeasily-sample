# Database Setup Guide

This directory contains the SQL schema for the StudyEasily learning management system. The schema is designed to work with both MySQL and PostgreSQL databases.

## 📋 Database Schema Overview

The database consists of 8 main tables organized in phases:

### FASE 2 - Core Tables (Minimum Required)
1. **users** - All user types (student, instructor, admin, tutor)
2. **courses** - Course catalog with instructor assignment
3. **enrollments** - Student-course relationships (junction table)

### FASE 3 - Course Content
4. **lessons** - Individual lessons within courses
5. **lesson_progress** - Track student lesson completion

### FASE 4 - Assessments (Optional)
6. **quizzes** - Course quizzes
7. **quiz_results** - Student quiz scores

### FASE 5 - Certificates (Optional)
8. **certificates** - Course completion certificates

## 🔄 Entity Relationships

```
USERS
 ├──< COURSES (instructor_id)
 ├──< ENROLLMENTS >── COURSES
 ├──< LESSON_PROGRESS >── LESSONS
 ├──< QUIZ_RESULTS >── QUIZZES
 └──< CERTIFICATES >── COURSES
```

## 🛠️ Setup Instructions

### Option 1: MySQL Setup

#### Prerequisites
- MySQL 8.0 or higher
- MySQL client or workbench

#### Installation Steps

**1. Install MySQL (if not already installed)**

On macOS (using Homebrew):
```bash
brew install mysql
brew services start mysql
```

On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

On Windows:
- Download from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
- Run the installer and follow the wizard

**2. Create Database and User**

Connect to MySQL:
```bash
mysql -u root -p
```

Run the following commands:
```sql
-- Create database
CREATE DATABASE studyeasily CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (replace 'your_password' with a secure password)
CREATE USER 'studyeasily_user'@'localhost' IDENTIFIED BY 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON studyeasily.* TO 'studyeasily_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

**3. Import the Schema**

```bash
mysql -u studyeasily_user -p studyeasily < database/schema.sql
```

**4. Update Environment Variables**

Create or edit `.env.local` in the project root:
```env
DATABASE_URL="mysql://studyeasily_user:your_password@localhost:3306/studyeasily"
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="studyeasily"
DB_USER="studyeasily_user"
DB_PASSWORD="your_password"
```

---

### Option 2: PostgreSQL Setup

#### Prerequisites
- PostgreSQL 14 or higher
- PostgreSQL client (psql)

#### Installation Steps

**1. Install PostgreSQL (if not already installed)**

On macOS (using Homebrew):
```bash
brew install postgresql@14
brew services start postgresql@14
```

On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

On Windows:
- Download from [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)
- Run the installer and follow the wizard

**2. Create Database and User**

Connect to PostgreSQL:
```bash
# On Linux/Mac
sudo -u postgres psql

# On Windows (from pgAdmin or PowerShell)
psql -U postgres
```

Run the following commands:
```sql
-- Create user (replace 'your_password' with a secure password)
CREATE USER studyeasily_user WITH PASSWORD 'your_password';

-- Create database
CREATE DATABASE studyeasily OWNER studyeasily_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE studyeasily TO studyeasily_user;

-- Exit PostgreSQL
\q
```

**3. Import the Schema**

```bash
psql -U studyeasily_user -d studyeasily -f database/schema-postgresql.sql
```

**4. Update Environment Variables**

Create or edit `.env.local` in the project root:
```env
DATABASE_URL="postgresql://studyeasily_user:your_password@localhost:5432/studyeasily"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="studyeasily"
DB_USER="studyeasily_user"
DB_PASSWORD="your_password"
```

---

## 🔍 Verify Installation

### For MySQL:
```bash
mysql -u studyeasily_user -p studyeasily -e "SHOW TABLES;"
```

Expected output:
```
+------------------------+
| Tables_in_studyeasily  |
+------------------------+
| certificates           |
| courses                |
| enrollments            |
| lesson_progress        |
| lessons                |
| quiz_results           |
| quizzes                |
| users                  |
+------------------------+
```

### For PostgreSQL:
```bash
psql -U studyeasily_user -d studyeasily -c "\dt"
```

Expected output:
```
             List of relations
 Schema |      Name       | Type  |      Owner       
--------+-----------------+-------+------------------
 public | certificates    | table | studyeasily_user
 public | courses         | table | studyeasily_user
 public | enrollments     | table | studyeasily_user
 public | lesson_progress | table | studyeasily_user
 public | lessons         | table | studyeasily_user
 public | quiz_results    | table | studyeasily_user
 public | quizzes         | table | studyeasily_user
 public | users           | table | studyeasily_user
```

---

## 🔐 Security Best Practices

1. **Password Hashing**: Always use bcrypt or argon2 to hash passwords before storing
   ```javascript
   const bcrypt = require('bcrypt');
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

2. **Environment Variables**: Never commit `.env.local` or any file containing credentials

3. **Database User**: Use a dedicated database user with limited privileges (not root/postgres)

4. **Connection Pooling**: Use connection pooling in production for better performance

5. **Backups**: Set up regular database backups

---

## 📊 Example Queries

### Enroll a Student in a Course
```sql
INSERT INTO enrollments (user_id, course_id, progress)
VALUES (?, ?, 0);
```

### Get All Courses for a Student
```sql
SELECT c.*
FROM courses c
JOIN enrollments e ON c.id = e.course_id
WHERE e.user_id = ?;
```

### Mark Lesson as Completed
```sql
INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
VALUES (?, ?, TRUE, CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE completed = TRUE, completed_at = CURRENT_TIMESTAMP;
```

### Get Student Progress in a Course
```sql
SELECT 
    c.title AS course_title,
    COUNT(l.id) AS total_lessons,
    COUNT(lp.id) AS completed_lessons,
    ROUND((COUNT(lp.id) / COUNT(l.id)) * 100, 2) AS progress_percentage
FROM courses c
JOIN lessons l ON c.id = l.course_id
LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = ? AND lp.completed = TRUE
WHERE c.id = ?
GROUP BY c.id, c.title;
```

---

## 🧪 Testing with Sample Data

The schema files include sample data that you can use for testing. The sample data includes:
- 5 users (1 admin, 2 instructors, 2 students)
- 4 courses
- 3 enrollments
- 6 lessons
- Sample lesson progress, quizzes, quiz results, and certificates

**Sample Login Credentials** (for testing only):
- Email: `demo@studyeasily.com`
- Password: (hash should be generated and stored using bcrypt)

---

## 🔧 Maintenance

### Backup Database

**MySQL:**
```bash
mysqldump -u studyeasily_user -p studyeasily > backup_$(date +%Y%m%d).sql
```

**PostgreSQL:**
```bash
pg_dump -U studyeasily_user studyeasily > backup_$(date +%Y%m%d).sql
```

### Restore Database

**MySQL:**
```bash
mysql -u studyeasily_user -p studyeasily < backup_20240101.sql
```

**PostgreSQL:**
```bash
psql -U studyeasily_user studyeasily < backup_20240101.sql
```

---

## 📚 Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Database Design Best Practices](https://www.sqlshack.com/learn-sql-database-design/)
- [SQL Performance Tuning](https://use-the-index-luke.com/)

---

## 🆘 Troubleshooting

### Connection Issues

**MySQL - Access Denied:**
```sql
-- Reset user password
ALTER USER 'studyeasily_user'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

**PostgreSQL - Peer Authentication Failed:**
Edit `/etc/postgresql/14/main/pg_hba.conf` and change:
```
local   all   all   peer
```
to:
```
local   all   all   md5
```
Then restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

### Import Errors

If you encounter errors during import, check:
1. Database encoding is UTF-8
2. User has proper permissions
3. No previous tables exist with the same names

---

## 📝 Notes

- The schema uses `ON DELETE CASCADE` for foreign keys to automatically clean up related records
- Indexes are created on frequently queried columns for better performance
- The `updated_at` column is automatically updated on record changes
- All timestamps are stored in UTC

For production use, consider:
- Adding audit logs table
- Implementing soft deletes
- Adding more indexes based on query patterns
- Setting up database replication
- Implementing row-level security (PostgreSQL)
