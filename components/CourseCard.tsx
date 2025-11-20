
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
      <div className="group cursor-pointer transform transition hover:scale-105">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-accent/30">
          <div className="aspect-square bg-gradient-to-br from-accent to-primary relative">
            <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-30">
              {course.category.charAt(0)}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/90 to-transparent flex items-end p-6">
            <h3 className="text-xl font-bold text-white line-clamp-2">{course.title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
