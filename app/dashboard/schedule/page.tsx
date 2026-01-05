'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, EventModal, showToast } from '@/components/dashboard';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  description: string;
}

export default function SchedulePage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data.events || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setLoading(false);
    }
  };

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

  // Upcoming events (next 7 days)
  const now = new Date();
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= now && eventDate <= weekFromNow;
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

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
            CALENDARIO
          </h1>
          <p className="text-lightPurple mt-2">
            Gestisci il tuo programma e i tuoi impegni
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Calendar 
                events={events}
                onDateClick={handleDateClick}
              />
            </motion.div>
          </div>

          {/* Upcoming Events */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-neon p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Prossimi Eventi</h2>
                <button
                  onClick={() => {
                    setSelectedDate(new Date());
                    setSelectedEvents([]);
                    setIsEventModalOpen(true);
                  }}
                  className="btn-neon-primary text-sm py-2 px-4"
                >
                  + Nuovo
                </button>
              </div>

              {upcomingEvents.length === 0 ? (
                <p className="text-lightPurple text-center py-8">
                  Nessun evento in programma
                </p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => {
                    const startDate = new Date(event.start);
                    const endDate = new Date(event.end);
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-neon-violet/50 transition-all cursor-pointer"
                        onClick={() => {
                          setSelectedDate(startDate);
                          setSelectedEvents([event]);
                          setIsEventModalOpen(true);
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-bold">{event.title}</h3>
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: event.color }}
                          />
                        </div>
                        <p className="text-sm text-lightPurple mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center text-xs text-neon-cyan">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {startDate.toLocaleDateString('it-IT', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })} - {startDate.toLocaleTimeString('it-IT', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card-neon p-6 mt-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Statistiche</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lightPurple">Eventi Totali</span>
                  <span className="text-white font-bold text-2xl">{events.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lightPurple">Prossimi 7 giorni</span>
                  <span className="text-neon-cyan font-bold text-2xl">{upcomingEvents.length}</span>
                </div>
              </div>
            </motion.div>
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
