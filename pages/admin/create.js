import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert('Title and content are required');
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
                alert('Post created successfully!');
                router.push('/admin');
            } else {
                alert(data.message || 'Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Blog Post ✍️</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Post Title"
                    className="w-full border border-gray-300 p-3 rounded"
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
                    className="bg-blue-600 text-white py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? 'Publishing...' : 'Publish Post'}
                </button>
            </form>
        </div>
    );
}
