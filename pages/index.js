import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF3E0] text-[#333333]">
      <Head>
        <title>Blog Haven</title>
        <meta name="description" content="Timeless stories and reflections in a minimalist vintage style." />
      </Head>

      <Header />

      <main className="flex-grow max-w-3xl mx-auto py-16 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 text-[#333333]">Blog Haven</h1>
        <p className="text-lg text-[#5F5F5F] italic mb-12">
          Thoughtful writings, timeless reflections, and stories worth sharing—crafted with words, not noise.
        </p>

        {posts.length === 0 ? (
          <p className="text-[#5F5F5F] italic">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-8 text-left font-inter">
            {posts.map((post) => (
              <div key={post._id}>
                <Link href={`/blog/${post.slug}`} className="text-2xl font-bold hover:underline text-[#333333]">
                  {post.title}
                </Link>
                <p className="text-sm text-[#5F5F5F] mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
