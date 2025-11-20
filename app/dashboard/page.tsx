'use client';

export default function DashboardPage() {
  return (
    <div className="bg-gradient-to-br from-primary via-purple-700 to-darkPurple min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">DASHBOARD</h1>
          <div className="flex items-center space-x-4">
            <span className="text-white text-xl font-semibold">Profile</span>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Course Images */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-accent shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-300 flex items-center justify-center text-white text-4xl font-bold">
                📚
              </div>
            </div>
            <div className="aspect-square rounded-full overflow-hidden border-4 border-accent shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-300 flex items-center justify-center text-white text-4xl font-bold">
                ✏️
              </div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-gradient-to-br from-primary/80 to-purple-900/80 rounded-3xl p-6 backdrop-blur-sm border border-accent/30">
            <div className="flex items-center justify-between mb-4">
              <button className="text-white hover:text-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-white font-bold text-lg">Month Year</h3>
              <button className="text-white hover:text-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-white/70 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="aspect-square flex items-center justify-center text-white/50 hover:bg-accent/30 rounded-lg cursor-pointer transition">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Materiale didattico', color: 'from-purple-200 to-pink-200' },
            { title: 'Esercizi', color: 'from-pink-200 to-purple-200' },
            { title: 'Esercizi', color: 'from-purple-200 to-blue-200' },
            { title: 'Materiale didattico', color: 'from-blue-200 to-purple-200' }
          ].map((card, i) => (
            <div key={i} className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 shadow-xl transform transition hover:scale-105`}>
              <h3 className="text-accent text-2xl font-bold mb-4 text-center">{card.title}</h3>
              <button className="w-full bg-darkPurple text-white px-6 py-3 rounded-full font-semibold hover:bg-darkPurple/80 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-accent/30">
          <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl p-8 h-64 flex items-end">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <path
                d="M 0,150 Q 100,50 200,100 T 400,80"
                fill="none"
                stroke="#E84CB4"
                strokeWidth="4"
              />
              <path
                d="M 0,150 Q 100,50 200,100 T 400,80 L 400,200 L 0,200 Z"
                fill="url(#dashGradient)"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="dashGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E84CB4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#5B4D9D" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
