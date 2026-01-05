// Role-based system types for the e-learning platform

export type UserRole = 'student' | 'instructor' | 'admin' | 'tutor';

export type CourseStatus = 'draft' | 'published' | 'archived';

export type OnlineStatus = 'online' | 'offline' | 'do-not-disturb';

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
  role: UserRole;
  birthDate?: string;
  description?: string;
  onlineStatus?: OnlineStatus;
  enrolledCourses?: string[];
  createdAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string; // Reference to instructor user
  duration: string;
  level: string;
  price: number;
  image: string;
  category: string;
  enrolled: number;
  rating: number;
  status: CourseStatus;
  curriculum?: CurriculumItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CurriculumItem {
  id: string;
  title: string;
  duration: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  content: string;
  order: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  enrolledAt: string;
  completedLessons: string[];
  lastAccessedAt?: string;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  lastAccessed: string;
}

// Permission types
export interface Permission {
  canCreateCourse: boolean;
  canEditOwnCourse: boolean; // Can edit their own courses
  canDeleteOwnCourse: boolean; // Can delete their own courses
  canEnrollCourse: boolean;
  canManageUsers: boolean;
  canApproveCourses: boolean;
  canViewAnalytics: boolean;
  canManageEnrollments: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  enrollmentId: string;
}

// Theme types
export type ThemeColor = 'purple' | 'orange' | 'green' | 'red' | 'black' | 'blue';

export interface ThemeConfig {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  gradientStart: string;
  gradientEnd: string;
  bgDark: string;
  bgMid: string;
  bg: string;
}
