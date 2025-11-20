import { http, HttpResponse } from 'msw';
import mockData from '../mock-data.json';

export const handlers = [
  // GET /api/courses - with optional search query
  http.get('/api/courses', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    
    let courses = mockData.courses;
    
    if (search) {
      courses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(search) ||
          course.description.toLowerCase().includes(search) ||
          course.category.toLowerCase().includes(search)
      );
    }
    
    return HttpResponse.json({ courses });
  }),

  // GET /api/courses/:id
  http.get('/api/courses/:id', ({ params }) => {
    const { id } = params;
    const course = mockData.courses.find((c) => c.id === id);
    
    if (!course) {
      return HttpResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({ course });
  }),

  // GET /api/lessons/:id
  http.get('/api/lessons/:id', ({ params }) => {
    const { id } = params;
    const lesson = mockData.lessons.find((l) => l.id === id);
    
    if (!lesson) {
      return HttpResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({ lesson });
  }),

  // POST /api/auth/login
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { email: string; password: string };
    const { email } = body;
    
    const user = mockData.users.find((u) => u.email === email);
    
    if (!user) {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Generate fake JWT token
    const token = `fake-jwt-token-${Date.now()}`;
    
    return HttpResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  }),

  // POST /api/auth/signup
  http.post('/api/auth/signup', async ({ request }) => {
    const body = await request.json() as { email: string; password: string; name: string };
    
    // Generate fake JWT token
    const token = `fake-jwt-token-${Date.now()}`;
    
    return HttpResponse.json({
      token,
      user: {
        id: String(mockData.users.length + 1),
        email: body.email,
        name: body.name,
        avatar: '/assets/avatar-default.jpg',
      },
    });
  }),

  // POST /api/enroll
  http.post('/api/enroll', async ({ request }) => {
    const body = await request.json() as { courseId: string; userId: string };
    const { courseId } = body;
    
    const course = mockData.courses.find((c) => c.id === courseId);
    
    if (!course) {
      return HttpResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({
      success: true,
      message: `Successfully enrolled in ${course.title}`,
      enrollmentId: `enroll-${Date.now()}`,
    });
  }),

  // GET /api/analytics
  http.get('/api/analytics', () => {
    return HttpResponse.json(mockData.analytics);
  }),

  // GET /api/faqs
  http.get('/api/faqs', () => {
    return HttpResponse.json({ faqs: mockData.faqs });
  }),

  // GET /api/blogs
  http.get('/api/blogs', () => {
    return HttpResponse.json({ blogs: mockData.blogs });
  }),

  // GET /api/blogs/:slug
  http.get('/api/blogs/:slug', ({ params }) => {
    const { slug } = params;
    const blog = mockData.blogs.find((b) => b.slug === slug);
    
    if (!blog) {
      return HttpResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({ blog });
  }),
];
