import CourseCard from '@/components/CourseCard';
import mockData from '@/mocks/mock-data.json';

export default function CorsiPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutti i Corsi</h1>
          <p className="text-lg text-gray-600">
            Esplora la nostra collezione di corsi e inizia il tuo percorso di apprendimento
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Tutti
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition">
            Programmazione
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition">
            Data Science
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition">
            Design
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockData.courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              duration={course.duration}
              level={course.level}
              price={course.price}
              enrolled={course.enrolled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
