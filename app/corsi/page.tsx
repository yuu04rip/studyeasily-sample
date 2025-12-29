'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CourseCard from '@/components/CourseCard';
import SearchBar from '@/components/SearchBar';
import { useUser } from '@/hooks/useUser';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  image: string;
  category: string;
  enrolled: number;
  rating: number;
}

function CoursesContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const { isInstructor, isAdmin } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const url = search
        ? `/api/courses?search=${encodeURIComponent(search)}`
        : '/api/courses';
      
      const response = await fetch(url);
      const data = await response.json();
      setCourses(data.courses);
      setLoading(false);
    };

    fetchCourses();
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-700 to-accent">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white uppercase tracking-wide">Corsi</h1>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Esplora la nostra vasta selezione di corsi e trova quello perfetto per te
          </p>
          
          {/* Show create course button for instructors/admins */}
          {(isInstructor || isAdmin) && (
            <div className="mb-6">
              <Link
                href="/instructor/create-course"
                className="inline-block bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
              >
                + Create New Course
              </Link>
            </div>
          )}
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full px-6 py-4 flex items-center shadow-lg">
              <input
                type="text"
                placeholder="Search Course"
                className="flex-1 outline-none text-gray-800 text-lg"
              />
              <button className="text-gray-500 hover:text-primary transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          {search && (
            <p className="mt-4 text-white">
              Risultati per: <strong>{search}</strong>
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-white">Nessun corso trovato</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CorsiPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary via-purple-700 to-accent">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    }>
      <CoursesContent />
    </Suspense>
  );
}
