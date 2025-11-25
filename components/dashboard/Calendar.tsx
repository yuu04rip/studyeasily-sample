'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  addMonths, 
  subMonths, 
  isSameMonth, 
  isSameDay, 
  parseISO 
} from 'date-fns';
import { it } from 'date-fns/locale';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  description: string;
}

interface CalendarProps {
  events: CalendarEvent[];
  onDateClick?: (date: Date, events: CalendarEvent[]) => void;
  onEventCreate?: (event: Omit<CalendarEvent, 'id'>) => void;
}

export default function Calendar({ events, onDateClick }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  const getEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return events.filter(event => {
      const eventDate = parseISO(event.start);
      return isSameDay(eventDate, date);
    });
  }, [events]);

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const dayEvents = getEventsForDate(currentDay);
        const isCurrentMonth = isSameMonth(currentDay, monthStart);
        const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
        const isToday = isSameDay(currentDay, new Date());
        const hasEvents = dayEvents.length > 0;

        days.push(
          <motion.button
            key={currentDay.toString()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedDate(currentDay);
              onDateClick?.(currentDay, dayEvents);
            }}
            className={`calendar-cell aspect-square text-sm font-medium focus-neon ${
              !isCurrentMonth
                ? 'text-white/30'
                : isSelected
                ? 'selected bg-neon-violet text-white shadow-neon'
                : isToday
                ? 'bg-neon-magenta/30 text-white'
                : hasEvents
                ? 'has-event text-white'
                : 'text-white/70 hover:text-white'
            }`}
            aria-label={`${format(currentDay, 'd MMMM yyyy', { locale: it })}${
              hasEvents ? `, ${dayEvents.length} eventi` : ''
            }`}
            aria-pressed={isSelected || undefined}
          >
            <span className="relative">
              {format(currentDay, 'd')}
              {hasEvents && (
                <span 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: dayEvents[0]?.color || '#FF66D7' }}
                />
              )}
            </span>
          </motion.button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return rows;
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card-neon p-4 md:p-6"
    >
      {/* Header with month navigation */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={previousMonth}
          className="p-2 rounded-full hover:bg-white/10 transition-colors focus-neon text-white"
          aria-label="Mese precedente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <h3 className="text-lg md:text-xl font-bold text-white capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: it })}
        </h3>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-white/10 transition-colors focus-neon text-white"
          aria-label="Mese successivo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs text-lightPurple font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMonth.toString()}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderDays()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selected date events preview */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <h4 className="text-sm font-medium text-neon-cyan mb-2">
            {format(selectedDate, 'd MMMM', { locale: it })}
          </h4>
          {getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map(event => (
                <div
                  key={event.id}
                  className="flex items-center space-x-2 text-sm"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                  <span className="text-white truncate">{event.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-lightPurple/70">Nessun evento</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
