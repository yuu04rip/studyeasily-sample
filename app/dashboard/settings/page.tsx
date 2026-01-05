'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { showToast } from '@/components/dashboard';
import { User, OnlineStatus } from '@/types';

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [description, setDescription] = useState('');
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>('online');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      setUser(userData);
      
      // Set form values from user data
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setEmail(userData.email || '');
      setBirthDate(userData.birthDate || '');
      setDescription(userData.description || '');
      setOnlineStatus(userData.onlineStatus || 'online');
      setAvatar(userData.avatar || '');
    }
    setLoading(false);
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    // Validate passwords if changing
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        showToast('Le password non corrispondono', 'error');
        return;
      }
      if (newPassword.length < 6) {
        showToast('La password deve essere di almeno 6 caratteri', 'error');
        return;
      }
    }

    setSaving(true);

    try {
      const updatedUser: User = {
        ...user,
        firstName,
        lastName,
        email,
        birthDate,
        description,
        onlineStatus,
        avatar,
        name: `${firstName} ${lastName}`.trim() || user.name,
      };

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedUser,
          ...(newPassword && { password: newPassword }),
        }),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'aggiornamento del profilo');
      }

      const { user: savedUser } = await response.json();
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(savedUser));
      setUser(savedUser);
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      showToast('Profilo aggiornato con successo', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Errore durante l\'aggiornamento del profilo', 'error');
    } finally {
      setSaving(false);
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
            IMPOSTAZIONI PROFILO
          </h1>
          <p className="text-lightPurple mt-2">
            Configura il tuo profilo e le tue preferenze
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-neon p-6 md:p-8 max-w-4xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4 pb-6 border-b border-white/10">
              <label className="text-white font-semibold text-lg">Immagine Profilo</label>
              <button
                type="button"
                onClick={handleAvatarClick}
                className="group relative w-32 h-32 rounded-full overflow-hidden border-4 border-neon-violet shadow-neon focus-neon cursor-pointer"
              >
                {avatar ? (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${avatar})` }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neon-violet to-neon-magenta flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Nome</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/50 transition"
                  placeholder="Inserisci il tuo nome"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Cognome</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/50 transition"
                  placeholder="Inserisci il tuo cognome"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/50 transition"
                placeholder="email@esempio.com"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Data di Nascita</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/50 transition"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Descrizione</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/50 transition resize-none"
                placeholder="Racconta qualcosa di te..."
              />
            </div>

            {/* Online Status */}
            <div>
              <label className="block text-white font-medium mb-2">Stato Online</label>
              <select
                value={onlineStatus}
                onChange={(e) => setOnlineStatus(e.target.value as OnlineStatus)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/50 transition"
              >
                <option value="online" className="bg-dashboard-bg text-white">Online</option>
                <option value="offline" className="bg-dashboard-bg text-white">Offline</option>
                <option value="do-not-disturb" className="bg-dashboard-bg text-white">Non Disturbare</option>
              </select>
            </div>

            {/* Password Change Section */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Cambia Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Password Attuale</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/50 transition"
                    placeholder="Inserisci la password attuale"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Nuova Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/50 transition"
                    placeholder="Inserisci la nuova password"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Conferma Nuova Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-lightPurple/50 focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/50 transition"
                    placeholder="Conferma la nuova password"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <motion.button
                type="submit"
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-neon-violet to-neon-magenta text-white font-semibold rounded-lg shadow-neon hover:shadow-neon-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Salvataggio...' : 'Salva Modifiche'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
