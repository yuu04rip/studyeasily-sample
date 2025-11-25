'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  CircularWidget, 
  CardGrid, 
  ProfileCard, 
  Calendar, 
  RecentWidget,
  EventModal,
  showToast 
} from '@/components/dashboard';

interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  quickWidgets: Array<{
    id: string;
    title: string;
    value: number;
    image: string;
    progress: number;
  }>;
  cards: Array<{
    id: string;
    title: string;
    subtitle: string;
    type: string;
  }>;
  recentItems: Array<{
    id: string;
    title: string;
    type: string;
    image: string;
    lastAccessed: string;
  }>;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  description: string;
}

// Fallback data when API is not available
const fallbackData: DashboardData = {
  user: {
    id: 'student_42',
    name: 'Marco Rossi',
    email: 'marco.rossi@studyeasily.com',
    avatar: '/assets/avatar-1.jpg',
    role: 'student'
  },
  quickWidgets: [
    { id: 'w1', title: 'Corsi Attivi', value: 4, image: '/assets/course-1.jpg', progress: 68 },
    { id: 'w2', title: 'Esercizi Completati', value: 127, image: '/assets/course-2.jpg', progress: 85 }
  ],
  cards: [
    { id: 'c1', title: 'Materiale didattico', subtitle: 'Risorse per il tuo apprendimento', type: 'material' },
    { id: 'c2', title: 'Esercizi', subtitle: 'Pratica e migliora le tue competenze', type: 'exercises' },
    { id: 'c3', title: 'Quiz', subtitle: 'Metti alla prova le tue conoscenze', type: 'quiz' },
    { id: 'c4', title: 'Progetti', subtitle: 'Progetti pratici e casi studio', type: 'projects' }
  ],
  recentItems: [
    { id: 'r1', title: 'React Hooks', type: 'lesson', image: '/assets/course-2.jpg', lastAccessed: new Date().toISOString() },
    { id: 'r2', title: 'CSS Flexbox', type: 'exercise', image: '/assets/course-1.jpg', lastAccessed: new Date().toISOString() },
    { id: 'r3', title: 'Python Basics', type: 'lesson', image: '/assets/course-3.jpg', lastAccessed: new Date().toISOString() }
  ]
};

const fallbackEvents: CalendarEvent[] = [
  { id: 'evt_1', title: 'Lezione Matematica', start: '2025-12-03T10:00:00Z', end: '2025-12-03T11:30:00Z', color: '#FF66D7', description: 'Link: zoom/abc123' },
  { id: 'evt_2', title: 'Esame React', start: '2025-12-10T09:00:00Z', end: '2025-12-10T12:00:00Z', color: '#9B6BFF', description: 'Esame finale del corso React' },
  { id: 'evt_3', title: 'Workshop Python', start: '2025-12-15T14:00:00Z', end: '2025-12-15T17:00:00Z', color: '#35D6C6', description: 'Workshop pratico su data science' }
];

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  // Fetch dashboard data with retry logic
  const fetchData = useCallback(async (retryCount = 0): Promise<void> => {
    try {
      const [dashboardRes, eventsRes] = await Promise.all([
        fetch('/api/dashboard'),
        fetch('/api/events')
      ]);
      
      if (!dashboardRes.ok || !eventsRes.ok) {
        throw new Error('API response not ok');
      }
      
      const dashboardJson = await dashboardRes.json();
      const eventsJson = await eventsRes.json();
      
      // Validate that we got actual data
      if (dashboardJson && dashboardJson.user) {
        setDashboardData(dashboardJson);
      } else {
        setDashboardData(fallbackData);
      }
      
      setEvents(eventsJson.events || fallbackEvents);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      
      // Retry up to 3 times with delay (waiting for MSW to initialize)
      if (retryCount < 3) {
        setTimeout(() => fetchData(retryCount + 1), 500);
        return;
      }
      
      // Use fallback data after retries fail
      setDashboardData(fallbackData);
      setEvents(fallbackEvents);
      setLoading(false);
    }
  }, []);

  // MSW initialization delay constant
  // MSW service worker needs time to register and start intercepting requests
  const MSW_INIT_DELAY_MS = 100;

  useEffect(() => {
    // Small delay to allow MSW (Mock Service Worker) to initialize before making API requests
    // This prevents race conditions where fetch calls are made before MSW is ready
    const timer = setTimeout(() => {
      fetchData();
    }, MSW_INIT_DELAY_MS);
    
    return () => clearTimeout(timer);
  }, [fetchData]);

  const handleDateClick = (date: Date, dayEvents: CalendarEvent[]) => {
    setSelectedDate(date);
    setSelectedEvents(dayEvents);
    setIsEventModalOpen(true);
  };

  const handleEventSave = async (eventData: Omit<CalendarEvent, 'id'> | CalendarEvent) => {
    try {
      if ('id' in eventData) {
        // Update existing event
        const response = await fetch(`/api/events/${eventData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        });
        const { event } = await response.json();
        setEvents(prev => prev.map(e => e.id === event.id ? event : e));
        showToast('Evento aggiornato con successo', 'success');
      } else {
        // Create new event
        const response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        });
        const { event } = await response.json();
        setEvents(prev => [...prev, event]);
        showToast('Evento creato con successo', 'success');
      }
    } catch (error) {
      console.error('Failed to save event:', error);
      showToast('Errore nel salvataggio dell\'evento', 'error');
    }
  };

  const handleCardClick = (card: { id: string; title: string; subtitle: string; type: string }) => {
    showToast(`Apertura ${card.title}...`, 'info');
  };

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

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Errore nel caricamento della dashboard</p>
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
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white neon-text-glow font-playfair">
              DASHBOARD
            </h1>
            <p className="text-lightPurple mt-2">
              Benvenuto, {dashboardData.user.name}
            </p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Circular Widgets */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
              {dashboardData.quickWidgets.map((widget, index) => (
                <CircularWidget
                  key={widget.id}
                  title={widget.title}
                  value={widget.value}
                  image={widget.image}
                  progress={widget.progress}
                  index={index}
                />
              ))}
            </div>

            {/* Card Grid */}
            <CardGrid 
              cards={dashboardData.cards} 
              onCardClick={handleCardClick}
            />

            {/* Chart Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-neon p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Progresso</h3>
              <div className="bg-gradient-to-br from-neon-violet/20 to-neon-magenta/20 rounded-2xl p-8 h-48 md:h-64 flex items-end">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FF66D7" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#9B6BFF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#35D6C6" stopOpacity="0.2" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <motion.path
                    d="M 0,150 Q 100,50 200,100 T 400,80 L 400,200 L 0,200 Z"
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.path
                    d="M 0,150 Q 100,50 200,100 T 400,80"
                    fill="none"
                    stroke="#FF66D7"
                    strokeWidth="3"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Profile, Calendar, Recent */}
          <div className="space-y-6">
            {/* Profile Card */}
            <ProfileCard user={dashboardData.user} />

            {/* Calendar */}
            <Calendar 
              events={events}
              onDateClick={handleDateClick}
            />

            {/* Recent Items */}
            <RecentWidget 
              items={dashboardData.recentItems}
              onItemClick={(item) => showToast(`Apertura ${item.title}...`, 'info')}
            />
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setSelectedDate(null);
          setSelectedEvents([]);
        }}
        onSave={handleEventSave}
        selectedDate={selectedDate || undefined}
        event={selectedEvents[0] || null}
      />
    </div>
  );
}
