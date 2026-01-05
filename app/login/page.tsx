'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage (mock authentication)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Force a full page reload to ensure dashboard refreshes with new user data
        window.location.href = '/dashboard';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-700 to-accent flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Benvenuto</h1>
          <p className="text-white/80">Accedi al tuo account per continuare ad imparare</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-accent/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                placeholder="demo@studyeasily.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 text-white p-3 rounded-lg text-sm border border-red-500/30">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white/90">
                <input type="checkbox" className="mr-2" />
                <span>Ricordami</span>
              </label>
              <a href="#" className="text-accent hover:text-accent/80 transition">
                Password dimenticata?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 shadow-xl"
            >
              {loading ? 'Accesso...' : 'Accedi'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/80">
            Non hai un account?{' '}
            <Link href="/signup" className="text-accent hover:text-accent/80 font-semibold transition">
              Registrati
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-xs text-white/60 text-center">
              <strong>Demo:</strong> Usa email "demo@studyeasily.com" con qualsiasi password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
