'use client';

import { useSearchParams } from 'next/navigation';

interface DashboardPreviewProps {
  className?: string;
}

export default function DashboardPreview({ className = '' }: DashboardPreviewProps) {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  // Mock data for courses
  const allCourses = [
    { id: 1, name: 'Web Development', students: 1250, completion: 85, color: '#E84CB4' },
    { id: 2, name: 'Data Science', students: 980, completion: 78, color: '#5B4D9D' },
    { id: 3, name: 'Mobile Development', students: 760, completion: 92, color: '#8B5CF6' },
    { id: 4, name: 'Cloud Computing', students: 540, completion: 88, color: '#4A5FD9' },
  ];

  // Filter courses based on search query
  const filteredCourses = query
    ? allCourses.filter((course) => course.name.toLowerCase().includes(query.toLowerCase()))
    : allCourses;

  const highlightedCourse = filteredCourses.length > 0 ? filteredCourses[0] : null;

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-accent/30 ${className}`}>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Course Analytics Dashboard</h2>
        {query && (
          <p className="text-accent text-sm">
            Showing results for: <span className="font-semibold">&quot;{query}&quot;</span>
          </p>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-4 border border-accent/20">
          <div className="text-accent text-sm font-semibold mb-1">Total Students</div>
          <div className="text-white text-3xl font-bold">
            {filteredCourses.reduce((sum, c) => sum + c.students, 0)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl p-4 border border-purple-500/20">
          <div className="text-purple-300 text-sm font-semibold mb-1">Active Courses</div>
          <div className="text-white text-3xl font-bold">{filteredCourses.length}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500/20 to-pink-500/5 rounded-xl p-4 border border-pink-500/20">
          <div className="text-pink-300 text-sm font-semibold mb-1">Avg Completion</div>
          <div className="text-white text-3xl font-bold">
            {Math.round(filteredCourses.reduce((sum, c) => sum + c.completion, 0) / filteredCourses.length || 0)}%
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-4 border border-blue-500/20">
          <div className="text-blue-300 text-sm font-semibold mb-1">Success Rate</div>
          <div className="text-white text-3xl font-bold">94%</div>
        </div>
      </div>

      {/* Highlighted Course */}
      {highlightedCourse && (
        <div className="mb-8 p-6 bg-gradient-to-br from-accent/30 to-purple-600/30 rounded-2xl border-2 border-accent/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">{highlightedCourse.name}</h3>
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">Featured</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/70 text-sm">Enrolled Students</p>
              <p className="text-white text-2xl font-bold">{highlightedCourse.students}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">Completion Rate</p>
              <p className="text-white text-2xl font-bold">{highlightedCourse.completion}%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-accent h-full rounded-full transition-all duration-1000"
                style={{ width: `${highlightedCourse.completion}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Course List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">All Courses</h3>
        {filteredCourses.length === 0 ? (
          <div className="text-white/70 text-center py-8">
            No courses found matching &quot;{query}&quot;
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: course.color }}
                  ></div>
                  <span className="text-white font-semibold">{course.name}</span>
                </div>
                <span className="text-white/70 text-sm">{course.students} students</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${course.completion}%`,
                      backgroundColor: course.color,
                    }}
                  ></div>
                </div>
                <span className="text-white text-sm font-semibold">{course.completion}%</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mini Chart Visualization */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Enrollment Trend</h3>
        <div className="h-40 flex items-end space-x-2">
          {[65, 78, 82, 88, 95, 92, 98].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col justify-end">
              <div
                className="bg-gradient-to-t from-accent to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-white/50 text-xs text-center mt-2">W{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
