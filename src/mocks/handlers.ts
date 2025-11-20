import { http, HttpResponse } from 'msw';
import mockData from './mock-data.json';

export const handlers = [
  // Get all courses
  http.get('/api/courses', () => {
    return HttpResponse.json(mockData.courses);
  }),

  // Get single course by ID
  http.get('/api/courses/:id', ({ params }) => {
    const { id } = params;
    const course = mockData.courses.find((c) => c.id === id);
    if (!course) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(course);
  }),

  // Get lessons for a course
  http.get('/api/courses/:id/lessons', ({ params }) => {
    const { id } = params;
    const lessons = mockData.lessons.filter((l) => l.courseId === id);
    return HttpResponse.json(lessons);
  }),

  // Get single lesson
  http.get('/api/lessons/:id', ({ params }) => {
    const { id } = params;
    const lesson = mockData.lessons.find((l) => l.id === id);
    if (!lesson) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(lesson);
  }),

  // Auth - Login
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };
    
    if (email === 'utente@example.com' && password === 'password123') {
      return HttpResponse.json({
        user: mockData.users[0],
        token: 'mock-jwt-token-12345',
      });
    }
    
    return HttpResponse.json(
      { error: 'Credenziali non valide' },
      { status: 401 }
    );
  }),

  // Auth - Signup
  http.post('/api/auth/signup', async ({ request }) => {
    const body = await request.json();
    const { email, name } = body as {
      email: string;
      name: string;
      password: string;
    };
    
    return HttpResponse.json({
      user: {
        id: 'new-user-id',
        email,
        name,
        enrolledCourses: [],
      },
      token: 'mock-jwt-token-67890',
    });
  }),

  // Enroll in course
  http.post('/api/enroll', async ({ request }) => {
    const body = await request.json();
    const { courseId, userId } = body as { courseId: string; userId: string };
    
    return HttpResponse.json({
      success: true,
      message: 'Iscrizione completata con successo',
      enrollment: {
        userId,
        courseId,
        enrolledAt: new Date().toISOString(),
      },
    });
  }),

  // Get analytics data
  http.get('/api/analytics', () => {
    return HttpResponse.json(mockData.analyticsData);
  }),
];
