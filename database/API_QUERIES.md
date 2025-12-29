# API Query Examples

This file contains example SQL queries that your backend API would use to interact with the database.

## 📚 Table of Contents
1. [User Management](#user-management)
2. [Course Operations](#course-operations)
3. [Enrollment Management](#enrollment-management)
4. [Lesson & Progress](#lesson--progress)
5. [Quiz & Results](#quiz--results)
6. [Certificates](#certificates)

---

## User Management

### Register New User
```sql
-- Hash password with bcrypt before storing
INSERT INTO users (name, email, password, role)
VALUES (?, ?, ?, 'student');
```

### Login / Authenticate User
```sql
SELECT id, name, email, role, password
FROM users
WHERE email = ?;
-- Then verify password hash with bcrypt
```

### Get User Profile
```sql
SELECT id, name, email, role, created_at
FROM users
WHERE id = ?;
```

### Update User Profile
```sql
UPDATE users
SET name = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;
```

### Get All Instructors
```sql
SELECT id, name, email
FROM users
WHERE role = 'instructor'
ORDER BY name;
```

---

## Course Operations

### Create New Course
```sql
INSERT INTO courses (title, description, instructor_id, status)
VALUES (?, ?, ?, 'draft');
```

### Get Published Courses (For Course Catalog)
```sql
SELECT 
    c.id,
    c.title,
    c.description,
    c.status,
    c.created_at,
    u.name AS instructor_name,
    COUNT(DISTINCT e.user_id) AS enrolled_count
FROM courses c
JOIN users u ON c.instructor_id = u.id
LEFT JOIN enrollments e ON c.id = e.course_id
WHERE c.status = 'published'
GROUP BY c.id, c.title, c.description, c.status, c.created_at, u.name
ORDER BY c.created_at DESC;
```

### Get Course Details
```sql
SELECT 
    c.*,
    u.name AS instructor_name,
    u.email AS instructor_email,
    COUNT(DISTINCT l.id) AS total_lessons,
    COUNT(DISTINCT e.user_id) AS enrolled_count
FROM courses c
JOIN users u ON c.instructor_id = u.id
LEFT JOIN lessons l ON c.id = l.course_id
LEFT JOIN enrollments e ON c.id = e.course_id
WHERE c.id = ?
GROUP BY c.id, u.name, u.email;
```

### Get Courses by Instructor
```sql
SELECT *
FROM courses
WHERE instructor_id = ?
ORDER BY created_at DESC;
```

### Update Course
```sql
UPDATE courses
SET title = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ? AND instructor_id = ?;
```

### Search Courses
```sql
SELECT 
    c.id,
    c.title,
    c.description,
    c.status,
    u.name AS instructor_name
FROM courses c
JOIN users u ON c.instructor_id = u.id
WHERE c.status = 'published'
  AND (c.title LIKE ? OR c.description LIKE ?)
ORDER BY c.created_at DESC;
-- Use: LIKE '%search_term%'
```

---

## Enrollment Management

### Enroll Student in Course
```sql
-- POST /courses/{id}/enroll
INSERT INTO enrollments (user_id, course_id, progress)
VALUES (?, ?, 0);
```

### Get Student's Enrolled Courses
```sql
SELECT 
    c.*,
    u.name AS instructor_name,
    e.progress,
    e.enrolled_at,
    COUNT(l.id) AS total_lessons
FROM courses c
JOIN enrollments e ON c.id = e.course_id
JOIN users u ON c.instructor_id = u.id
LEFT JOIN lessons l ON c.id = l.course_id
WHERE e.user_id = ?
GROUP BY c.id, u.name, e.progress, e.enrolled_at
ORDER BY e.enrolled_at DESC;
```

### Check if User is Enrolled
```sql
SELECT id
FROM enrollments
WHERE user_id = ? AND course_id = ?;
```

### Update Course Progress
```sql
UPDATE enrollments
SET progress = ?
WHERE user_id = ? AND course_id = ?;
```

### Get Enrollment Statistics
```sql
SELECT 
    c.title,
    COUNT(e.user_id) AS total_enrollments,
    AVG(e.progress) AS average_progress
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.title
ORDER BY total_enrollments DESC;
```

---

## Lesson & Progress

### Create Lesson
```sql
INSERT INTO lessons (course_id, title, content, position)
VALUES (?, ?, ?, ?);
```

### Get Course Lessons (Ordered)
```sql
SELECT *
FROM lessons
WHERE course_id = ?
ORDER BY position ASC;
```

### Get Lesson with Progress (for specific user)
```sql
SELECT 
    l.*,
    COALESCE(lp.completed, FALSE) AS completed,
    lp.completed_at
FROM lessons l
LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = ?
WHERE l.course_id = ?
ORDER BY l.position ASC;
```

### Mark Lesson as Completed
```sql
-- MySQL
INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
VALUES (?, ?, TRUE, CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE 
    completed = TRUE, 
    completed_at = CURRENT_TIMESTAMP;

-- PostgreSQL
INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
VALUES (?, ?, TRUE, CURRENT_TIMESTAMP)
ON CONFLICT (user_id, lesson_id) 
DO UPDATE SET 
    completed = TRUE, 
    completed_at = CURRENT_TIMESTAMP;
```

### Get Student Progress in Course
```sql
SELECT 
    c.id AS course_id,
    c.title AS course_title,
    COUNT(DISTINCT l.id) AS total_lessons,
    COUNT(DISTINCT CASE WHEN lp.completed = TRUE THEN lp.lesson_id END) AS completed_lessons,
    ROUND(
        (COUNT(DISTINCT CASE WHEN lp.completed = TRUE THEN lp.lesson_id END) * 100.0) / 
        NULLIF(COUNT(DISTINCT l.id), 0), 
        2
    ) AS progress_percentage
FROM courses c
LEFT JOIN lessons l ON c.id = l.course_id
LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = ?
WHERE c.id = ?
GROUP BY c.id, c.title;
```

### Update Lesson Order
```sql
UPDATE lessons
SET position = ?
WHERE id = ?;
```

---

## Quiz & Results

### Create Quiz
```sql
INSERT INTO quizzes (course_id, title)
VALUES (?, ?);
```

### Get Course Quizzes
```sql
SELECT *
FROM quizzes
WHERE course_id = ?
ORDER BY created_at;
```

### Submit Quiz Result
```sql
INSERT INTO quiz_results (user_id, quiz_id, score)
VALUES (?, ?, ?);
```

### Get Student Quiz Results
```sql
SELECT 
    q.title AS quiz_title,
    qr.score,
    qr.completed_at,
    c.title AS course_title
FROM quiz_results qr
JOIN quizzes q ON qr.quiz_id = q.id
JOIN courses c ON q.course_id = c.id
WHERE qr.user_id = ?
ORDER BY qr.completed_at DESC;
```

### Get Quiz Results for a Course
```sql
SELECT 
    u.name AS student_name,
    q.title AS quiz_title,
    qr.score,
    qr.completed_at
FROM quiz_results qr
JOIN users u ON qr.user_id = u.id
JOIN quizzes q ON qr.quiz_id = q.id
WHERE q.course_id = ?
ORDER BY qr.completed_at DESC;
```

### Get Average Quiz Score by Student
```sql
SELECT 
    u.name AS student_name,
    AVG(qr.score) AS average_score,
    COUNT(qr.id) AS quizzes_taken
FROM quiz_results qr
JOIN users u ON qr.user_id = u.id
JOIN quizzes q ON qr.quiz_id = q.id
WHERE q.course_id = ?
GROUP BY u.id, u.name
ORDER BY average_score DESC;
```

---

## Certificates

### Issue Certificate
```sql
-- MySQL
INSERT INTO certificates (user_id, course_id)
VALUES (?, ?)
ON DUPLICATE KEY UPDATE issued_at = CURRENT_TIMESTAMP;

-- PostgreSQL
INSERT INTO certificates (user_id, course_id)
VALUES (?, ?)
ON CONFLICT (user_id, course_id) 
DO UPDATE SET issued_at = CURRENT_TIMESTAMP;
```

### Get User Certificates
```sql
SELECT 
    c.title AS course_title,
    cert.issued_at,
    u.name AS instructor_name
FROM certificates cert
JOIN courses c ON cert.course_id = c.id
JOIN users u ON c.instructor_id = u.id
WHERE cert.user_id = ?
ORDER BY cert.issued_at DESC;
```

### Check if Certificate Exists
```sql
SELECT id
FROM certificates
WHERE user_id = ? AND course_id = ?;
```

### Get All Certificates for a Course
```sql
SELECT 
    u.name AS student_name,
    u.email AS student_email,
    cert.issued_at
FROM certificates cert
JOIN users u ON cert.user_id = u.id
WHERE cert.course_id = ?
ORDER BY cert.issued_at DESC;
```

---

## Advanced Queries

### Dashboard Statistics for Student
```sql
SELECT 
    COUNT(DISTINCT e.course_id) AS enrolled_courses,
    COUNT(DISTINCT lp.lesson_id) AS completed_lessons,
    COUNT(DISTINCT qr.id) AS quizzes_taken,
    COALESCE(AVG(qr.score), 0) AS average_quiz_score,
    COUNT(DISTINCT cert.id) AS certificates_earned
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
LEFT JOIN lesson_progress lp ON u.id = lp.user_id AND lp.completed = TRUE
LEFT JOIN quiz_results qr ON u.id = qr.user_id
LEFT JOIN certificates cert ON u.id = cert.user_id
WHERE u.id = ?
GROUP BY u.id;
```

### Dashboard Statistics for Instructor
```sql
SELECT 
    COUNT(DISTINCT c.id) AS total_courses,
    COUNT(DISTINCT e.user_id) AS total_students,
    COUNT(DISTINCT l.id) AS total_lessons,
    COUNT(DISTINCT q.id) AS total_quizzes
FROM users u
LEFT JOIN courses c ON u.id = c.instructor_id
LEFT JOIN enrollments e ON c.id = e.course_id
LEFT JOIN lessons l ON c.id = l.course_id
LEFT JOIN quizzes q ON c.id = q.course_id
WHERE u.id = ?
GROUP BY u.id;
```

### Recent Activity for Student
```sql
(
    SELECT 
        'lesson_completed' AS activity_type,
        l.title AS title,
        c.title AS course_title,
        lp.completed_at AS activity_date
    FROM lesson_progress lp
    JOIN lessons l ON lp.lesson_id = l.id
    JOIN courses c ON l.course_id = c.id
    WHERE lp.user_id = ?
)
UNION ALL
(
    SELECT 
        'quiz_completed' AS activity_type,
        q.title AS title,
        c.title AS course_title,
        qr.completed_at AS activity_date
    FROM quiz_results qr
    JOIN quizzes q ON qr.quiz_id = q.id
    JOIN courses c ON q.course_id = c.id
    WHERE qr.user_id = ?
)
UNION ALL
(
    SELECT 
        'enrolled' AS activity_type,
        c.title AS title,
        c.title AS course_title,
        e.enrolled_at AS activity_date
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = ?
)
ORDER BY activity_date DESC
LIMIT 10;
```

### Popular Courses
```sql
SELECT 
    c.id,
    c.title,
    c.description,
    u.name AS instructor_name,
    COUNT(e.user_id) AS enrollment_count,
    AVG(e.progress) AS average_progress
FROM courses c
JOIN users u ON c.instructor_id = u.id
LEFT JOIN enrollments e ON c.id = e.course_id
WHERE c.status = 'published'
GROUP BY c.id, c.title, c.description, u.name
ORDER BY enrollment_count DESC
LIMIT 10;
```

---

## Performance Tips

1. **Use Indexes**: The schema includes indexes on frequently queried columns
2. **Pagination**: Always use LIMIT and OFFSET for large result sets
   ```sql
   LIMIT ? OFFSET ?
   ```
3. **Connection Pooling**: Use a connection pool in your application
4. **Prepared Statements**: Always use parameterized queries to prevent SQL injection
5. **Caching**: Cache frequently accessed data (e.g., course lists, user profiles)
6. **Avoid N+1 Queries**: Use JOINs instead of multiple separate queries

---

## Backend Implementation Example (Node.js)

```javascript
// Using mysql2 with promises
const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Example: Enroll in course endpoint
async function enrollInCourse(userId, courseId) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO enrollments (user_id, course_id, progress) VALUES (?, ?, 0)',
      [userId, courseId]
    );
    return { success: true, enrollmentId: result.insertId };
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, message: 'Already enrolled' };
    }
    throw error;
  }
}

// Example: Get student courses
async function getStudentCourses(userId) {
  const [rows] = await pool.execute(`
    SELECT 
      c.*,
      u.name AS instructor_name,
      e.progress,
      e.enrolled_at
    FROM courses c
    JOIN enrollments e ON c.id = e.course_id
    JOIN users u ON c.instructor_id = u.id
    WHERE e.user_id = ?
    ORDER BY e.enrolled_at DESC
  `, [userId]);
  return rows;
}
```

---

For more information, see:
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQL Performance Explained](https://sql-performance-explained.com/)
