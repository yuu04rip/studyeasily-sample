'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          firstName: formData.name.split(' ')[0] || '',
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          password: formData.password,
          role: formData.role,
          avatar: '/assets/avatar-default.jpg',
          onlineStatus: 'online',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data in localStorage (mock authentication)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard with replace to prevent going back
        router.replace('/dashboard');
      } else {
        setError(data.error || 'Signup failed');
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
          <h1 className="text-4xl font-bold mb-2 text-white">Create an Account</h1>
          <p className="text-white/80">Start your learning journey today</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-accent/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-white/20 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-white/20 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                I am a
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-white/20 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              >
                <option value="student">Student - I want to learn</option>
                <option value="instructor">Instructor - I want to teach</option>
                <option value="tutor">Tutor - I want to assist</option>
              </select>
              {formData.role === 'instructor' && (
                <p className="mt-2 text-xs text-white/70">
                  Note: Instructor accounts may require approval before you can publish courses.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-white/20 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-white/20 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 text-white p-3 rounded-lg text-sm border border-red-500/30">
                {error}
              </div>
            )}

            <div className="text-sm text-white/80">
              <label className="flex items-start">
                <input type="checkbox" className="mr-2 mt-1" required />
                <span>
                  I agree to the{' '}
                  <a href="#" className="text-accent hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-accent hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 shadow-xl text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/80">
            Already have an account?{' '}
            <Link href="/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
