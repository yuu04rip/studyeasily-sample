'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CreateCoursePage() {
  const router = useRouter();
  const { user, isInstructor, isAdmin } = useUser();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    level: 'Beginner',
    duration: '',
    visibility: 'public',
  });
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [newCollaborator, setNewCollaborator] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCollaborator = () => {
    if (newCollaborator && !collaborators.includes(newCollaborator)) {
      setCollaborators([...collaborators, newCollaborator]);
      setNewCollaborator('');
    }
  };

  const handleRemoveCollaborator = (email: string) => {
    setCollaborators(collaborators.filter(c => c !== email));
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
          price: 0, // Price is set to 0 as payment is not yet configured
          instructorId: user.id,
          role: user.role,
          visibility: formData.visibility,
          collaborators: collaborators,
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
            <h1 className="text-4xl font-bold text-white mb-2">{t('course.create_title')}</h1>
            <p className="text-white/80">{t('course.create_subtitle')}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  {t('course.title')} *
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
                  {t('course.description')} *
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
                    {t('course.category')} *
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
                    {t('course.level')} *
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
                    {t('course.duration')} *
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
                    {t('course.visibility')} *
                  </label>
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                    required
                  >
                    <option value="public">{t('course.public')}</option>
                    <option value="private">{t('course.private')}</option>
                  </select>
                  <p className="text-white/60 text-sm mt-2">
                    {formData.visibility === 'public' 
                      ? t('course.visibility_public_desc')
                      : t('course.visibility_private_desc')
                    }
                  </p>
                </div>
              </div>

              {/* Collaborators Section */}
              <div className="pt-4 border-t border-white/20">
                <label className="block text-white font-medium mb-2">
                  {t('course.collaborators')}
                </label>
                <p className="text-white/60 text-sm mb-4">
                  Add other instructors or admins who can help manage this course
                </p>
                
                <div className="flex gap-2 mb-4">
                  <input
                    type="email"
                    value={newCollaborator}
                    onChange={(e) => setNewCollaborator(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                    placeholder={t('course.collaborator_email')}
                  />
                  <button
                    type="button"
                    onClick={handleAddCollaborator}
                    className="px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition"
                  >
                    {t('course.add_collaborator')}
                  </button>
                </div>

                {collaborators.length > 0 && (
                  <div className="space-y-2">
                    {collaborators.map((email) => (
                      <div 
                        key={email}
                        className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2 border border-white/10"
                      >
                        <span className="text-white">{email}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCollaborator(email)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                  {loading ? t('course.creating') : t('course.create_button')}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition border border-white/20"
                >
                  {t('course.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
