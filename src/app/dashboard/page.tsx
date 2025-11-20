import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import mockData from '@/mocks/mock-data.json';

export default function DashboardPage() {
  const user = mockData.users[0];
  const enrolledCourses = mockData.courses.filter((course) =>
    user.enrolledCourses.includes(course.id)
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Benvenuto, {user.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Continua il tuo percorso di apprendimento
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Corsi Iscritti</p>
                <p className="text-3xl font-bold text-gray-900">
                  {enrolledCourses.length}
                </p>
              </div>
              <div className="text-4xl">📚</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ore di Studio</p>
                <p className="text-3xl font-bold text-gray-900">15</p>
              </div>
              <div className="text-4xl">⏱️</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Certificati</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">I Miei Corsi</h2>
            <Link
              href="/corsi"
              className="text-blue-600 hover:underline font-medium"
            >
              Esplora altri corsi →
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                    {course.title.charAt(0)}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.instructor}
                    </p>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progresso</span>
                        <span className="font-semibold text-gray-900">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: '45%' }}
                        ></div>
                      </div>
                    </div>
                    <Link
                      href={`/corsi/${course.id}`}
                      className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Continua
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Non sei ancora iscritto a nessun corso
              </h3>
              <p className="text-gray-600 mb-6">
                Inizia oggi il tuo percorso di apprendimento
              </p>
              <Link
                href="/corsi"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Esplora i Corsi
              </Link>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Consigliati per te
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockData.courses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-32 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-5xl font-bold">
                  {course.title.charAt(0)}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
                  <Link
                    href={`/corsi/${course.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Scopri di più →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
