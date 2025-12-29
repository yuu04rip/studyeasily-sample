// Custom hook for accessing user information and role

'use client';

import { useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface UseUserReturn {
  user: User | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  isStudent: boolean;
  isInstructor: boolean;
  isAdmin: boolean;
  isTutor: boolean;
  loading: boolean;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }
    
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  const role = user?.role || null;

  return {
    user,
    role,
    isLoggedIn: !!user,
    isStudent: role === 'student',
    isInstructor: role === 'instructor',
    isAdmin: role === 'admin',
    isTutor: role === 'tutor',
    loading,
  };
}

/**
 * Update user in localStorage (e.g., after profile update)
 */
export function updateStoredUser(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Clear user data (logout)
 */
export function clearUser(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}
