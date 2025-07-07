import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/posts');
            const data = await res.json();
            if (data.success) setPosts(data.posts);
        };
        fetchPosts();
    }, []);

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
            setPosts(posts.filter((post) => post.slug !== slug));
            alert('Post deleted successfully');
        } else {
            alert('Failed to delete post');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF3E0] font-serif">
            <Header />

            <main className="flex-grow max-w-4xl mx-auto py-10 px-6">
                <h1 className="text-4xl font-bold text-center mb-8 text-[#333333]">Admin Dashboard 🛠️</h1>

                <div className="text-center mb-10">
                    <Link href="/admin/create" className="bg-[#7B3F00] text-white py-2 px-6 rounded border border-[#7B3F00] hover:bg-[#5c2e00] transition">
                        ➕ Create New Post
                    </Link>
                </div>

                <div className="space-y-4">
                    {posts.length === 0 ? (
                        <p className="text-gray-600 text-center italic">No posts yet.</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="border border-[#E0D7C6] bg-white p-4 rounded shadow-sm">
                                <h2 className="text-xl font-bold text-[#333333]">{post.title}</h2>
                                <p className="text-sm text-[#5F5F5F] mb-3">{new Date(post.createdAt).toLocaleDateString()}</p>

                                <div className="flex gap-6 items-center">
                                    <Link href={`/admin/edit/${post.slug}`} className="group relative">
                                        <Pencil className="text-[#7B3F00] hover:text-[#5c2e00]" />
                                        <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 text-xs opacity-0 group-hover:opacity-100 text-[#5F5F5F]">
                                            Edit
                                        </span>
                                    </Link>

                                    <button onClick={() => handleDelete(post.slug)} className="group relative">
                                        <Trash2 className="text-red-600 hover:text-red-800" />
                                        <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 text-xs opacity-0 group-hover:opacity-100 text-[#5F5F5F]">
                                            Delete
                                        </span>
                                    </button>

                                    <Link href={`/blog/${post.slug}`} className="group relative">
                                        <Eye className="text-[#7B3F00] hover:text-[#5c2e00]" />
                                        <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 text-xs opacity-0 group-hover:opacity-100 text-[#5F5F5F]">
                                            View
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
