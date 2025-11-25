'use client';

import { motion } from 'framer-motion';

interface Card {
  id: string;
  title: string;
  subtitle: string;
  type: string;
}

interface CardGridProps {
  cards: Card[];
  onCardClick?: (card: Card) => void;
}

const cardColors: Record<string, string> = {
  material: 'from-purple-200/90 to-pink-200/90',
  exercises: 'from-pink-200/90 to-purple-200/90',
  quiz: 'from-purple-200/90 to-blue-200/90',
  projects: 'from-blue-200/90 to-purple-200/90',
};

const cardIcons: Record<string, string> = {
  material: '📚',
  exercises: '✏️',
  quiz: '🎯',
  projects: '🚀',
};

export default function CardGrid({ cards, onCardClick }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => onCardClick?.(card)}
            className={`card-neon w-full bg-gradient-to-br ${
              cardColors[card.type] || 'from-purple-200/90 to-pink-200/90'
            } rounded-3xl p-6 text-left focus-neon`}
            aria-label={`${card.title}: ${card.subtitle}`}
          >
            {/* Icon */}
            <div className="text-4xl mb-4">
              {cardIcons[card.type] || '📖'}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-darkPurple mb-2">
              {card.title}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-darkPurple/70 mb-4">
              {card.subtitle}
            </p>

            {/* Learn More Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <span className="inline-flex items-center bg-darkPurple text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-darkPurple/90 transition-colors shadow-neon">
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </motion.div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
