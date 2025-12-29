# Database Documentation Index

Welcome to the StudyEasily database documentation. This directory contains everything you need to set up and use the database for the StudyEasily learning management system.

## 📚 Documentation Files

### 🚀 Quick Start
- **[QUICKSTART.md](QUICKSTART.md)** - Fast setup guide for developers who want to get started quickly
  - MySQL setup in 5 steps
  - PostgreSQL setup in 5 steps
  - Verification commands

### 📖 Complete Guide
- **[README.md](README.md)** - Comprehensive database setup guide
  - Detailed installation instructions for MySQL and PostgreSQL
  - Step-by-step setup process
  - Environment configuration
  - Troubleshooting section
  - Backup and restore procedures

### 📊 Schema Files
- **[schema.sql](schema.sql)** - MySQL database schema (206 lines)
  - All 8 tables with relationships
  - Indexes and foreign keys
  - Sample data for testing
  
- **[schema-postgresql.sql](schema-postgresql.sql)** - PostgreSQL database schema (245 lines)
  - PostgreSQL-specific features (ENUM types, triggers)
  - All 8 tables with relationships
  - Indexes and foreign keys
  - Sample data for testing

### 🔄 Migration & Integration
- **[MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)** - Complete migration guide
  - How to migrate from mock data to real database
  - Step-by-step backend integration
  - API route examples
  - Authentication implementation
  - Gradual migration strategy

### 📋 Reference Documentation
- **[SCHEMA_DIAGRAM.md](SCHEMA_DIAGRAM.md)** - Visual database schema
  - ASCII diagram of all tables and relationships
  - Explanation of table purposes
  - Key relationships summary

- **[API_QUERIES.md](API_QUERIES.md)** - Complete query reference (540 lines)
  - User management queries
  - Course operations
  - Enrollment management
  - Lesson progress tracking
  - Quiz and assessment queries
  - Certificate generation
  - Advanced queries with JOINs
  - Performance tips

## 🎯 Database Schema Overview

The database consists of **8 tables** organized in phases:

### FASE 2 - Core Tables (Required)
1. **users** - All user types (student, instructor, admin, tutor)
2. **courses** - Course catalog
3. **enrollments** - Student-course relationships

### FASE 3 - Content
4. **lessons** - Course lessons
5. **lesson_progress** - Student progress tracking

### FASE 4 - Assessment (Optional)
6. **quizzes** - Course quizzes
7. **quiz_results** - Quiz scores

### FASE 5 - Certificates (Optional)
8. **certificates** - Course completion certificates

## 🔗 Relationships

```
USERS → COURSES (instructor)
USERS ↔ COURSES (enrollments)
USERS → LESSON_PROGRESS → LESSONS
USERS → QUIZ_RESULTS → QUIZZES
USERS → CERTIFICATES ↔ COURSES
COURSES → LESSONS
COURSES → QUIZZES
```

## ⚡ Quick Setup Commands

### MySQL
```bash
mysql -u root -p < database/schema.sql
echo 'DATABASE_URL="mysql://user:pass@localhost:3306/studyeasily"' >> .env.local
```

### PostgreSQL
```bash
psql -U postgres -d studyeasily -f database/schema-postgresql.sql
echo 'DATABASE_URL="postgresql://user:pass@localhost:5432/studyeasily"' >> .env.local
```

## 📊 Features

- ✅ Foreign key constraints with CASCADE delete
- ✅ Indexes on frequently queried columns
- ✅ UTF-8 support (utf8mb4)
- ✅ Automatic timestamp updates
- ✅ Unique constraints
- ✅ Sample data included
- ✅ Password hashing examples

## 🔍 Finding What You Need

**I want to...**

- **Set up the database quickly** → See [QUICKSTART.md](QUICKSTART.md)
- **Understand the complete setup** → See [README.md](README.md)
- **See the database structure** → See [SCHEMA_DIAGRAM.md](SCHEMA_DIAGRAM.md)
- **Write backend queries** → See [API_QUERIES.md](API_QUERIES.md)
- **Migrate from mock data** → See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- **Install the schema** → Use [schema.sql](schema.sql) or [schema-postgresql.sql](schema-postgresql.sql)

## 🆘 Getting Help

1. Check [README.md](README.md) troubleshooting section
2. Verify your database is running
3. Check connection credentials in `.env.local`
4. Review the query examples in [API_QUERIES.md](API_QUERIES.md)

## 🚀 Next Steps

1. **Choose your database**: MySQL or PostgreSQL
2. **Follow quick start**: See [QUICKSTART.md](QUICKSTART.md)
3. **Import schema**: Use appropriate `.sql` file
4. **Verify setup**: Check tables with `SHOW TABLES` or `\dt`
5. **Start building**: Use queries from [API_QUERIES.md](API_QUERIES.md)
6. **Plan migration**: When ready, see [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)

---

**Total Documentation**: 2,081 lines of comprehensive guides, schemas, and examples

For more information about the StudyEasily project, see the main [README.md](../README.md).
