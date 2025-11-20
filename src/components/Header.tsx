'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            StudyEasily
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/corsi" className="text-gray-700 hover:text-blue-600 transition">
              Corsi
            </Link>
            <Link href="/piani" className="text-gray-700 hover:text-blue-600 transition">
              Piani
            </Link>
            <Link href="/canali" className="text-gray-700 hover:text-blue-600 transition">
              Canali
            </Link>
            <Link href="/business" className="text-gray-700 hover:text-blue-600 transition">
              Business
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition">
              Blog
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition">
              FAQ
            </Link>
            <Link href="/contatti" className="text-gray-700 hover:text-blue-600 transition">
              Contatti
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Registrati
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/corsi" className="block py-2 text-gray-700 hover:text-blue-600">
              Corsi
            </Link>
            <Link href="/piani" className="block py-2 text-gray-700 hover:text-blue-600">
              Piani
            </Link>
            <Link href="/canali" className="block py-2 text-gray-700 hover:text-blue-600">
              Canali
            </Link>
            <Link href="/business" className="block py-2 text-gray-700 hover:text-blue-600">
              Business
            </Link>
            <Link href="/blog" className="block py-2 text-gray-700 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/faq" className="block py-2 text-gray-700 hover:text-blue-600">
              FAQ
            </Link>
            <Link href="/contatti" className="block py-2 text-gray-700 hover:text-blue-600">
              Contatti
            </Link>
            <div className="pt-2 space-y-2">
              <Link
                href="/login"
                className="block px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-2 text-center bg-blue-600 text-white rounded-lg"
              >
                Registrati
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
