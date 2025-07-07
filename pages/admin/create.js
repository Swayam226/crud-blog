import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!title || !content) {
            setMessage('Please fill in both title and content.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/posts/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage('✅ Post published successfully!');
                setTimeout(() => router.push('/admin'), 1500);
            } else {
                setMessage(data.message || 'Failed to create post.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF3E0] font-serif">
            <Header />

            <main className="flex-grow max-w-3xl mx-auto py-10 px-6">
                <h1 className="text-3xl font-bold mb-6 text-[#333333] text-center">Create New Post ✍️</h1>

                {message && (
                    <div className="mb-4 p-3 rounded border border-[#E0D7C6] bg-white text-center text-[#5F5F5F]">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="Write your post content here..."
                    />

                    <button
                        type="submit"
                        className="bg-[#7B3F00] text-white py-2 px-6 rounded hover:bg-[#5c2e00] transition"
                        disabled={loading}
                    >
                        {loading ? 'Publishing...' : 'Publish Post'}
                    </button>
                </form>
            </main>

            <Footer />
        </div>
    );
}
