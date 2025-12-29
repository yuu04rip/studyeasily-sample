'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

export default function CreateCoursePage() {
  const router = useRouter();
  const { user, isInstructor, isAdmin } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    level: 'Beginner',
    duration: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || (!isInstructor && !isAdmin)) {
      setError('You must be an instructor or admin to create courses');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          instructorId: user.id,
          role: user.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/corsi/${data.course.id}`);
      } else {
        setError(data.error || 'Failed to create course');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-700 to-accent">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Create New Course</h1>
            <p className="text-white/80">Fill in the details to create your course</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                  placeholder="e.g., Introduction to React"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                  placeholder="Describe what students will learn in this course..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                    required
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Level *
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                    placeholder="e.g., 8 weeks"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                    placeholder="49.99"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 text-white p-4 rounded-lg border border-red-500/30">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Course'}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition border border-white/20"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
