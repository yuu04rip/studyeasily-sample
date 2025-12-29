'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Course } from '@/types';

export default function InstructorDashboard() {
  const router = useRouter();
  const { user, isInstructor, isAdmin, loading: userLoading } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !isInstructor && !isAdmin) {
      router.push('/dashboard');
      return;
    }

    const fetchCourses = async () => {
      if (!user) return;
      
      try {
        const url = isAdmin 
          ? '/api/courses' 
          : `/api/courses?instructorId=${user.id}`;
        
        const response = await fetch(url);
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user, userLoading, isInstructor, isAdmin, router]);

  const handleCreateCourse = () => {
    router.push('/instructor/create-course');
  };

  if (userLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-700 to-accent">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {isAdmin ? 'Admin Dashboard' : 'Instructor Dashboard'}
          </h1>
          <p className="text-white/80">
            Manage your courses and track student progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-white/80 text-sm font-medium mb-2">Total Courses</h3>
            <p className="text-4xl font-bold text-white">{courses.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-white/80 text-sm font-medium mb-2">Total Students</h3>
            <p className="text-4xl font-bold text-white">
              {courses.reduce((sum, course) => sum + course.enrolled, 0)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-white/80 text-sm font-medium mb-2">Average Rating</h3>
            <p className="text-4xl font-bold text-white">
              {courses.length > 0 
                ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)
                : '0.0'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <button
            onClick={handleCreateCourse}
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
          >
            + Create New Course
          </button>
        </div>

        {/* Courses List */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white">
              {isAdmin ? 'All Courses' : 'Your Courses'}
            </h2>
          </div>
          
          {courses.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-white/60 mb-4">No courses yet</p>
              <button
                onClick={handleCreateCourse}
                className="text-accent hover:underline font-medium"
              >
                Create your first course
              </button>
            </div>
          ) : (
            <div className="divide-y divide-white/20">
              {courses.map((course) => (
                <div key={course.id} className="p-6 hover:bg-white/5 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link 
                          href={`/corsi/${course.id}`}
                          className="text-xl font-semibold text-white hover:text-accent transition"
                        >
                          {course.title}
                        </Link>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          course.status === 'published' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : course.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-white/60">
                        <span>{course.category}</span>
                        <span>•</span>
                        <span>{course.enrolled} students</span>
                        <span>•</span>
                        <span>⭐ {course.rating}</span>
                        <span>•</span>
                        <span>${course.price}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link
                        href={`/corsi/${course.id}`}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition border border-white/20"
                      >
                        View
                      </Link>
                      <Link
                        href={`/corsi/${course.id}/students`}
                        className="px-4 py-2 bg-accent/80 hover:bg-accent text-white rounded-lg text-sm font-medium transition"
                      >
                        Students
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
