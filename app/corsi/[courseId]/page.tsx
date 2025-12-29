'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Course as CourseType } from '@/types';

interface Course extends CourseType {
  curriculum: Array<{
    id: string;
    title: string;
    duration: string;
  }>;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, role, isStudent, isInstructor, isAdmin, isTutor } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/${params.courseId}`);
      const data = await response.json();
      setCourse(data.course);
      setLoading(false);
    };

    fetchCourse();
  }, [params.courseId]);

  useEffect(() => {
    // Check if user is enrolled
    const checkEnrollment = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`/api/enrollments?userId=${user.id}&courseId=${params.courseId}`);
        const data = await response.json();
        setIsEnrolled(data.enrollments && data.enrollments.length > 0);
      } catch (error) {
        console.error('Error checking enrollment:', error);
      }
    };

    checkEnrollment();
  }, [user, params.courseId]);

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setEnrolling(true);
    setEnrollMessage('');

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: params.courseId,
          userId: user.id,
          role: role,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setEnrollMessage(data.message);
        setIsEnrolled(true);
      } else {
        setEnrollMessage(data.error || 'Failed to enroll');
      }
    } catch {
      setEnrollMessage('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleEditCourse = () => {
    router.push(`/corsi/${params.courseId}/edit`);
  };

  const handleViewStudents = () => {
    router.push(`/corsi/${params.courseId}/students`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Course not found</h1>
        <Link href="/corsi" className="text-primary hover:underline">
          Browse all courses
        </Link>
      </div>
    );
  }

  const isOwner = isInstructor && course.instructorId === user?.id;
  const canManage = isAdmin || isOwner;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="bg-gradient-to-br from-gradientStart to-gradientEnd text-white rounded-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{course.category}</span>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{course.level}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-xl mb-4 text-white/90">{course.description}</p>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {course.instructor}
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.duration}
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-300 fill-current mr-2" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            {course.rating} ({course.enrolled.toLocaleString()} students)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Curriculum */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
          <div className="bg-white rounded-lg shadow-md">
            {course.curriculum.map((item, index) => (
              <Link
                key={item.id}
                href={`/corsi/${course.id}/lezione/${item.id}`}
                className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold mr-4">
                    {index + 1}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <span className="text-sm text-gray-500">{item.duration}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            {/* Role-based actions */}
            {canManage ? (
              // Instructor/Admin view
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {isAdmin ? 'Admin' : 'Your Course'}
                  </span>
                </div>
                <button
                  onClick={handleEditCourse}
                  className="w-full bg-gradient-to-r from-gradientStart to-gradientEnd text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Edit Course
                </button>
                <button
                  onClick={handleViewStudents}
                  className="w-full bg-white border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition"
                >
                  View Students ({course.enrolled})
                </button>
                {isAdmin && course.status === 'draft' && (
                  <button
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Approve Course
                  </button>
                )}
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-semibold capitalize">{course.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span className="font-semibold">{course.enrolled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="font-semibold">{course.rating} / 5</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Student/Tutor view
              <>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">${course.price}</div>
                  <p className="text-gray-600">One-time payment</p>
                </div>
                {isEnrolled ? (
                  <Link
                    href={`/corsi/${course.id}/lezione/${course.curriculum[0]?.id}`}
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition text-center"
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling || !user}
                    className="w-full bg-gradient-to-r from-gradientStart to-gradientEnd text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {!user ? 'Login to Enroll' : enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
                {enrollMessage && (
                  <div className={`mt-4 p-3 rounded-lg text-sm ${
                    enrollMessage.includes('error') || enrollMessage.includes('Failed')
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {enrollMessage}
                  </div>
                )}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Lifetime access
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Certificate of completion
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
