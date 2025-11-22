// app/blog/[slug]/page.tsx
// This is now a SERVER component (no 'use client')

import { blogPostsData } from '@/lib/data';
import { notFound } from 'next/navigation';
import BlogClientPage from './BlogClientPage'; // Import our new client component

// This is the main page component. It can handle server-side logic.
export default function SinglePostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // This logic runs on the server
  const post = blogPostsData.find((p) => p.slug === slug);

  // If the post is not found on the server, show a 404
  if (!post) {
    notFound();
  }

  // If the post IS found, render the CLIENT component and pass the post data down to it
  return <BlogClientPage post={post} />;
}