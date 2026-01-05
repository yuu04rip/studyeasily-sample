'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PodaSearch from '@/components/PodaSearch';
import { useUser, clearUser } from '@/hooks/useUser';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  const { user, isLoggedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);

  // Reset avatar error when user changes
  useEffect(() => {
    setAvatarLoadError(false);
  }, [user?.avatar]);

  return (
    <header className="bg-gradient-to-r from-primary/95 to-darkPurple/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b-2 border-accent/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-white hover:text-accent transition">
            StudyEasily
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/corsi" className="text-white/90 hover:text-accent transition">
              Corsi
            </Link>
            <Link href="/piani" className="text-white/90 hover:text-accent transition">
              Piani
            </Link>
            <Link href="/canali" className="text-white/90 hover:text-accent transition">
              Canali
            </Link>
            <Link href="/business" className="text-white/90 hover:text-accent transition">
              Business
            </Link>
            <Link href="/blog" className="text-white/90 hover:text-accent transition">
              Blog
            </Link>
            <Link href="/faq" className="text-white/90 hover:text-accent transition">
              FAQ
            </Link>
            <Link href="/contatti" className="text-white/90 hover:text-accent transition">
              Contatti
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Inline compact PodaSearch in header: wrapper gives width */}
            <div className="w-[280px] scale-75 mr-8">
              <PodaSearch inline redirectToDashboard={false} />
            </div>
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 bg-gradient-purple-pink text-white px-4 py-2 rounded-full hover:opacity-90 transition font-semibold shadow-lg"
                >
                  {user?.avatar && user.avatar !== '/assets/avatar-default.jpg' && !avatarLoadError ? (
                    <img 
                      src={user.avatar} 
                      alt={user?.name || 'Profile'} 
                      className="w-8 h-8 rounded-full object-cover"
                      onError={() => setAvatarLoadError(true)}
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8" />
                  )}
                  <span className="max-w-[120px] truncate">{user?.name || 'User'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-purple-50 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-purple-50 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Settings
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        clearUser();
                        setShowProfileMenu(false);
                        router.push('/');
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-accent transition font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-accent text-white px-6 py-2 rounded-full hover:opacity-90 transition font-semibold shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
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
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/corsi" className="text-white/90 hover:text-accent py-2">
                Corsi
              </Link>
              <Link href="/piani" className="text-white/90 hover:text-accent py-2">
                Piani
              </Link>
              <Link href="/canali" className="text-white/90 hover:text-accent py-2">
                Canali
              </Link>
              <Link href="/business" className="text-white/90 hover:text-accent py-2">
                Business
              </Link>
              <Link href="/blog" className="text-white/90 hover:text-accent py-2">
                Blog
              </Link>
              <Link href="/faq" className="text-white/90 hover:text-accent py-2">
                FAQ
              </Link>
              <Link href="/contatti" className="text-white/90 hover:text-accent py-2">
                Contatti
              </Link>
              {/* Mobile PodaSearch */}
              <div className="py-2">
                <PodaSearch inline redirectToDashboard={false} />
              </div>
              
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-accent py-2">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/settings" className="text-white/90 py-2">
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      clearUser();
                      setIsMenuOpen(false);
                      router.push('/');
                    }}
                    className="text-red-400 py-2 text-left w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-white py-2">
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
