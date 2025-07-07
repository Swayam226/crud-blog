import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Blog It!!</title>
        <meta name="description" content="A vintage-inspired blog of thoughts, stories, and reflections." />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#FAF3E0]">
        <h1 className="text-5xl mb-4 font-bold text-[#333333]">Blog Haven</h1>
        <p className="text-lg text-[#5F5F5F] max-w-2xl mb-8 italic">
          Thoughtful writings, timeless reflections, and stories worth sharing—crafted with words, not noise.
        </p>

        <div className="flex gap-4 mb-10">
          <Link href="/admin" className="border border-[#7B3F00] text-[#7B3F00] py-2 px-6 rounded hover:bg-[#efe7db] transition">
            Admin Access
          </Link>
        </div>

        <div className="max-w-3xl w-full text-left">
          <h2 className="text-2xl font-semibold mb-4 text-[#7B3F00]">Latest Posts</h2>

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post._id} className="border p-4 rounded bg-white shadow-sm">
                  <Link href={`/blog/${post.slug}`} className="text-xl font-bold text-[#333333] hover:underline">
                    {post.title}
                  </Link>
                  <p className="text-sm text-[#5F5F5F] mt-1">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
