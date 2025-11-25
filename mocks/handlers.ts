import { http, HttpResponse } from 'msw';
import mockData from '../mock-data.json';

// Type definitions for mock data
interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  description: string;
}

interface ChatMessage {
  id: string;
  chatId: string;
  authorId: string;
  authorName: string;
  text: string;
  createdAt: string;
  status: string;
}

// In-memory stores for mutable data
let eventsStore: CalendarEvent[] = [...(mockData.events as CalendarEvent[])];
const messagesStore: Record<string, ChatMessage[]> = { ...mockData.messages } as Record<string, ChatMessage[]>;

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

  // GET /api/dashboard - Dashboard data
  http.get('/api/dashboard', () => {
    return HttpResponse.json(mockData.dashboard);
  }),

  // GET /api/events - Calendar events
  http.get('/api/events', ({ request }) => {
    const url = new URL(request.url);
    const month = url.searchParams.get('month'); // format: YYYY-MM
    
    let events = eventsStore;
    
    if (month) {
      events = eventsStore.filter((event) => {
        const eventMonth = event.start.substring(0, 7); // YYYY-MM
        return eventMonth === month;
      });
    }
    
    return HttpResponse.json({ events });
  }),

  // POST /api/events - Create event
  http.post('/api/events', async ({ request }) => {
    const body = await request.json() as Omit<CalendarEvent, 'id'>;
    
    const newEvent: CalendarEvent = {
      id: `evt_${Date.now()}`,
      title: body.title,
      start: body.start,
      end: body.end,
      color: body.color || '#9B6BFF',
      description: body.description || '',
    };
    
    eventsStore.push(newEvent);
    
    return HttpResponse.json({ event: newEvent }, { status: 201 });
  }),

  // PUT /api/events/:id - Update event
  http.put('/api/events/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as Partial<CalendarEvent>;
    
    const eventIndex = eventsStore.findIndex((e) => e.id === id);
    
    if (eventIndex === -1) {
      return HttpResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    eventsStore[eventIndex] = {
      ...eventsStore[eventIndex],
      ...body,
    };
    
    return HttpResponse.json({ event: eventsStore[eventIndex] });
  }),

  // DELETE /api/events/:id - Delete event
  http.delete('/api/events/:id', ({ params }) => {
    const { id } = params;
    
    const eventIndex = eventsStore.findIndex((e) => e.id === id);
    
    if (eventIndex === -1) {
      return HttpResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    eventsStore = eventsStore.filter((e) => e.id !== id);
    
    return HttpResponse.json({ success: true });
  }),

  // GET /api/chats - List chats
  http.get('/api/chats', () => {
    return HttpResponse.json({ chats: mockData.chats });
  }),

  // GET /api/chats/:chatId/messages - Get messages for a chat
  http.get('/api/chats/:chatId/messages', ({ params }) => {
    const { chatId } = params;
    const messages = messagesStore[chatId as string] || [];
    
    return HttpResponse.json({ messages });
  }),

  // POST /api/chats/:chatId/messages - Send message
  http.post('/api/chats/:chatId/messages', async ({ params, request }) => {
    const { chatId } = params;
    const body = await request.json() as { text: string; authorId: string; authorName: string };
    
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      chatId: chatId as string,
      authorId: body.authorId,
      authorName: body.authorName,
      text: body.text,
      createdAt: new Date().toISOString(),
      status: 'delivered',
    };
    
    if (!messagesStore[chatId as string]) {
      messagesStore[chatId as string] = [];
    }
    messagesStore[chatId as string].push(newMessage);
    
    return HttpResponse.json({ message: newMessage }, { status: 201 });
  }),
];
