'use client';

import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import mockData from '@/mocks/mock-data.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DataAnalyticsPage() {
  const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'];

  const courseViewsData = {
    labels: months,
    datasets: [
      {
        label: 'Visualizzazioni Corsi',
        data: mockData.analyticsData.courseViews,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const userGrowthData = {
    labels: months,
    datasets: [
      {
        label: 'Crescita Utenti',
        data: mockData.analyticsData.userGrowth,
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
      },
    ],
  };

  const completionRatesData = {
    labels: ['Completati', 'In Corso', 'Non Iniziati'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  const revenueData = {
    labels: months,
    datasets: [
      {
        label: 'Entrate Mensili (€)',
        data: mockData.analyticsData.monthlyRevenue,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Data Analytics
          </h1>
          <p className="text-lg text-gray-600">
            Analizza le metriche e le performance della piattaforma
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-sm text-gray-600 mb-2">Utenti Totali</div>
            <div className="text-3xl font-bold text-gray-900">340</div>
            <div className="text-sm text-green-600 mt-2">+36% vs mese scorso</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-sm text-gray-600 mb-2">Corsi Attivi</div>
            <div className="text-3xl font-bold text-gray-900">
              {mockData.courses.length}
            </div>
            <div className="text-sm text-blue-600 mt-2">In crescita</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-sm text-gray-600 mb-2">Tasso Completamento</div>
            <div className="text-3xl font-bold text-gray-900">78%</div>
            <div className="text-sm text-green-600 mt-2">+3% vs mese scorso</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-sm text-gray-600 mb-2">Entrate Mensili</div>
            <div className="text-3xl font-bold text-gray-900">€4.8K</div>
            <div className="text-sm text-green-600 mt-2">+14% vs mese scorso</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Visualizzazioni Corsi
            </h2>
            <div className="h-80">
              <Line data={courseViewsData} options={options} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Crescita Utenti
            </h2>
            <div className="h-80">
              <Bar data={userGrowthData} options={options} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Entrate Mensili
            </h2>
            <div className="h-80">
              <Line data={revenueData} options={options} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Stato Corsi
            </h2>
            <div className="h-80 flex items-center justify-center">
              <Doughnut data={completionRatesData} options={options} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Attività Recente
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">Nuovo iscritto al corso</p>
                <p className="text-sm text-gray-600">
                  Mario Rossi si è iscritto a &quot;Introduzione a JavaScript&quot;
                </p>
              </div>
              <span className="text-sm text-gray-500">2 min fa</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">Corso completato</p>
                <p className="text-sm text-gray-600">
                  Laura Bianchi ha completato &quot;React Avanzato&quot;
                </p>
              </div>
              <span className="text-sm text-gray-500">15 min fa</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Nuovo abbonamento</p>
                <p className="text-sm text-gray-600">
                  Giuseppe Verdi ha sottoscritto il piano Pro
                </p>
              </div>
              <span className="text-sm text-gray-500">1 ora fa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
