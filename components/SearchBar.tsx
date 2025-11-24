'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchBarProps {
  redirectToDashboard?: boolean;
}

export default function SearchBar({ redirectToDashboard = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // If redirectToDashboard is true, navigate to contacts page with dashboard
      // Otherwise, navigate to courses page
      if (redirectToDashboard) {
        router.push(`/contatti?q=${encodeURIComponent(query)}`);
      } else {
        router.push(`/corsi?search=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-64 px-4 py-2 pr-10 border-2 border-primary/30 rounded-lg focus:outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(91,77,157,0.5),0_0_40px_rgba(232,76,180,0.3)] transition-all duration-300 bg-white/90 hover:shadow-[0_0_15px_rgba(91,77,157,0.3),0_0_25px_rgba(232,76,180,0.2)]"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors duration-300"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}
