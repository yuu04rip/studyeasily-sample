'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

interface RecentItem {
  id: string;
  title: string;
  type: string;
  image: string;
  lastAccessed: string;
}

interface RecentWidgetProps {
  items: RecentItem[];
  onItemClick?: (item: RecentItem) => void;
}

const typeLabels: Record<string, string> = {
  lesson: 'Lezione',
  exercise: 'Esercizio',
  quiz: 'Quiz',
  project: 'Progetto',
};

const typeIcons: Record<string, string> = {
  lesson: '📖',
  exercise: '✏️',
  quiz: '🎯',
  project: '🚀',
};

export default function RecentWidget({ items, onItemClick }: RecentWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="card-neon p-4 md:p-6"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recenti
      </h3>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onItemClick?.(item)}
            className="w-full flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors focus-neon text-left"
          >
            {/* Thumbnail */}
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-neon-violet/30">
              {item.image ? (
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label={item.title}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-neon-violet to-neon-magenta flex items-center justify-center text-lg">
                  {typeIcons[item.type] || '📖'}
                </div>
              )}
              {/* Type badge */}
              <div className="absolute -bottom-1 -right-1 text-xs">
                {typeIcons[item.type] || '📖'}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">
                {item.title}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-neon-cyan">
                  {typeLabels[item.type] || item.type}
                </span>
                <span className="text-xs text-lightPurple/50">•</span>
                <span className="text-xs text-lightPurple/70">
                  {formatDistanceToNow(parseISO(item.lastAccessed), { 
                    addSuffix: true, 
                    locale: it 
                  })}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <svg className="w-4 h-4 text-lightPurple/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-lightPurple/70 text-center py-4">
          Nessun elemento recente
        </p>
      )}
    </motion.div>
  );
}
