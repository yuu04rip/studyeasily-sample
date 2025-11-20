import Link from 'next/link';
import LessonPlayer from '@/components/LessonPlayer';
import mockData from '@/mocks/mock-data.json';

export default function LezioneDetailPage({
  params,
}: {
  params: { id: string; lid: string };
}) {
  const lesson = mockData.lessons.find((l) => l.id === params.lid);
  const course = mockData.courses.find((c) => c.id === params.id);
  const courseLessons = mockData.lessons.filter((l) => l.courseId === params.id);

  if (!lesson || !course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Lezione non trovata</h1>
        <Link href="/corsi" className="text-blue-600 hover:underline">
          Torna ai corsi
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/corsi" className="hover:text-blue-600">
            Corsi
          </Link>
          <span>/</span>
          <Link href={`/corsi/${params.id}`} className="hover:text-blue-600">
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{lesson.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <LessonPlayer
              title={lesson.title}
              description={lesson.description}
              videoUrl={lesson.videoUrl}
              duration={lesson.duration}
            />

            {/* Lesson Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Informazioni sulla Lezione
              </h2>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              <div className="flex items-center gap-4 pt-4 border-t">
                <span className="text-sm text-gray-600">Durata: {lesson.duration}</span>
                <span className="text-sm text-gray-600">Lezione {lesson.order}</span>
              </div>
            </div>
          </div>

          {/* Sidebar - Course Lessons */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Contenuto del Corso
              </h3>
              <div className="space-y-2">
                {courseLessons.map((l) => (
                  <Link
                    key={l.id}
                    href={`/corsi/${params.id}/lezione/${l.id}`}
                    className={`block p-3 rounded-lg transition ${
                      l.id === params.lid
                        ? 'bg-blue-100 border-2 border-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          l.id === params.lid
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {l.order}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{l.title}</p>
                        <p className="text-xs text-gray-500">{l.duration}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
