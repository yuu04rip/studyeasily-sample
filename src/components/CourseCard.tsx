import Link from 'next/link';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  enrolled: number;
}

export default function CourseCard({
  id,
  title,
  description,
  instructor,
  duration,
  level,
  price,
  enrolled,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
          {title.charAt(0)}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            {level}
          </span>
          <span className="text-sm text-gray-500">{duration}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-sm text-gray-700">{instructor}</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-gray-900">€{price}</span>
            <p className="text-xs text-gray-500">{enrolled} iscritti</p>
          </div>
          <Link
            href={`/corsi/${id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Dettagli
          </Link>
        </div>
      </div>
    </div>
  );
}
