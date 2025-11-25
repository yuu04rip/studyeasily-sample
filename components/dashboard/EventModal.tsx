'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import Modal from './Modal';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  description: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'> | CalendarEvent) => void;
  selectedDate?: Date;
  event?: CalendarEvent | null;
}

const colorOptions = [
  { value: '#FF66D7', label: 'Magenta' },
  { value: '#9B6BFF', label: 'Viola' },
  { value: '#35D6C6', label: 'Ciano' },
];

export default function EventModal({ 
  isOpen, 
  onClose, 
  onSave, 
  selectedDate, 
  event 
}: EventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    color: '#9B6BFF',
  });

  // Reset form when modal opens/closes or when event changes
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        start: event.start.slice(0, 16), // Format for datetime-local input
        end: event.end.slice(0, 16),
        color: event.color,
      });
    } else if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd'T'HH:mm");
      setFormData({
        title: '',
        description: '',
        start: dateStr,
        end: dateStr,
        color: '#9B6BFF',
      });
    }
  }, [event, selectedDate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      title: formData.title,
      description: formData.description,
      start: new Date(formData.start).toISOString(),
      end: new Date(formData.end).toISOString(),
      color: formData.color,
    };

    if (event) {
      onSave({ ...eventData, id: event.id });
    } else {
      onSave(eventData);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event ? 'Modifica Evento' : 'Nuovo Evento'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="event-title" className="block text-sm font-medium text-lightPurple mb-1">
            Titolo *
          </label>
          <input
            id="event-title"
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-neon-violet/30 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent"
            placeholder="Nome dell'evento"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="event-description" className="block text-sm font-medium text-lightPurple mb-1">
            Descrizione
          </label>
          <textarea
            id="event-description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-neon-violet/30 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent resize-none"
            placeholder="Descrizione, link meeting, note..."
          />
        </div>

        {/* Start Date/Time */}
        <div>
          <label htmlFor="event-start" className="block text-sm font-medium text-lightPurple mb-1">
            Inizio *
          </label>
          <input
            id="event-start"
            type="datetime-local"
            required
            value={formData.start}
            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-neon-violet/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent"
          />
        </div>

        {/* End Date/Time */}
        <div>
          <label htmlFor="event-end" className="block text-sm font-medium text-lightPurple mb-1">
            Fine *
          </label>
          <input
            id="event-end"
            type="datetime-local"
            required
            value={formData.end}
            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-neon-violet/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-lightPurple mb-2">
            Colore
          </label>
          <div className="flex space-x-3">
            {colorOptions.map((color) => (
              <motion.button
                key={color.value}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setFormData({ ...formData, color: color.value })}
                className={`w-8 h-8 rounded-full focus-neon ${
                  formData.color === color.value 
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-dashboard-bg' 
                    : ''
                }`}
                style={{ backgroundColor: color.value }}
                aria-label={color.label}
                aria-pressed={formData.color === color.value}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 pt-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors focus-neon"
          >
            Annulla
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-2 bg-neon-violet text-white rounded-lg hover:bg-neon-violet/90 transition-colors shadow-neon focus-neon"
          >
            {event ? 'Salva' : 'Crea'}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
}
