'use client';

import Link from 'next/link';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-gradientStart to-gradientEnd bg-clip-text text-transparent">
            StudyEasily
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/corsi" className="text-gray-700 hover:text-primary transition">
              Corsi
            </Link>
            <Link href="/piani" className="text-gray-700 hover:text-primary transition">
              Piani
            </Link>
            <Link href="/canali" className="text-gray-700 hover:text-primary transition">
              Canali
            </Link>
            <Link href="/business" className="text-gray-700 hover:text-primary transition">
              Business
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary transition">
              Blog
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-primary transition">
              FAQ
            </Link>
            <Link href="/contatti" className="text-gray-700 hover:text-primary transition">
              Contatti
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <Link
              href="/login"
              className="text-primary hover:text-accent transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-gradientStart to-gradientEnd text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/corsi" className="text-gray-700 hover:text-primary py-2">
                Corsi
              </Link>
              <Link href="/piani" className="text-gray-700 hover:text-primary py-2">
                Piani
              </Link>
              <Link href="/canali" className="text-gray-700 hover:text-primary py-2">
                Canali
              </Link>
              <Link href="/business" className="text-gray-700 hover:text-primary py-2">
                Business
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-primary py-2">
                Blog
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-primary py-2">
                FAQ
              </Link>
              <Link href="/contatti" className="text-gray-700 hover:text-primary py-2">
                Contatti
              </Link>
              <Link href="/login" className="text-primary py-2">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-gradientStart to-gradientEnd text-white px-4 py-2 rounded-lg hover:opacity-90 transition text-center"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
