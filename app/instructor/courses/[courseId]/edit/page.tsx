'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { showToast } from '@/components/dashboard';

type TabType = 'content' | 'materials' | 'tests' | 'appearance';

interface Material {
  id: string;
  title: string;
  type: 'video' | 'document' | 'link' | 'image';
  url: string;
  description?: string;
}

interface TestQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface Test {
  id: string;
  title: string;
  description: string;
  questions: TestQuestion[];
  timeLimit?: number;
  passingScore?: number;
}

export default function CourseEditorPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const { user, isInstructor, isAdmin } = useUser();
  
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Course data
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseContent, setCourseContent] = useState('');
  
  // Materials
  const [materials, setMaterials] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'video' as const,
    url: '',
    description: '',
  });
  
  // Tests
  const [tests, setTests] = useState<Test[]>([]);
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  
  // Appearance
  const [themeColor, setThemeColor] = useState('#6366f1');
  const [bannerImage, setBannerImage] = useState('');
  const [customCSS, setCustomCSS] = useState('');

  useEffect(() => {
    if (!user || (!isInstructor && !isAdmin)) {
      router.push('/dashboard');
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        const data = await response.json();
        
        if (data.course) {
          setCourseTitle(data.course.title);
          setCourseDescription(data.course.description);
          setThemeColor(data.course.themeColor || '#6366f1');
          setBannerImage(data.course.bannerImage || '');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, user, isInstructor, isAdmin, router]);

  const handleSaveCourse = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: courseTitle,
          description: courseDescription,
          content: courseContent,
          themeColor,
          bannerImage,
          customCSS,
        }),
      });

      if (response.ok) {
        showToast('Course saved successfully!', 'success');
      } else {
        showToast('Failed to save course', 'error');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      showToast('Failed to save course', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddMaterial = async () => {
    if (!newMaterial.title || !newMaterial.url) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const material: Material = {
      id: `mat_${Date.now()}`,
      ...newMaterial,
    };

    try {
      const response = await fetch(`/api/courses/${courseId}/materials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material),
      });

      if (response.ok) {
        setMaterials([...materials, material]);
        setNewMaterial({ title: '', type: 'video', url: '', description: '' });
      }
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const handleDeleteMaterial = async (materialId: string) => {
    try {
      await fetch(`/api/courses/${courseId}/materials/${materialId}`, {
        method: 'DELETE',
      });
      setMaterials(materials.filter(m => m.id !== materialId));
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  const handleCreateTest = () => {
    const newTest: Test = {
      id: `test_${Date.now()}`,
      title: 'New Test',
      description: '',
      questions: [],
      timeLimit: 60,
      passingScore: 70,
    };
    setCurrentTest(newTest);
  };

  const handleSaveTest = async () => {
    if (!currentTest) return;

    try {
      const response = await fetch(`/api/courses/${courseId}/tests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTest),
      });

      if (response.ok) {
        setTests([...tests, currentTest]);
        setCurrentTest(null);
        showToast('Test saved successfully!', 'success');
      } else {
        showToast('Failed to save test', 'error');
      }
    } catch (error) {
      console.error('Error saving test:', error);
      showToast('Failed to save test', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-purple-700 to-accent">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-700 to-accent">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Course Builder</h1>
              <p className="text-white/80">{courseTitle}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveCourse}
                disabled={saving}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition border border-white/20"
              >
                Back
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-white/20">
            {[
              { id: 'content', label: 'Content', icon: '📝' },
              { id: 'materials', label: 'Materials', icon: '📚' },
              { id: 'tests', label: 'Tests', icon: '✅' },
              { id: 'appearance', label: 'Appearance', icon: '🎨' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-accent'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Course Title</label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                  placeholder="Enter course description"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Course Content</label>
                <p className="text-white/60 text-sm mb-2">
                  Write your course content here. You can include text, instructions, and formatted content.
                </p>
                <textarea
                  value={courseContent}
                  onChange={(e) => setCourseContent(e.target.value)}
                  rows={15}
                  className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none font-mono text-sm"
                  placeholder="Write your course content here...&#10;&#10;Example:&#10;# Week 1: Introduction&#10;Welcome to the course!&#10;&#10;## Topics Covered&#10;- Topic 1&#10;- Topic 2"
                />
              </div>
            </div>
          )}

          {/* Materials Tab */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Add Material</h3>
                <p className="text-white/60 text-sm mb-4">
                  Upload videos, documents, images, or add links to external resources
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    className="px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                    placeholder="Material title"
                  />
                  <select
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value as any })}
                    className="px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                  >
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="link">Link</option>
                    <option value="image">Image</option>
                  </select>
                  <input
                    type="text"
                    value={newMaterial.url}
                    onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                    className="px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none md:col-span-2"
                    placeholder="Material URL (YouTube link, Google Drive link, etc.)"
                  />
                  <textarea
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    rows={2}
                    className="px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none md:col-span-2"
                    placeholder="Description (optional)"
                  />
                </div>
                <button
                  onClick={handleAddMaterial}
                  className="px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition"
                >
                  + Add Material
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Course Materials</h3>
                {materials.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/60">No materials uploaded yet</p>
                    <p className="text-white/40 text-sm mt-2">Add your first material above</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">
                              {material.type === 'video' && '🎥'}
                              {material.type === 'document' && '📄'}
                              {material.type === 'link' && '🔗'}
                              {material.type === 'image' && '🖼️'}
                            </span>
                            <h4 className="text-white font-medium">{material.title}</h4>
                            <span className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded">
                              {material.type}
                            </span>
                          </div>
                          <p className="text-sm text-white/60 truncate ml-8">{material.url}</p>
                          {material.description && (
                            <p className="text-sm text-white/50 mt-1 ml-8">{material.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteMaterial(material.id)}
                          className="ml-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tests Tab */}
          {activeTab === 'tests' && (
            <div className="space-y-6">
              {!currentTest ? (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white">Course Tests</h3>
                      <p className="text-white/60 text-sm mt-1">
                        Create quizzes and tests to assess student learning
                      </p>
                    </div>
                    <button
                      onClick={handleCreateTest}
                      className="px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition"
                    >
                      + Create New Test
                    </button>
                  </div>
                  {tests.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-white/60">No tests created yet</p>
                      <p className="text-white/40 text-sm mt-2">Create your first test to assess students</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {tests.map((test) => (
                        <div
                          key={test.id}
                          className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition"
                        >
                          <h4 className="text-white font-medium mb-2">{test.title}</h4>
                          <p className="text-sm text-white/60">
                            {test.questions.length} questions • {test.timeLimit} minutes • {test.passingScore}% to pass
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Edit Test</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveTest}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
                      >
                        Save Test
                      </button>
                      <button
                        onClick={() => setCurrentTest(null)}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition border border-white/20"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={currentTest.title}
                      onChange={(e) => setCurrentTest({ ...currentTest, title: e.target.value })}
                      className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                      placeholder="Test title"
                    />
                    <textarea
                      value={currentTest.description}
                      onChange={(e) => setCurrentTest({ ...currentTest, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                      placeholder="Test description"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm mb-2">Time Limit (minutes)</label>
                        <input
                          type="number"
                          value={currentTest.timeLimit || ''}
                          onChange={(e) => setCurrentTest({ ...currentTest, timeLimit: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                          placeholder="60"
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-2">Passing Score (%)</label>
                        <input
                          type="number"
                          value={currentTest.passingScore || ''}
                          onChange={(e) => setCurrentTest({ ...currentTest, passingScore: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                          placeholder="70"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <p className="text-white/60 text-center">
                      Question builder interface will be available soon.<br />
                      You can add multiple-choice, true/false, and short-answer questions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Customize Course Appearance</h3>
                <p className="text-white/60 text-sm mb-6">
                  Personalize the look and feel of your course page
                </p>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Theme Color</label>
                <p className="text-white/60 text-sm mb-3">Choose a color that represents your course</p>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="h-14 w-24 rounded-lg cursor-pointer border-2 border-white/20"
                  />
                  <input
                    type="text"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none flex-1"
                    placeholder="#6366f1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Banner Image URL</label>
                <p className="text-white/60 text-sm mb-3">Add a banner image to make your course stand out</p>
                <input
                  type="text"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                  placeholder="https://example.com/banner.jpg"
                />
                {bannerImage && (
                  <div className="mt-4 rounded-lg overflow-hidden border-2 border-white/20">
                    <img src={bannerImage} alt="Banner preview" className="w-full h-48 object-cover" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Custom CSS (Advanced)</label>
                <p className="text-white/60 text-sm mb-3">
                  Add custom styles to further personalize your course appearance
                </p>
                <textarea
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none font-mono text-sm"
                  placeholder=".course-title {&#10;  font-size: 2rem;&#10;  color: #6366f1;&#10;}&#10;&#10;.course-section {&#10;  padding: 2rem;&#10;}"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
