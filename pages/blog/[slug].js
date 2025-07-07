import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function BlogPost() {
    const router = useRouter();
    const { slug } = router.query;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${slug}`);
                const data = await res.json();
                if (data.success) {
                    setPost(data.post);
                } else {
                    setPost(null);
                }
            } catch (error) {
                console.error('Failed to fetch post:', error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (!post) return <div className="p-6 text-center text-red-600">Post not found</div>;

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.title} />
            </Head>

            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-sm text-gray-500 mb-6">{new Date(post.createdAt).toLocaleString()}</p>
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </>
    );
}
