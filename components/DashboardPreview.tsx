'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface DashboardPreviewProps {
  className?: string;
}

export default function DashboardPreview({ className = '' }: DashboardPreviewProps) {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-accent/30 ${className}`}>
      {/* Header with Profile and Calendar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
          {query && (
            <p className="text-accent text-sm">
              Ricerca: <span className="font-semibold">&quot;{query}&quot;</span>
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Calendar Icon */}
          <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition border border-white/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          {/* Profile Icon */}
          <div className="bg-gradient-to-br from-accent to-purple-600 p-3 rounded-xl border-2 border-white/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        <button className="bg-accent text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap">
          Home
        </button>
        <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition">
          Schedule
        </button>
        <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition">
          Corsi
        </button>
        <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition">
          Grades
        </button>
        <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition">
          Chats
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Materiale didattico Card */}
        <div className="bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-2xl p-6 border border-white/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-5xl mb-3">📚</div>
              <h3 className="text-2xl font-bold text-white mb-2">Materiale didattico</h3>
              <p className="text-white/80 text-sm">Accedi alle tue risorse di studio</p>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-white text-sm">PDF Lectures</span>
              </div>
              <span className="text-white/60 text-xs">12 files</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white text-sm">Video Lessons</span>
              </div>
              <span className="text-white/60 text-xs">8 videos</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-white text-sm">Slides</span>
              </div>
              <span className="text-white/60 text-xs">15 files</span>
            </div>
          </div>
          <Link href="/corsi">
            <button className="w-full bg-white hover:bg-white/90 text-primary py-3 rounded-lg font-semibold transition">
              Learn More
            </button>
          </Link>
        </div>

        {/* Esercizi Card */}
        <div className="bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded-2xl p-6 border border-white/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-5xl mb-3">✏️</div>
              <h3 className="text-2xl font-bold text-white mb-2">Esercizi</h3>
              <p className="text-white/80 text-sm">Pratica e migliora le tue competenze</p>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm">Completati</span>
              </div>
              <span className="text-white font-semibold text-sm">24/30</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-white text-sm">In Progress</span>
              </div>
              <span className="text-white font-semibold text-sm">4</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-white text-sm">Da Fare</span>
              </div>
              <span className="text-white font-semibold text-sm">2</span>
            </div>
          </div>
          <Link href="/corsi">
            <button className="w-full bg-white hover:bg-white/90 text-primary py-3 rounded-lg font-semibold transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-accent text-sm font-semibold mb-1">Corsi Attivi</div>
          <div className="text-white text-3xl font-bold">5</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-purple-300 text-sm font-semibold mb-1">Ore di Studio</div>
          <div className="text-white text-3xl font-bold">47h</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-pink-300 text-sm font-semibold mb-1">Media Voti</div>
          <div className="text-white text-3xl font-bold">8.7</div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Attività Settimanale</h3>
        <div className="h-40 flex items-end space-x-2">
          {[45, 68, 55, 82, 95, 70, 88].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col justify-end">
              <div
                className="bg-gradient-to-t from-accent to-purple-500 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-white/50 text-xs text-center mt-2">
                {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
