// Permission utility functions for role-based access control

import { UserRole, Permission } from '@/types';

/**
 * Get permissions based on user role
 */
export function getPermissions(role: UserRole): Permission {
  switch (role) {
    case 'admin':
      return {
        canCreateCourse: true,
        canEditCourse: true,
        canDeleteCourse: true,
        canEnrollCourse: true,
        canManageUsers: true,
        canApproveCourses: true,
        canViewAnalytics: true,
        canManageEnrollments: true,
      };
    
    case 'instructor':
      return {
        canCreateCourse: true,
        canEditCourse: true, // Only their own courses
        canDeleteCourse: true, // Only their own courses
        canEnrollCourse: false,
        canManageUsers: false,
        canApproveCourses: false,
        canViewAnalytics: true, // Only their own courses
        canManageEnrollments: true, // Only their own courses
      };
    
    case 'tutor':
      return {
        canCreateCourse: false,
        canEditCourse: false,
        canDeleteCourse: false,
        canEnrollCourse: true,
        canManageUsers: false,
        canApproveCourses: false,
        canViewAnalytics: false,
        canManageEnrollments: false,
      };
    
    case 'student':
    default:
      return {
        canCreateCourse: false,
        canEditCourse: false,
        canDeleteCourse: false,
        canEnrollCourse: true,
        canManageUsers: false,
        canApproveCourses: false,
        canViewAnalytics: false,
        canManageEnrollments: false,
      };
  }
}

/**
 * Check if a user can create a course
 */
export function canCreateCourse(role: UserRole): boolean {
  return role === 'admin' || role === 'instructor';
}

/**
 * Check if a user can edit a course
 * @param role - User role
 * @param courseInstructorId - ID of the course instructor
 * @param userId - ID of the current user
 */
export function canEditCourse(
  role: UserRole,
  courseInstructorId: string,
  userId: string
): boolean {
  if (role === 'admin') return true;
  if (role === 'instructor' && courseInstructorId === userId) return true;
  return false;
}

/**
 * Check if a user can delete a course
 */
export function canDeleteCourse(
  role: UserRole,
  courseInstructorId: string,
  userId: string
): boolean {
  if (role === 'admin') return true;
  if (role === 'instructor' && courseInstructorId === userId) return true;
  return false;
}

/**
 * Check if a user can enroll in a course
 */
export function canEnrollInCourse(role: UserRole): boolean {
  return role === 'student' || role === 'tutor' || role === 'admin';
}

/**
 * Check if a user can manage all users
 */
export function canManageUsers(role: UserRole): boolean {
  return role === 'admin';
}

/**
 * Check if a user can approve courses
 */
export function canApproveCourses(role: UserRole): boolean {
  return role === 'admin';
}

/**
 * Check if a user can view course analytics
 */
export function canViewCourseAnalytics(
  role: UserRole,
  courseInstructorId: string,
  userId: string
): boolean {
  if (role === 'admin') return true;
  if (role === 'instructor' && courseInstructorId === userId) return true;
  return false;
}

/**
 * Check if a user can access course content
 * @param role - User role
 * @param isEnrolled - Whether the user is enrolled in the course
 * @param isInstructor - Whether the user is the course instructor
 */
export function canAccessCourseContent(
  role: UserRole,
  isEnrolled: boolean,
  isInstructor: boolean
): boolean {
  if (role === 'admin') return true;
  if (isInstructor) return true;
  if (isEnrolled && (role === 'student' || role === 'tutor')) return true;
  return false;
}
