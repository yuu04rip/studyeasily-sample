
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  image: string;
  category: string;
  enrolled: number;
  rating: number;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/corsi/${course.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer">
        <div className="relative h-48 bg-gradient-to-br from-gradientStart to-gradientEnd">
          <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
            {course.category.charAt(0)}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
              {course.level}
            </span>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>{course.instructor}</span>
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${course.price}</span>
            <span className="text-sm text-gray-500">{course.enrolled.toLocaleString()} students</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
