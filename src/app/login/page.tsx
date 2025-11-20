'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call the API
    console.log('Login:', { email, password });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bentornato!
          </h1>
          <p className="text-gray-600">
            Accedi al tuo account per continuare
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="utente@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Ricordami</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Password dimenticata?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Accedi
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">oppure</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <span className="text-xl">G</span>
                Continua con Google
              </button>
              <button className="w-full px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <span className="text-xl">f</span>
                Continua con Facebook
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Non hai un account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline font-medium">
              Registrati ora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
