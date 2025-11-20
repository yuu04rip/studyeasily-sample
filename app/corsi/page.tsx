'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseCard from '@/components/CourseCard';
import SearchBar from '@/components/SearchBar';

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

export default function CorsiPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Browse Courses</h1>
        <p className="text-gray-600 mb-6">
          Explore our wide selection of courses and find the perfect one for you
        </p>
        <div className="max-w-2xl">
          <SearchBar />
        </div>
        {search && (
          <p className="mt-4 text-gray-700">
            Showing results for: <strong>{search}</strong>
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No courses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
