'use client';

import { useState, useEffect } from 'react';

interface LessonPlayerProps {
  url: string;
  title: string;
}

export default function LessonPlayer({ url, title }: LessonPlayerProps) {
  const [Player, setPlayer] = useState<any>(null);

  useEffect(() => {
    import('react-player').then((mod) => setPlayer(() => mod.default));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-video bg-black">
        {Player ? (
          <Player
            url={url}
            controls={true}
            width="100%"
            height="100%"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            Loading player...
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Video Lesson</span>
          <span>•</span>
          <span>Watch at your own pace</span>
        </div>
      </div>
    </div>
  );
}
