'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  image: string;
  category: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data.blogs);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600">
          Insights, tips, and stories from the world of online learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`}>
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-gradientStart to-gradientEnd flex items-center justify-center">
                <span className="text-white text-6xl font-bold opacity-20">
                  {blog.category.charAt(0)}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="text-primary font-medium">{blog.category}</span>
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>By {blog.author}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
