import Link from 'next/link';
import mockData from '@/mocks/mock-data.json';

export default function CorsoDetailPage({ params }: { params: { id: string } }) {
  const course = mockData.courses.find((c) => c.id === params.id);
  const lessons = mockData.lessons.filter((l) => l.courseId === params.id);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Corso non trovato</h1>
        <Link href="/corsi" className="text-blue-600 hover:underline">
          Torna ai corsi
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Course Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                {course.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl mb-6">{course.description}</p>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full"></div>
                <span>{course.instructor}</span>
              </div>
              <span>⏱️ {course.duration}</span>
              <span>👥 {course.enrolled} studenti</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                Iscriviti ora - €{course.price}
              </button>
              <button className="px-8 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition">
                Anteprima
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contenuto del Corso</h2>
          <div className="bg-white rounded-lg shadow-md divide-y">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/corsi/${params.id}/lezione/${lesson.id}`}
                className="block p-6 hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {lesson.order}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600">{lesson.description}</p>
                    </div>
                  </div>
                  <span className="text-gray-500">{lesson.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
