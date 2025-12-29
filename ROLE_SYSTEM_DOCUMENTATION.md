# Role-Based Backend Implementation Summary

This document describes the role-based system implementation for the StudyEasily e-learning platform.

## Overview

The platform now supports four distinct user roles with different permissions and interfaces:

1. **Student** - Users who take courses
2. **Instructor** - Users who create and manage courses
3. **Tutor** - Users who assist students (similar permissions to students)
4. **Admin** - Platform administrators with full access

## Implementation Details

### 1. Type System

**Location:** `/types/index.ts`

Defines TypeScript interfaces for:
- `UserRole`: Type union of all possible roles
- `User`: User entity with role field
- `Course`: Course entity with instructorId and status
- `Enrollment`: Tracks user enrollments with progress
- `Lesson`: Lesson entity with order
- `Permission`: Role-based permission flags

### 2. Permission System

**Location:** `/lib/permissions.ts`

Utility functions for checking permissions:
- `getPermissions(role)`: Returns all permissions for a role
- `canCreateCourse(role)`: Check course creation permission
- `canEditCourse(role, courseInstructorId, userId)`: Check edit permission
- `canDeleteCourse(role, courseInstructorId, userId)`: Check delete permission
- `canEnrollInCourse(role)`: Check enrollment permission
- `canAccessCourseContent(role, isEnrolled, isInstructor)`: Check content access

### 3. User Hook

**Location:** `/hooks/useUser.ts`

React hook for accessing user information:
```typescript
const { user, role, isStudent, isInstructor, isAdmin, isTutor } = useUser();
```

### 4. Mock Data Updates

**Location:** `/mock-data.json`

Added:
- Role field to all users
- Instructor users (instructor_1 through instructor_4)
- Admin user (admin_1)
- `instructorId` and `status` fields to courses
- Enrollments array tracking user course enrollments
- Order field to lessons

### 5. API Endpoints

**Location:** `/mocks/handlers.ts`

#### Course Management
- `GET /api/courses?instructorId={id}` - Get instructor's courses
- `POST /api/courses` - Create course (instructor/admin only)
- `PUT /api/courses/:id` - Update course (owner/admin only)
- `DELETE /api/courses/:id` - Delete course (owner/admin only)

#### Enrollment
- `POST /api/enroll` - Enroll in course (student/tutor only)
- `GET /api/enrollments?userId={id}&courseId={id}` - Get enrollments

#### Student Management
- `GET /api/courses/:courseId/students` - Get enrolled students (instructor/admin only)

#### Authentication
- `POST /api/auth/signup` - Now accepts `role` parameter
- `POST /api/auth/login` - Returns user with role

### 6. Frontend Components

#### Signup Page
**Location:** `/app/signup/page.tsx`

- Added role selection dropdown
- Users can choose: Student, Instructor, or Tutor
- Role is sent to backend during registration

#### Course Listing Page
**Location:** `/app/corsi/page.tsx`

- Shows "Create New Course" button for instructors/admins
- Uses Suspense boundary for useSearchParams

#### Course Detail Page
**Location:** `/app/corsi/[courseId]/page.tsx`

Different views based on role:

**Student/Tutor View:**
- Shows price and enrollment button
- "Continue Learning" if already enrolled
- Shows course benefits (lifetime access, certificate, etc.)

**Instructor View (for their own courses):**
- "Edit Course" button
- "View Students" button with count
- Statistics (status, students, rating)

**Admin View:**
- All instructor features
- "Approve Course" button for draft courses
- Can manage any course

#### Instructor Dashboard
**Location:** `/app/instructor/page.tsx`

Features:
- Statistics cards (total courses, students, average rating)
- List of instructor's courses (all courses for admin)
- Course status indicators (published, draft, archived)
- Quick actions (View, Students)
- "Create New Course" button

#### Create Course Page
**Location:** `/app/instructor/create-course/page.tsx`

Form fields:
- Course title
- Description
- Category (dropdown)
- Level (Beginner, Intermediate, Advanced)
- Duration
- Price

Permission check: Only instructors and admins can access

## Permissions Matrix

| Action                    | Student | Tutor | Instructor | Admin |
|---------------------------|---------|-------|------------|-------|
| Browse courses            | ✅      | ✅    | ✅         | ✅    |
| Enroll in course          | ✅      | ✅    | ❌         | ✅    |
| Access course content     | ✅*     | ✅*   | ✅**       | ✅    |
| Create course             | ❌      | ❌    | ✅         | ✅    |
| Edit own course           | ❌      | ❌    | ✅         | ✅    |
| Edit any course           | ❌      | ❌    | ❌         | ✅    |
| Delete own course         | ❌      | ❌    | ✅         | ✅    |
| Delete any course         | ❌      | ❌    | ❌         | ✅    |
| View enrolled students    | ❌      | ❌    | ✅*        | ✅    |
| Approve courses           | ❌      | ❌    | ❌         | ✅    |
| Manage users              | ❌      | ❌    | ❌         | ✅    |

\* Only if enrolled
\** For their own courses

## Usage Examples

### Creating an Instructor Account

1. Navigate to `/signup`
2. Fill in name, email, password
3. Select "Instructor - I want to teach" from role dropdown
4. Complete registration
5. Access instructor dashboard at `/instructor`

### Creating a Course (Instructor)

1. Login as instructor
2. Go to `/instructor/create-course` or click "Create New Course"
3. Fill in course details
4. Submit form
5. Course created with status "draft"
6. Course appears in instructor dashboard

### Enrolling in a Course (Student)

1. Login as student
2. Browse courses at `/corsi`
3. Click on a course
4. Click "Enroll Now"
5. Access course content via "Continue Learning"

### Managing Students (Instructor)

1. Login as instructor
2. Go to instructor dashboard (`/instructor`)
3. Click "Students" on any course
4. View list of enrolled students with progress

## Testing

### Test Accounts

The mock data includes these test accounts:

**Students:**
- demo@studyeasily.com (student)
- test@example.com (student)

**Instructors:**
- john.doe@studyeasily.com (instructor)
- jane.smith@studyeasily.com (instructor)
- michael.johnson@studyeasily.com (instructor)
- sarah.williams@studyeasily.com (instructor)

**Admin:**
- admin@studyeasily.com (admin)

All accounts can login with any password (mock authentication).

### Testing Flow

1. **Student Flow:**
   - Login as demo@studyeasily.com
   - Browse courses
   - Enroll in a course
   - Access course content

2. **Instructor Flow:**
   - Signup with instructor role
   - Create a new course
   - View instructor dashboard
   - Check course statistics

3. **Admin Flow:**
   - Login as admin@studyeasily.com
   - View all courses
   - Approve draft courses
   - Manage any course

## Future Enhancements

Potential improvements:
1. Course approval workflow for admins
2. Student progress tracking
3. Quiz and assignment management
4. Certificate generation
5. Revenue analytics for instructors
6. Bulk user management for admins
7. Course review and rating system
8. Discussion forums for courses
9. Live session scheduling
10. Payment integration

## Technical Notes

- All permission checks are done both on frontend (UI) and backend (API)
- Mock Service Worker (MSW) is used for API mocking
- Data is stored in memory (resets on refresh)
- Authentication tokens are stored in localStorage
- Role information is included in user object returned from auth endpoints
