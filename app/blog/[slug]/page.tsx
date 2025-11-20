'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string;
  category: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`/api/blogs/${params.slug}`);
      const data = await response.json();
      setBlog(data.blog);
      setLoading(false);
    };

    fetchBlog();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog post not found</h1>
        <Link href="/blog" className="text-primary hover:underline">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-primary hover:underline inline-flex items-center mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <div className="mb-6">
          <span className="text-primary font-semibold">{blog.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{blog.title}</h1>
          <div className="flex items-center text-gray-600">
            <span>By {blog.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        <div className="h-96 bg-gradient-to-br from-gradientStart to-gradientEnd rounded-lg mb-8 flex items-center justify-center">
          <span className="text-white text-9xl font-bold opacity-20">
            {blog.category.charAt(0)}
          </span>
        </div>

        <div className="prose max-w-none">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">{blog.excerpt}</p>
          <div className="text-gray-700 leading-relaxed space-y-4">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">About the Author</h3>
            <p className="text-gray-600">
              {blog.author} is a contributor to the StudyEasily blog, sharing insights and expertise
              on education and learning.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
