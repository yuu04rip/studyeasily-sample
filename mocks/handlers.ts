import { http, HttpResponse } from 'msw';
import mockData from '../mock-data.json';
import { User, Course, Enrollment, UserRole } from '@/types';

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

interface CourseMaterial {
  id: string;
  courseId: string;
  title: string;
  type: 'video' | 'document' | 'link' | 'image';
  url: string;
  description?: string;
}

interface CourseTest {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: any[];
  timeLimit?: number;
  passingScore?: number;
}

// In-memory stores for mutable data
let eventsStore: CalendarEvent[] = [...(mockData.events as CalendarEvent[])];
const messagesStore: Record<string, ChatMessage[]> = { ...mockData.messages } as Record<string, ChatMessage[]>;
let coursesStore: Course[] = [...(mockData.courses as Course[])];
let usersStore: User[] = [...(mockData.users as User[])];
let enrollmentsStore: Enrollment[] = [...(mockData.enrollments as Enrollment[])];
let materialsStore: CourseMaterial[] = [];
let testsStore: CourseTest[] = [];

// Helper function to get user from token
function getUserFromToken(authHeader: string | null): User | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  // In a real app, decode JWT. For mock, extract user from localStorage
  // This is a simplified mock - in practice, token would be validated
  return null; // Will rely on passed userId in requests for mock
}

// Helper to check permissions
function hasPermission(role: UserRole, action: string): boolean {
  const permissions: Record<UserRole, string[]> = {
    admin: ['create_course', 'edit_course', 'delete_course', 'manage_users', 'approve_courses', 'view_all'],
    instructor: ['create_course', 'edit_own_course', 'delete_own_course', 'view_own_analytics'],
    tutor: ['enroll_course', 'view_content'],
    student: ['enroll_course', 'view_content'],
  };
  
  return permissions[role]?.includes(action) || false;
}

