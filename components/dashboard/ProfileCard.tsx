'use client';

import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card-neon p-4 md:p-6"
    >
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-neon-violet shadow-neon">
            {user.avatar ? (
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${user.avatar})` }}
                role="img"
                aria-label={`Avatar di ${user.name}`}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neon-violet to-neon-magenta flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {/* Online status indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-neon-cyan rounded-full border-2 border-dashboard-bg shadow-neon-cyan" />
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold text-white truncate">
            {user.name}
          </h3>
          <p className="text-sm text-neon-cyan capitalize">
            {user.role}
          </p>
          <p className="text-xs text-lightPurple/70 truncate mt-1">
            {user.email}
          </p>
        </div>

        {/* Settings button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-white/10 transition-colors focus-neon"
          aria-label="Impostazioni profilo"
        >
          <svg className="w-6 h-6 text-lightPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
