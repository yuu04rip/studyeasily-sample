'use client';

import { useState } from 'react';

interface LessonPlayerProps {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
}

export default function LessonPlayer({
  title,
  description,
  videoUrl,
  duration,
}: LessonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Video Player Area */}
      <div className="relative bg-black aspect-video">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
              aria-label="Play video"
            >
              <svg
                className="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
            Video Player: {videoUrl}
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
          {duration}
        </div>
      </div>

      {/* Lesson Info */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Precedente</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <span>Prossima</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button className="ml-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Completa Lezione
          </button>
        </div>
      </div>
    </div>
  );
}