export const handlers = [
  // GET /api/courses - with optional search query and role-based filtering
  http.get('/api/courses', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const status = url.searchParams.get('status'); // For filtering by status
    const instructorId = url.searchParams.get('instructorId'); // For instructor's own courses
    
    let courses = coursesStore;
    
    // Filter by instructor (for instructor dashboard)
    if (instructorId) {
      courses = courses.filter((course) => course.instructorId === instructorId);
    }
    
    // Filter by status
    if (status) {
      courses = courses.filter((course) => course.status === status);
    }
    
    // Search filter
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
    const course = coursesStore.find((c) => c.id === id);
    
    if (!course) {
      return HttpResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({ course });
  }),

  // POST /api/courses - Create a new course (instructor/admin only)
  http.post('/api/courses', async ({ request }) => {
    const body = await request.json() as {
      title: string;
      description: string;
      instructorId: string;
      duration: string;
      level: string;
      price: number;
      category: string;
      role: UserRole;
    };
    
    // Permission check
    if (body.role !== 'instructor' && body.role !== 'admin') {
      return HttpResponse.json(
        { error: 'Unauthorized. Only instructors and admins can create courses.' },
        { status: 403 }
      );
    }
    
    const instructor = usersStore.find((u) => u.id === body.instructorId);
    if (!instructor) {
      return HttpResponse.json(
        { error: 'Instructor not found' },
        { status: 404 }
      );
    }
    
    const newCourse: Course = {
      id: `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: body.title,
      description: body.description,
      instructor: instructor.name,
      instructorId: body.instructorId,
      duration: body.duration,
      level: body.level,
      price: body.price,
      image: '/assets/course-default.jpg',
      category: body.category,
      enrolled: 0,
      rating: 0,
      status: 'draft',
      curriculum: [],
    };
    
    coursesStore.push(newCourse);
    
    return HttpResponse.json({ course: newCourse }, { status: 201 });
  }),

  // PUT /api/courses/:id - Update a course (instructor/admin only)
  http.put('/api/courses/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as Partial<Course> & { userId: string; role: UserRole };
    
    const courseIndex = coursesStore.findIndex((c) => c.id === id);
    
    if (courseIndex === -1) {
      return HttpResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    const course = coursesStore[courseIndex];
    
    // Permission check: admin can edit any course, instructor can only edit their own
    if (body.role !== 'admin' && course.instructorId !== body.userId) {
      return HttpResponse.json(
        { error: 'Unauthorized. You can only edit your own courses.' },
        { status: 403 }
      );
    }
    
    coursesStore[courseIndex] = {
      ...course,
      ...body,
      id: course.id, // Preserve ID
      instructorId: course.instructorId, // Preserve instructor
    };
    
    return HttpResponse.json({ course: coursesStore[courseIndex] });
  }),

  // DELETE /api/courses/:id - Delete a course (instructor/admin only)
  http.delete('/api/courses/:id', async ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const role = url.searchParams.get('role') as UserRole;
    
    const course = coursesStore.find((c) => c.id === id);
    
    if (!course) {
      return HttpResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Permission check
    if (role !== 'admin' && course.instructorId !== userId) {
      return HttpResponse.json(
        { error: 'Unauthorized. You can only delete your own courses.' },
        { status: 403 }
      );
    }
    
    coursesStore = coursesStore.filter((c) => c.id !== id);
    
    return HttpResponse.json({ success: true });
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
    const { email, password } = body;
    
    const user = usersStore.find((u) => u.email === email);
    
    if (!user) {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check password for admin user
    if (user.email === 'admin@studyeasily.com' && password !== 'admin') {
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
        role: user.role,
      },
    });
  }),

  // POST /api/auth/signup
  http.post('/api/auth/signup', async ({ request }) => {
    const body = await request.json() as { 
      email: string; 
      password: string; 
      name: string;
      firstName?: string;
      lastName?: string;
      role?: UserRole;
      avatar?: string;
      onlineStatus?: 'online' | 'offline' | 'do-not-disturb';
    };
    
    // Default role is student if not specified
    const role = body.role || 'student';
    
    // Check if user already exists
    const existingUser = usersStore.find((u) => u.email === body.email);
    if (existingUser) {
      return HttpResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: body.email,
      name: body.name,
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      avatar: body.avatar || '/assets/avatar-default.jpg',
      role: role,
      onlineStatus: body.onlineStatus || 'online',
      birthDate: '',
      description: '',
      enrolledCourses: [],
      createdAt: new Date().toISOString(),
    };
    
    usersStore.push(newUser);
    
    // Generate fake JWT token
    const token = `fake-jwt-token-${Date.now()}`;
    
    return HttpResponse.json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        avatar: newUser.avatar,
        role: newUser.role,
        onlineStatus: newUser.onlineStatus,
        birthDate: newUser.birthDate,
        description: newUser.description,
      },
    });
  }),

  // POST /api/enroll - Enroll in a course (student/tutor only)
  http.post('/api/enroll', async ({ request }) => {
    const body = await request.json() as { 
      courseId: string; 
      userId: string;
      role: UserRole;
    };
    const { courseId, userId, role } = body;
    
    // Permission check: only students and tutors can enroll
    // Admins have viewing access but typically don't enroll as students
    if (role !== 'student' && role !== 'tutor') {
      return HttpResponse.json(
        { error: 'Only students and tutors can enroll in courses' },
        { status: 403 }
      );
    }
    
    const course = coursesStore.find((c) => c.id === courseId);
    
    if (!course) {
      return HttpResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Check if already enrolled
    const existingEnrollment = enrollmentsStore.find(
      (e) => e.userId === userId && e.courseId === courseId
    );
    
    if (existingEnrollment) {
      return HttpResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }
    
    const newEnrollment: Enrollment = {
      id: `enroll_${Date.now()}`,
      userId,
      courseId,
      progress: 0,
      enrolledAt: new Date().toISOString(),
      completedLessons: [],
    };
    
    enrollmentsStore.push(newEnrollment);
    
    // Update course enrolled count
    const courseIndex = coursesStore.findIndex((c) => c.id === courseId);
    if (courseIndex !== -1) {
      coursesStore[courseIndex].enrolled += 1;
    }
    
    return HttpResponse.json({
      success: true,
      message: `Successfully enrolled in ${course.title}`,
      enrollmentId: newEnrollment.id,
    });
  }),

  // GET /api/enrollments - Get user's enrollments
  http.get('/api/enrollments', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const courseId = url.searchParams.get('courseId');
    
    let enrollments = enrollmentsStore;
    
    if (userId) {
      enrollments = enrollments.filter((e) => e.userId === userId);
    }
    
    if (courseId) {
      enrollments = enrollments.filter((e) => e.courseId === courseId);
    }
    
    return HttpResponse.json({ enrollments });
  }),

  // GET /api/courses/:courseId/students - Get enrolled students (instructor/admin only)
  http.get('/api/courses/:courseId/students', ({ params, request }) => {
    const { courseId } = params;
    const url = new URL(request.url);
    const role = url.searchParams.get('role') as UserRole;
    const userId = url.searchParams.get('userId');
    
    const course = coursesStore.find((c) => c.id === courseId);
    
    if (!course) {
      return HttpResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Permission check
    if (role !== 'admin' && course.instructorId !== userId) {
      return HttpResponse.json(
        { error: 'Unauthorized. You can only view students in your own courses.' },
        { status: 403 }
      );
    }
    
    const courseEnrollments = enrollmentsStore.filter((e) => e.courseId === courseId);
    const students = courseEnrollments.map((enrollment) => {
      const student = usersStore.find((u) => u.id === enrollment.userId);
      return {
        ...student,
        enrollment,
      };
    });
    
    return HttpResponse.json({ students });
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

  // GET /api/chats - List chats for a user based on their enrolled courses
  http.get('/api/chats', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return HttpResponse.json({ chats: [] });
    }
    
    // Get user's enrollments to find course-based contacts
    const userEnrollments = enrollmentsStore.filter(e => e.userId === userId);
    const userCourses = userEnrollments.map(e => e.courseId);
    
    // Find other students in the same courses
    const coursemates = enrollmentsStore
      .filter(e => userCourses.includes(e.courseId) && e.userId !== userId)
      .map(e => usersStore.find(u => u.id === e.userId))
      .filter((u, i, arr) => u && arr.findIndex(user => user?.id === u.id) === i); // unique
    
    // Convert to chat format
    const chats = coursemates.map(user => ({
      id: `chat_${userId}_${user!.id}`,
      name: user!.name,
      type: 'one-to-one' as const,
      avatar: user!.avatar,
      participants: [userId, user!.id],
      lastMessage: '',
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
    }));
    
    return HttpResponse.json({ chats });
  }),

  // POST /api/chats - Create a new chat
  http.post('/api/chats', async ({ request }) => {
    const body = await request.json() as {
      type: 'one-to-one' | 'group';
      participants: string[];
      name?: string;
      groupId?: string;
    };
    
    const newChat = {
      id: `chat_${Date.now()}`,
      type: body.type,
      name: body.name || '',
      participants: body.participants,
      groupId: body.groupId,
      createdAt: new Date().toISOString(),
    };
    
    return HttpResponse.json({ chat: newChat }, { status: 201 });
  }),

  // GET /api/groups - List groups for courses
  http.get('/api/groups', ({ request }) => {
    const url = new URL(request.url);
    const courseId = url.searchParams.get('courseId');
    const userId = url.searchParams.get('userId');
    
    // This would filter groups by course or user
    // For now, return empty array as groups need to be created
    return HttpResponse.json({ groups: [] });
  }),

  // POST /api/groups - Create a new group (admin/instructor only)
  http.post('/api/groups', async ({ request }) => {
    const body = await request.json() as {
      name: string;
      courseId: string;
      createdBy: string;
      description?: string;
      role: UserRole;
    };
    
    // Check permission
    if (body.role !== 'admin' && body.role !== 'instructor') {
      return HttpResponse.json(
        { error: 'Only admins and instructors can create groups' },
        { status: 403 }
      );
    }
    
    const newGroup = {
      id: `group_${Date.now()}`,
      name: body.name,
      courseId: body.courseId,
      createdBy: body.createdBy,
      description: body.description || '',
      avatar: null,
      createdAt: new Date().toISOString(),
      members: [body.createdBy],
    };
    
    return HttpResponse.json({ group: newGroup }, { status: 201 });
  }),

  // POST /api/groups/:groupId/members - Add member to group
  http.post('/api/groups/:groupId/members', async ({ params, request }) => {
    const { groupId } = params;
    const body = await request.json() as { userId: string };
    
    return HttpResponse.json({
      success: true,
      message: 'Member added to group',
    }, { status: 201 });
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

  // GET /api/grades - Get grades for a user
  http.get('/api/grades', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return HttpResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const userGrades = (mockData.grades as any[]).filter((g) => g.userId === userId);
    
    return HttpResponse.json({ grades: userGrades });
  }),

  // PUT /api/user/profile - Update user profile
  http.put('/api/user/profile', async ({ request }) => {
    const body = await request.json() as User & { password?: string };
    
    const userIndex = usersStore.findIndex((u) => u.id === body.id);
    
    if (userIndex === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update user data
    const updatedUser: User = {
      ...usersStore[userIndex],
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      birthDate: body.birthDate,
      description: body.description,
      onlineStatus: body.onlineStatus,
      avatar: body.avatar,
      name: body.name,
    };
    
    usersStore[userIndex] = updatedUser;
    
    // In a real app, password would be hashed and stored separately
    // For mock purposes, we just acknowledge the password change
    
    return HttpResponse.json({ user: updatedUser });
  }),

  // DELETE /api/user/delete - Delete user account
  http.delete('/api/user/delete', async ({ request }) => {
    const body = await request.json() as { userId: string };
    
    const userIndex = usersStore.findIndex((u) => u.id === body.userId);
    
    if (userIndex === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Remove user from store
    usersStore = usersStore.filter((u) => u.id !== body.userId);
    
    // Also remove their enrollments
    enrollmentsStore = enrollmentsStore.filter((e) => e.userId !== body.userId);
    
    return HttpResponse.json({ success: true, message: 'Account deleted successfully' });
  }),

  // GET /api/courses/:courseId/materials - Get course materials
  http.get('/api/courses/:courseId/materials', ({ params }) => {
    const { courseId } = params;
    const materials = materialsStore.filter(m => m.courseId === courseId);
    return HttpResponse.json({ materials });
  }),

  // POST /api/courses/:courseId/materials - Add course material
  http.post('/api/courses/:courseId/materials', async ({ params, request }) => {
    const { courseId } = params;
    const body = await request.json() as Omit<CourseMaterial, 'courseId'>;
    
    const material: CourseMaterial = {
      ...body,
      courseId: courseId as string,
    };
    
    materialsStore.push(material);
    return HttpResponse.json({ material }, { status: 201 });
  }),

  // DELETE /api/courses/:courseId/materials/:materialId - Delete course material
  http.delete('/api/courses/:courseId/materials/:materialId', ({ params }) => {
    const { materialId } = params;
    materialsStore = materialsStore.filter(m => m.id !== materialId);
    return HttpResponse.json({ success: true });
  }),

  // GET /api/courses/:courseId/tests - Get course tests
  http.get('/api/courses/:courseId/tests', ({ params }) => {
    const { courseId } = params;
    const tests = testsStore.filter(t => t.courseId === courseId);
    return HttpResponse.json({ tests });
  }),

  // POST /api/courses/:courseId/tests - Create course test
  http.post('/api/courses/:courseId/tests', async ({ params, request }) => {
    const { courseId } = params;
    const body = await request.json() as Omit<CourseTest, 'courseId'>;
    
    const test: CourseTest = {
      ...body,
      courseId: courseId as string,
    };
    
    testsStore.push(test);
    return HttpResponse.json({ test }, { status: 201 });
  }),

  // DELETE /api/courses/:courseId/tests/:testId - Delete course test
  http.delete('/api/courses/:courseId/tests/:testId', ({ params }) => {
    const { testId } = params;
    testsStore = testsStore.filter(t => t.id !== testId);
    return HttpResponse.json({ success: true });
  }),
];
