'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Grade {
  id: string;
  courseId: string;
  courseName: string;
  subject: string;
  grade: number;
  maxGrade: number;
  date: string;
  type: 'quiz' | 'exam' | 'assignment';
}

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      // Get user from localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      
      const response = await fetch(`/api/grades?userId=${user.id}`);
      const data = await response.json();
      
      setGrades(data.grades || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch grades:', error);
      setLoading(false);
    }
  };

  const subjects = ['all', ...Array.from(new Set(grades.map(g => g.subject)))];
  
  const filteredGrades = selectedSubject === 'all' 
    ? grades 
    : grades.filter(g => g.subject === selectedSubject);

  // Calculate statistics
  const averageGrade = filteredGrades.length > 0
    ? (filteredGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 100, 0) / filteredGrades.length).toFixed(1)
    : 0;

  const totalAssignments = filteredGrades.length;
  const passedAssignments = filteredGrades.filter(g => (g.grade / g.maxGrade) * 100 >= 60).length;

  // Chart data for progress over time
  const progressChartData = {
    labels: filteredGrades.slice(-10).map(g => new Date(g.date).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Voti (%)',
        data: filteredGrades.slice(-10).map(g => (g.grade / g.maxGrade) * 100),
        borderColor: '#9B6BFF',
        backgroundColor: 'rgba(155, 107, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart data for grades by subject
  const subjectGrades = subjects.filter(s => s !== 'all').map(subject => {
    const subjectGradesData = grades.filter(g => g.subject === subject);
    const avg = subjectGradesData.length > 0
      ? (subjectGradesData.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 100, 0) / subjectGradesData.length)
      : 0;
    return avg;
  });

  const subjectChartData = {
    labels: subjects.filter(s => s !== 'all'),
    datasets: [
      {
        label: 'Media per Materia (%)',
        data: subjectGrades,
        backgroundColor: [
          'rgba(155, 107, 255, 0.8)',
          'rgba(255, 102, 215, 0.8)',
          'rgba(53, 214, 198, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          '#9B6BFF',
          '#FF66D7',
          '#35D6C6',
          '#8B5CF6',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#E0C9FF',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#E0C9FF' },
        grid: { color: 'rgba(224, 201, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#E0C9FF' },
        grid: { color: 'rgba(224, 201, 255, 0.1)' },
        min: 0,
        max: 100,
      },
    },
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
            VOTI E ANDAMENTO
          </h1>
          <p className="text-lightPurple mt-2">
            Monitora il tuo progresso accademico
          </p>
        </motion.div>

        {/* Subject Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <label className="text-white mb-2 block">Filtra per Materia:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-dashboard-bgDark text-white border-2 border-neon-violet rounded-lg px-4 py-2 focus:outline-none focus:border-neon-magenta"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'Tutte le Materie' : subject}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-neon p-6"
          >
            <h3 className="text-lightPurple text-sm mb-2">Media Generale</h3>
            <p className="text-4xl font-bold text-white neon-text-glow">{averageGrade}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card-neon p-6"
          >
            <h3 className="text-lightPurple text-sm mb-2">Valutazioni Totali</h3>
            <p className="text-4xl font-bold text-white neon-text-glow">{totalAssignments}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card-neon p-6"
          >
            <h3 className="text-lightPurple text-sm mb-2">Tasso di Successo</h3>
            <p className="text-4xl font-bold text-white neon-text-glow">
              {totalAssignments > 0 ? ((passedAssignments / totalAssignments) * 100).toFixed(0) : 0}%
            </p>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card-neon p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Andamento nel Tempo</h3>
            <div className="h-64">
              <Line data={progressChartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Subject Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="card-neon p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Media per Materia</h3>
            <div className="h-64">
              <Bar data={subjectChartData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Grades Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="card-neon p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Storico Voti</h3>
          {filteredGrades.length === 0 ? (
            <p className="text-lightPurple text-center py-8">Nessun voto disponibile</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neon-violet/30">
                    <th className="text-left py-3 px-4 text-lightPurple">Corso</th>
                    <th className="text-left py-3 px-4 text-lightPurple">Materia</th>
                    <th className="text-left py-3 px-4 text-lightPurple">Tipo</th>
                    <th className="text-left py-3 px-4 text-lightPurple">Voto</th>
                    <th className="text-left py-3 px-4 text-lightPurple">Percentuale</th>
                    <th className="text-left py-3 px-4 text-lightPurple">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrades.map((grade, index) => {
                    const percentage = (grade.grade / grade.maxGrade) * 100;
                    const isPassing = percentage >= 60;
                    
                    return (
                      <motion.tr
                        key={grade.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="py-3 px-4 text-white">{grade.courseName}</td>
                        <td className="py-3 px-4 text-neon-cyan">{grade.subject}</td>
                        <td className="py-3 px-4 text-lightPurple capitalize">{grade.type}</td>
                        <td className="py-3 px-4 text-white">
                          {grade.grade}/{grade.maxGrade}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-bold ${isPassing ? 'text-neon-cyan' : 'text-neon-magenta'}`}>
                            {percentage.toFixed(0)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-lightPurple">
                          {new Date(grade.date).toLocaleDateString('it-IT')}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
