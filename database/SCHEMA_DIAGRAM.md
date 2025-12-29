# Database Schema Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         StudyEasily Database Schema                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────┐
│          USERS                │
├───────────────────────────────┤
│ PK  id                        │
│     name                      │
│ UK  email                     │
│     password (hashed)         │
│     role (student/instructor/ │
│          admin/tutor)         │
│     created_at                │
│     updated_at                │
└───────────────────────────────┘
         │
         │ instructor_id (FK)
         ├──────────────────────────────────────┐
         │                                      │
         │                                      ▼
         │                    ┌────────────────────────────────┐
         │                    │         COURSES                │
         │                    ├────────────────────────────────┤
         │                    │ PK  id                         │
         │                    │     title                      │
         │                    │     description                │
         │                    │ FK  instructor_id → users.id   │
         │                    │     status (draft/published/   │
         │                    │            archived)           │
         │                    │     created_at                 │
         │                    │     updated_at                 │
         │                    └────────────────────────────────┘
         │                              │
         │                              │ course_id (FK)
         │                              ├─────────────────────────┐
         │                              │                         │
         │                              ▼                         ▼
         │    ┌──────────────────────────────────┐  ┌──────────────────────────┐
         │    │       LESSONS                    │  │      QUIZZES             │
         │    ├──────────────────────────────────┤  ├──────────────────────────┤
         │    │ PK  id                           │  │ PK  id                   │
         │    │ FK  course_id → courses.id       │  │ FK  course_id →courses.id│
         │    │     title                        │  │     title                │
         │    │     content                      │  │     created_at           │
         │    │     position                     │  └──────────────────────────┘
         │    │     created_at                   │              │
         │    └──────────────────────────────────┘              │ quiz_id (FK)
         │                    │                                 │
         │                    │ lesson_id (FK)                  ▼
         │                    │              ┌──────────────────────────────────┐
         │                    │              │      QUIZ_RESULTS                │
         │                    │              ├──────────────────────────────────┤
         │                    │              │ PK  id                           │
         │                    │              │ FK  user_id → users.id           │
         │                    │              │ FK  quiz_id → quizzes.id         │
         │                    │              │     score                        │
         │                    │              │     completed_at                 │
         │                    │              └──────────────────────────────────┘
         │                    │                             ▲
         │                    ▼                             │
         │  ┌─────────────────────────────────┐             │
         │  │    LESSON_PROGRESS              │             │
         │  ├─────────────────────────────────┤             │
         │  │ PK  id                          │             │
         │  │ FK  user_id → users.id          │             │ user_id (FK)
         │  │ FK  lesson_id → lessons.id      │             │
         │  │     completed (boolean)         │             │
         │  │     completed_at                │             │
         │  │ UK  (user_id, lesson_id)        │             │
         │  └─────────────────────────────────┘             │
         │                    ▲                             │
         │                    │                             │
         │                    │ user_id (FK)                │
         │                    │                             │
         ├────────────────────┴─────────────────────────────┘
         │
         │ user_id, course_id (FK)
         ├────────────────────┬─────────────────────────────────────────┐
         │                    │                                         │
         ▼                    ▼                                         │
┌──────────────────────┐  ┌─────────────────────────────────┐          │
│   ENROLLMENTS        │  │      CERTIFICATES               │          │
├──────────────────────┤  ├─────────────────────────────────┤          │
│ PK  id               │  │ PK  id                          │          │
│ FK  user_id →users.id│  │ FK  user_id → users.id          │          │
│ FK  course_id →      │  │ FK  course_id → courses.id      │          │
│     courses.id       │  │     issued_at                   │          │
│     progress (0-100) │  │ UK  (user_id, course_id)        │          │
│     enrolled_at      │  └─────────────────────────────────┘          │
│ UK  (user_id,        │                                               │
│      course_id)      │                                               │
└──────────────────────┘                                               │
         ▲                                                             │
         └─────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                            Key Relationships                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  • One USER (instructor) can have many COURSES                              │
│  • One COURSE can have many LESSONS                                         │
│  • One COURSE can have many QUIZZES                                         │
│  • Many USERS can enroll in many COURSES (via ENROLLMENTS)                  │
│  • One USER can have many LESSON_PROGRESS records                           │
│  • One LESSON can have many LESSON_PROGRESS records (one per student)       │
│  • One USER can have many QUIZ_RESULTS                                      │
│  • One QUIZ can have many QUIZ_RESULTS (one per student)                    │
│  • One USER can have many CERTIFICATES (one per completed course)           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                            Table Purposes                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USERS            : Store all platform users (students, instructors, etc.)  │
│  COURSES          : Store course information and link to instructor         │
│  ENROLLMENTS      : Link students to courses they're enrolled in            │
│  LESSONS          : Store individual lesson content within courses          │
│  LESSON_PROGRESS  : Track which lessons each student has completed          │
│  QUIZZES          : Store quiz/exam information for courses                 │
│  QUIZ_RESULTS     : Store student scores on quizzes                         │
│  CERTIFICATES     : Store issued certificates for course completions        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


Legend:
  PK  = Primary Key
  FK  = Foreign Key
  UK  = Unique Key
  →   = References
