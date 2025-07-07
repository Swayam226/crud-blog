import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

    return (
        <div className="min-h-screen flex flex-col bg-[#FAF3E0] font-serif text-[#333333]">
            <Header />

            <main className="flex-grow max-w-3xl mx-auto py-10 px-6">
                {loading ? (
                    <p className="text-center text-[#5F5F5F]">Loading...</p>
                ) : !post ? (
                    <p className="text-center text-red-600">Post not found.</p>
                ) : (
                    <>
                        <Head>
                            <title>{post.title} | The Journal</title>
                            <meta name="description" content={post.title} />
                        </Head>

                        <h1 className="text-4xl font-bold mb-4 text-[#333333]">{post.title}</h1>
                        <p className="text-sm text-[#5F5F5F] mb-8">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>

                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
