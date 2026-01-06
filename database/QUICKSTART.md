# Quick Start Guide - Database Setup

This is a quick reference for setting up the StudyEasily database. For detailed instructions, see [README.md](README.md).

## ⚡ Quick Setup

### MySQL (Recommended for Development)

```bash
# 1. Install MySQL (if needed)
brew install mysql                    # macOS
# OR
sudo apt install mysql-server         # Ubuntu/Debian

# 2. Start MySQL
brew services start mysql             # macOS
# OR
sudo systemctl start mysql            # Linux

# 3. Create database and user
mysql -u root -p
```

```sql
CREATE DATABASE studyeasily CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'studyeasily_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON studyeasily.* TO 'studyeasily_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```bash
# 4. Import schema
Get-Content .\database\schema.sql | mysql -h 127.0.0.1 -P 3310 -u studyeasily_user -p studyeasily

# 5. Update .env.local
echo 'DATABASE_URL="mysql://studyeasily_user:your_password@localhost:3306/studyeasily"' >> .env.local
```

### PostgreSQL

```bash
# 1. Install PostgreSQL
brew install postgresql@14            # macOS
# OR
sudo apt install postgresql           # Ubuntu/Debian

# 2. Start PostgreSQL
brew services start postgresql@14     # macOS
# OR
sudo systemctl start postgresql       # Linux

# 3. Create database and user
sudo -u postgres psql
```

```sql
CREATE USER studyeasily_user WITH PASSWORD 'your_password';
CREATE DATABASE studyeasily OWNER studyeasily_user;
GRANT ALL PRIVILEGES ON DATABASE studyeasily TO studyeasily_user;
\q
```

```bash
# 4. Import schema
psql -U studyeasily_user -d studyeasily -f database/schema-postgresql.sql

# 5. Update .env.local
echo 'DATABASE_URL="postgresql://studyeasily_user:your_password@localhost:5432/studyeasily"' >> .env.local
```

## 📋 Verify Installation

### MySQL
```bash
mysql -u studyeasily_user -p studyeasily -e "SHOW TABLES;"
```

### PostgreSQL
```bash
psql -U studyeasily_user -d studyeasily -c "\dt"
```

You should see 8 tables:
- users
- courses
- enrollments
- lessons
- lesson_progress
- quizzes
- quiz_results
- certificates

## 🎯 What's Included

The schema includes:
- ✅ All required tables with proper relationships
- ✅ Foreign key constraints with CASCADE delete
- ✅ Indexes on frequently queried columns
- ✅ Sample data for testing
- ✅ Role-based user system (student, instructor, admin, tutor)

## 📚 Available Documentation

- **[README.md](README.md)** - Complete setup guide with troubleshooting
- **[SCHEMA_DIAGRAM.md](SCHEMA_DIAGRAM.md)** - Visual schema diagram
- **[API_QUERIES.md](API_QUERIES.md)** - Example queries for backend API

## 🔒 Sample Test Users

The schema includes sample users (passwords should be hashed in production):

| Email | Role | Password Hash |
|-------|------|---------------|
| admin@studyeasily.com | admin | (bcrypt hash) |
| john.doe@studyeasily.com | instructor | (bcrypt hash) |
| jane.smith@studyeasily.com | instructor | (bcrypt hash) |
| demo@studyeasily.com | student | (bcrypt hash) |
| test@studyeasily.com | student | (bcrypt hash) |

## 🚀 Next Steps

1. **Backend Integration**: See [API_QUERIES.md](API_QUERIES.md) for query examples
2. **Connection Pooling**: Implement connection pooling for production
3. **Password Hashing**: Use bcrypt for password hashing
4. **Environment Variables**: Secure your `.env.local` file

## ⚠️ Important Notes

- **Development Only**: The sample passwords are for testing only
- **Production**: Use strong passwords and proper security measures
- **Backups**: Set up regular database backups
- **Migrations**: Consider using a migration tool (e.g., Prisma, TypeORM) for schema changes

## 🆘 Common Issues

### Connection refused
```bash
# Check if database is running
# MySQL
brew services list | grep mysql
# PostgreSQL
brew services list | grep postgresql
```

### Access denied
```bash
# Reset password (MySQL)
ALTER USER 'studyeasily_user'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

### Table already exists
```bash
# Drop database and recreate
DROP DATABASE studyeasily;
CREATE DATABASE studyeasily;
```

---

For more help, see the [full documentation](README.md) or check the [troubleshooting section](README.md#-troubleshooting).
