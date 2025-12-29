# Migration Guide: From Mock Data to Real Database

This guide explains how to migrate from the current mock-based system to a real MySQL or PostgreSQL database.

## 📋 Overview

Currently, the application uses:
- **Mock Service Worker (MSW)** for API simulation
- **mock-data.json** for data storage
- **localStorage** for authentication

To migrate to a real database, you need to:
1. Set up the database
2. Create backend API routes
3. Update frontend to use real API
4. Migrate mock data to database

## 🔄 Migration Steps

### Step 1: Setup Database

Follow the [Quick Start Guide](QUICKSTART.md) to set up MySQL or PostgreSQL.

```bash
# MySQL
mysql -u studyeasily_user -p studyeasily < database/schema.sql

# PostgreSQL
psql -U studyeasily_user -d studyeasily -f database/schema-postgresql.sql
```

### Step 2: Install Database Client

Add a database client library to your project:

**For MySQL:**
```bash
npm install mysql2
# OR for TypeScript support
npm install @prisma/client
npx prisma init
```

**For PostgreSQL:**
```bash
npm install pg
# OR
npm install @prisma/client
npx prisma init
```

### Step 3: Create Database Connection

Create `lib/db.ts`:

```typescript
// lib/db.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'studyeasily_user',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'studyeasily',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
```

### Step 4: Create API Routes

Create Next.js API routes to replace MSW handlers:

**Example: Get Courses**

Create `app/api/courses/route.ts`:

```typescript
// app/api/courses/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        c.*,
        u.name AS instructor_name,
        COUNT(DISTINCT e.user_id) AS enrolled_count
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      LEFT JOIN enrollments e ON c.id = e.course_id
      WHERE c.status = 'published'
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
```

**Example: Enroll in Course**

Create `app/api/courses/[id]/enroll/route.ts`:

```typescript
// app/api/courses/[id]/enroll/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    const courseId = params.id;

    const [result] = await pool.execute(
      'INSERT INTO enrollments (user_id, course_id, progress) VALUES (?, ?, 0)',
      [userId, courseId]
    );

    return NextResponse.json({ 
      success: true,
      message: 'Successfully enrolled in course'
    });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 409 }
      );
    }
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in course' },
      { status: 500 }
    );
  }
}
```

### Step 5: Update Frontend to Use Real API

Update your components to use the real API instead of MSW:

**Before (using MSW):**
```typescript
// The MSW handler intercepts this automatically
const response = await fetch('/api/courses');
```

**After (using real API):**
```typescript
// Same code! Just remove MSW from your app
const response = await fetch('/api/courses');
```

### Step 6: Disable MSW

Remove or comment out MSW initialization:

**In `app/layout.tsx`:**
```typescript
// Remove or comment out:
// if (typeof window !== 'undefined') {
//   import('../mocks/browser').then(({ worker }) => {
//     worker.start();
//   });
// }
```

### Step 7: Update Authentication

Replace localStorage-based auth with real JWT:

**Install JWT library:**
```bash
npm install jsonwebtoken bcrypt
npm install -D @types/jsonwebtoken @types/bcrypt
```

**Create auth utility:**
```typescript
// lib/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: number, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
```

**Create login API:**
```typescript
// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Get user from database
    const [rows]: any = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
```

## 🗄️ Migrating Existing Mock Data

If you want to preserve the data from `mock-data.json`, create a migration script:

```typescript
// scripts/migrate-data.ts
import fs from 'fs';
import pool from '../lib/db';
import { hashPassword } from '../lib/auth';

async function migrateData() {
  const mockData = JSON.parse(
    fs.readFileSync('mock-data.json', 'utf-8')
  );

  // Migrate users
  for (const user of mockData.users) {
    const hashedPassword = await hashPassword('defaultPassword123');
    await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [user.name, user.email, hashedPassword, user.role]
    );
  }

  // Migrate courses
  for (const course of mockData.courses) {
    // Map instructor name to ID
    const [instructor]: any = await pool.execute(
      'SELECT id FROM users WHERE name = ?',
      [course.instructor]
    );
    
    await pool.execute(
      'INSERT INTO courses (title, description, instructor_id, status) VALUES (?, ?, ?, ?)',
      [course.title, course.description, instructor[0].id, course.status]
    );
  }

  // Continue for enrollments, lessons, etc.
  
  console.log('Migration completed!');
  process.exit(0);
}

migrateData().catch(console.error);
```

Run the migration:
```bash
npx tsx scripts/migrate-data.ts
```

## 🔄 Gradual Migration (Recommended)

Instead of migrating everything at once, consider a gradual approach:

1. **Phase 1**: Set up database and keep MSW running
2. **Phase 2**: Create API routes for read operations
3. **Phase 3**: Test API routes alongside MSW
4. **Phase 4**: Create API routes for write operations
5. **Phase 5**: Disable MSW and use only real API
6. **Phase 6**: Add authentication and authorization

## 🧪 Testing Your Migration

Create a test checklist:

- [ ] Database connection works
- [ ] Users can register
- [ ] Users can login
- [ ] Courses are displayed
- [ ] Students can enroll in courses
- [ ] Lesson progress is tracked
- [ ] Quiz results are saved
- [ ] Certificates are issued

## 📚 Additional API Routes to Create

You'll need to create routes for:

- `GET /api/courses` - List all courses
- `GET /api/courses/[id]` - Get course details
- `POST /api/courses/[id]/enroll` - Enroll in course
- `GET /api/user/courses` - Get user's enrolled courses
- `GET /api/courses/[id]/lessons` - Get course lessons
- `POST /api/lessons/[id]/complete` - Mark lesson complete
- `GET /api/user/progress` - Get user progress
- `POST /api/quizzes/[id]/submit` - Submit quiz

See [API_QUERIES.md](API_QUERIES.md) for the SQL queries to use.

## 🔒 Security Considerations

When migrating to a real database:

1. **Password Hashing**: Always use bcrypt or argon2
2. **SQL Injection**: Use parameterized queries
3. **Authentication**: Implement proper JWT validation
4. **Authorization**: Check user roles before operations
5. **Rate Limiting**: Add rate limiting to API routes
6. **CORS**: Configure CORS properly
7. **Environment Variables**: Never commit secrets

## 🚀 Production Deployment

For production:

1. Use a managed database (e.g., AWS RDS, DigitalOcean)
2. Enable SSL/TLS for database connections
3. Set up database backups
4. Use connection pooling
5. Monitor database performance
6. Set up logging and error tracking

## 📖 Recommended Tools

- **ORM**: Prisma, TypeORM, or Drizzle for type-safe queries
- **Migration**: Use Prisma Migrate or TypeORM migrations
- **Validation**: Zod for input validation
- **Testing**: Jest for API route testing

---

For more information, see:
- [API Query Examples](API_QUERIES.md)
- [Database Setup Guide](README.md)
- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
