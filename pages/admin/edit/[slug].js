import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function EditPost() {
    const router = useRouter();
    const { slug } = router.query;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch existing post data
    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            const res = await fetch(`/api/posts/${slug}`);
            const data = await res.json();
            if (data.success) {
                setTitle(data.post.title);
                setContent(data.post.content);
            } else {
                alert('Post not found');
                router.push('/admin');
            }
        };

        fetchPost();
    }, [slug, router]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert('Title and content are required');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/posts/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });

            const data = await res.json();

            if (data.success) {
                alert('Post updated successfully!');
                router.push('/admin');
            } else {
                alert(data.message || 'Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Blog Post 📝</h1>

            <form onSubmit={handleUpdate} className="space-y-4">
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
                    placeholder="Update post content here..."
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    );
}
