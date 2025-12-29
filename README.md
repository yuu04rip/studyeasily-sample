# StudyEasily - Online Learning Platform

A modern online learning platform built with Next.js 14, TypeScript, and TailwindCSS. Features mock API with MSW, authentication, course management, and analytics dashboard.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Mock API**: Powered by Mock Service Worker (MSW)
- **Authentication**: Mock JWT-based authentication with localStorage
- **Course Management**: Browse, search, and enroll in courses
- **Video Lessons**: Integrated react-player for video playback
- **Analytics Dashboard**: Interactive charts with Chart.js
- **Responsive Design**: Mobile-first approach with beautiful UI
- **User Dashboard**: Track progress, courses, and activity

## 📋 Pages

- **Home** (`/`) - Hero section with CTA
- **Courses** (`/corsi`) - Browse and search courses
- **Course Detail** (`/corsi/[id]`) - View curriculum and enroll
- **Lesson Player** (`/corsi/[courseId]/lezione/[lessonId]`) - Watch video lessons
- **Pricing** (`/piani`) - Subscription plans
- **Support Channels** (`/canali`) - Contact options
- **Business** (`/business`) - Enterprise solutions
- **Analytics** (`/data-analytics`) - Platform metrics and charts
- **FAQ** (`/faq`) - Frequently asked questions
- **Blog** (`/blog`) - Articles and insights
- **Blog Post** (`/blog/[slug]`) - Individual blog posts
- **Contact** (`/contatti`) - Contact form
- **Dashboard** (`/dashboard`) - User area with sidebar
- **Login** (`/login`) - Sign in page
- **Signup** (`/signup`) - Registration page

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yuu04rip/studyeasily-sample.git
   cd studyeasily-sample
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yuu04rip/studyeasily-sample)

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

No actual environment variables are required for the mock setup, but you can add them for future integrations.

## 🗄️ Database Setup (Optional)

This project currently uses mock data (`mock-data.json`) with MSW for API simulation. However, if you want to connect to a real database:

1. **See database setup guide**: Check `database/README.md` for detailed instructions
2. **Choose your database**: MySQL or PostgreSQL schemas are provided
3. **Run the schema**: Import `database/schema.sql` (MySQL) or `database/schema-postgresql.sql` (PostgreSQL)
4. **Configure connection**: Update `.env.local` with your database credentials

**Quick Start with Database:**
```bash
# For MySQL
mysql -u root -p < database/schema.sql

# For PostgreSQL  
psql -U postgres -d studyeasily -f database/schema-postgresql.sql
```

For detailed setup instructions, see the [Database Setup Guide](database/README.md).

## 📁 Project Structure

```
studyeasily-sample/
├── app/                    # Next.js app directory
│   ├── corsi/             # Course pages
│   ├── dashboard/         # User dashboard
│   ├── blog/              # Blog pages
│   ├── login/             # Authentication
│   └── ...                # Other pages
├── components/            # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CourseCard.tsx
│   └── ...
├── database/              # Database schemas and docs
│   ├── schema.sql         # MySQL schema
│   ├── schema-postgresql.sql  # PostgreSQL schema
│   ├── README.md          # Database setup guide
│   └── ...
├── mocks/                 # MSW mock API
│   ├── handlers.ts        # API handlers
│   └── browser.ts         # MSW setup
├── public/                # Static assets
│   └── assets/            # Images and media
├── mock-data.json         # Mock database
└── tailwind.config.ts     # Tailwind configuration
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  primary: "#6366f1",      // Indigo-500
  accent: "#8b5cf6",       // Violet-500
  gradientStart: "#6366f1",
  gradientEnd: "#8b5cf6",
}
```

### Mock Data

Edit `mock-data.json` to modify courses, lessons, users, FAQs, and blogs.

### MSW Handlers

Add or modify API endpoints in `mocks/handlers.ts`.

## 🧪 Demo Authentication

Use the following credentials to test login:

- **Email**: `demo@studyeasily.com`
- **Password**: Any password (mock authentication)

## 📦 Key Dependencies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **MSW** - Mock Service Worker
- **Chart.js** - Data visualization
- **react-chartjs-2** - React wrapper for Chart.js
- **react-player** - Video player component

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@studyeasily.com or visit our [FAQ page](/faq).

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI styled with [TailwindCSS](https://tailwindcss.com/)
- Mock API powered by [MSW](https://mswjs.io/)
- Charts powered by [Chart.js](https://www.chartjs.org/)

---

Made with ❤️ by the StudyEasily Team
