import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/posts');
            const data = await res.json();
            if (data.success) setPosts(data.posts);
        };
        fetchPosts();
    }, []);

    const handleDelete = async (slug) => {
        setMessage('Deleting post...');

        const res = await fetch(`/api/posts/${slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET}`,
            },
        });

        const data = await res.json();
        if (data.success) {
            setPosts(posts.filter((post) => post.slug !== slug));
            setMessage('Post deleted successfully!');
            setTimeout(() => setMessage(''), 2000);
        } else {
            setMessage(data.message || 'Failed to delete post.');
            setTimeout(() => setMessage(''), 2000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF3E0]">
            <Header />

            <main className="flex-grow max-w-4xl mx-auto py-10 px-6">
                <h1 className="text-4xl font-bold text-center mb-8 text-[#333333]">My Dashboard</h1>

                {message && (
                    <div className="mb-6 p-3 rounded border border-[#E0D7C6] bg-white text-center text-[#5F5F5F]">
                        {message}
                    </div>
                )}

                <div className="text-center mb-10 font-inter">
                    <Link href="/admin/create" className="bg-[#7B3F00] text-white py-2 px-6 rounded border border-[#7B3F00] hover:bg-[#5c2e00] transition">
                        ➕ Create New Post
                    </Link>
                </div>

                <div className="space-y-4 font-inter">
                    {posts.length === 0 ? (
                        <p className="text-gray-600 text-center italic">No posts yet.</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="border border-[#E0D7C6] bg-white p-4 rounded shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-[#333333]">{post.title}</h2>

                                    <div className="flex gap-4 items-center">
                                        <Link href={`/admin/edit/${post.slug}`}>
                                            <Pencil className="text-blue-600 hover:text-blue-800 cursor-pointer size-5 ml-4" />
                                        </Link>

                                        <button onClick={() => handleDelete(post.slug)}>
                                            <Trash2 className="text-black hover:text-red-700 cursor-pointer size-5" />
                                        </button>

                                        <Link href={`/blog/${post.slug}`}>
                                            <Eye className="text-green-700 hover:text-green-900 cursor-pointer size-5" />
                                        </Link>
                                    </div>
                                </div>

                                <p className="text-sm text-[#5F5F5F] mt-2">{new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
