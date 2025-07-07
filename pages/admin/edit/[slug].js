import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function EditPost() {
    const router = useRouter();
    const { slug } = router.query;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${slug}`);
                const data = await res.json();
                if (data.success) {
                    setTitle(data.post.title);
                    setContent(data.post.content);
                } else {
                    setMessage('⚠️ Post not found.');
                    setTimeout(() => router.push('/admin'), 1500);
                }
            } catch (error) {
                console.error('Error loading post:', error);
                setMessage('⚠️ Failed to load post.');
                setTimeout(() => router.push('/admin'), 1500);
            }
        };

        fetchPost();
    }, [slug, router]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!title || !content) {
            setMessage('Please fill in both title and content.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/posts/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET}`,
                },
                body: JSON.stringify({ title, content }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage('✅ Post updated successfully!');
                setTimeout(() => router.push('/admin'), 1500);
            } else {
                setMessage(data.message || 'Failed to update post.');
            }
        } catch (error) {
            console.error('Error updating post:', error);
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF3E0] font-serif">
            <Header />

            <main className="flex-grow max-w-3xl mx-auto py-10 px-6">
                <h1 className="text-3xl font-bold mb-6 text-[#333333] text-center">Edit Blog Post 📝</h1>

                {message && (
                    <div className="mb-4 p-3 rounded border border-[#E0D7C6] bg-white text-center text-[#5F5F5F]">
                        {message}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Post Title"
                        className="w-full border border-[#E0D7C6] p-3 rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#7B3F00]"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="bg-white"
                        placeholder="Update post content here..."
                    />

                    <button
                        type="submit"
                        className="bg-[#7B3F00] text-white py-2 px-6 rounded hover:bg-[#5c2e00] transition"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Post'}
                    </button>
                </form>
            </main>

            <Footer />
        </div>
    );
}
