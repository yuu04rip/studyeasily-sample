'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  image: string;
  category: string;
  enrolled: number;
  rating: number;
  status: string;
  progress?: number;
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  enrolledAt: string;
}

export default function CoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [createdCourses, setCreatedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('student');
  const [userId, setUserId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'progress' | 'title' | 'recent'>('recent');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
      setUserId(user.id);
      
      fetchCourses(user.id, user.role);
    }
  }, []);

  const fetchCourses = async (uid: string, role: string) => {
    try {
      // Fetch enrollments
      const enrollmentsRes = await fetch(`/api/enrollments?userId=${uid}`);
      const enrollmentsData = await enrollmentsRes.json();
      const enrollments: Enrollment[] = enrollmentsData.enrollments || [];

      // Fetch all courses
      const coursesRes = await fetch('/api/courses');
      const coursesData = await coursesRes.json();
      const allCourses: Course[] = coursesData.courses || [];

      // Filter enrolled courses
      const enrolled = allCourses
        .filter(course => 
          enrollments.some(enr => enr.courseId === course.id)
        )
        .map(course => {
          const enrollment = enrollments.find(enr => enr.courseId === course.id);
          return {
            ...course,
            progress: enrollment?.progress || 0
          };
        });

      setEnrolledCourses(enrolled);

      // If instructor or admin, fetch created courses
      if (role === 'instructor' || role === 'admin') {
        const createdRes = await fetch(`/api/courses?instructorId=${uid}`);
        const createdData = await createdRes.json();
        setCreatedCourses(createdData.courses || []);
      }

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setLoading(false);
    }
  };

  // Filter and sort enrolled courses
  const getFilteredAndSortedCourses = (courses: Course[]) => {
    let filtered = courses;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(course => course.category === filterCategory);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'progress') {
        return (b.progress || 0) - (a.progress || 0);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0; // 'recent' - keep original order
    });

    return sorted;
  };

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(enrolledCourses.map(c => c.category)))];

  // Calculate stats
  const totalEnrolled = enrolledCourses.length;
  const averageProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / enrolledCourses.length)
    : 0;
  const completedCourses = enrolledCourses.filter(c => (c.progress || 0) >= 100).length;

  const filteredEnrolledCourses = getFilteredAndSortedCourses(enrolledCourses);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-neon-violet border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white neon-text-glow font-playfair">
            I MIEI CORSI
          </h1>
          <p className="text-lightPurple mt-2">
            Gestisci i tuoi corsi e monitora i progressi
          </p>
        </motion.div>

        {/* Stats Cards */}
        {enrolledCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="card-neon p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lightPurple text-sm">Corsi Iscritti</p>
                  <p className="text-3xl font-bold text-white mt-1">{totalEnrolled}</p>
                </div>
                <div className="text-4xl">📚</div>
              </div>
            </div>
            <div className="card-neon p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lightPurple text-sm">Progresso Medio</p>
                  <p className="text-3xl font-bold text-white mt-1">{averageProgress}%</p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </div>
            <div className="card-neon p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lightPurple text-sm">Corsi Completati</p>
                  <p className="text-3xl font-bold text-white mt-1">{completedCourses}</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enrolled Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white">
              Corsi a cui Partecipo
            </h2>
            
            {/* Search and Filters */}
            {enrolledCourses.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Cerca corsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 bg-dashboard-bgDark text-white rounded-lg border border-neon-violet/30 focus:border-neon-violet focus:outline-none"
                />
                
                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 bg-dashboard-bgDark text-white rounded-lg border border-neon-violet/30 focus:border-neon-violet focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'Tutte le categorie' : cat}
                    </option>
                  ))}
                </select>
                
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'progress' | 'title' | 'recent')}
                  className="px-4 py-2 bg-dashboard-bgDark text-white rounded-lg border border-neon-violet/30 focus:border-neon-violet focus:outline-none"
                >
                  <option value="recent">Più recenti</option>
                  <option value="progress">Per progresso</option>
                  <option value="title">Per titolo</option>
                </select>
              </div>
            )}
          </div>
          
          {enrolledCourses.length === 0 ? (
            <div className="card-neon p-8 text-center">
              <p className="text-lightPurple">Non sei iscritto a nessun corso</p>
              <Link
                href="/corsi"
                className="btn-neon-primary inline-block mt-4"
              >
                Esplora Corsi
              </Link>
            </div>
          ) : filteredEnrolledCourses.length === 0 ? (
            <div className="card-neon p-8 text-center">
              <p className="text-lightPurple">Nessun corso trovato con i filtri selezionati</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                }}
                className="btn-neon-secondary inline-block mt-4"
              >
                Rimuovi filtri
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEnrolledCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Link href={`/corsi/${course.id}`}>
                    <div className="card-neon p-4 h-full hover:shadow-neon-strong transition-all cursor-pointer">
                      <div
                        className="h-40 bg-cover bg-center rounded-lg mb-4"
                        style={{ backgroundImage: `url(${course.image})` }}
                      />
                      <h3 className="text-lg font-bold text-white mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-lightPurple mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-neon-cyan">{course.category}</span>
                        <span className="text-xs text-neon-magenta">⭐ {course.rating}</span>
                      </div>
                      {/* Progress bar */}
                      {course.progress !== undefined && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-white mb-2">
                            <span>Progresso</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-dashboard-bgDark rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              className="h-2 rounded-full bg-gradient-to-r from-neon-violet to-neon-magenta"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Created Courses Section (for instructors and admins) */}
        {(userRole === 'instructor' || userRole === 'admin') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Corsi che Creo
              </h2>
              <Link
                href="/instructor/create-course"
                className="btn-neon-primary"
              >
                + Nuovo Corso
              </Link>
            </div>
            {createdCourses.length === 0 ? (
              <div className="card-neon p-8 text-center">
                <p className="text-lightPurple">Non hai ancora creato nessun corso</p>
                <Link
                  href="/instructor/create-course"
                  className="btn-neon-primary inline-block mt-4"
                >
                  Crea il tuo primo corso
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="card-neon p-4 h-full">
                      <div
                        className="h-40 bg-cover bg-center rounded-lg mb-4 relative"
                        style={{ backgroundImage: `url(${course.image})` }}
                      >
                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white capitalize">
                          {course.status}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-lightPurple mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-neon-cyan">{course.enrolled} studenti</span>
                        <span className="text-xs text-neon-magenta">⭐ {course.rating}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/corsi/${course.id}`}
                          className="flex-1 btn-neon-secondary text-center text-sm py-2"
                        >
                          Modifica
                        </Link>
                        <Link
                          href={`/corsi/${course.id}`}
                          className="flex-1 btn-neon-primary text-center text-sm py-2"
                        >
                          Visualizza
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
