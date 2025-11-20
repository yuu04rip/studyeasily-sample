'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LessonPlayer from '@/components/LessonPlayer';
import Link from 'next/link';

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  content: string;
}

export default function LessonPage() {
  const params = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      const response = await fetch(`/api/lessons/${params.lessonId}`);
      const data = await response.json();
      setLesson(data.lesson);
      setLoading(false);
    };

    fetchLesson();
  }, [params.lessonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Lesson not found</h1>
        <Link href="/corsi" className="text-primary hover:underline">
          Browse all courses
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link
          href={`/corsi/${params.courseId}`}
          className="text-primary hover:underline flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Course
        </Link>
      </div>

      <div className="max-w-5xl mx-auto">
        <LessonPlayer url={lesson.videoUrl} title={lesson.title} />

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">About this lesson</h2>
          <p className="text-gray-700 mb-4">{lesson.description}</p>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Lesson Content</h3>
            <p className="text-gray-700">{lesson.content}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Lesson
          </button>
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-gradientStart to-gradientEnd text-white rounded-lg hover:opacity-90 transition">
            Next Lesson
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
