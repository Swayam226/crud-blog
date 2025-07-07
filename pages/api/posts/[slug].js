import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';

export default async function handler(req, res) {
    await dbConnect();

    const { slug } = req.query;

    if (req.method === 'GET') {
        try {
            const post = await Post.findOne({ slug });
            if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

            return res.status(200).json({ success: true, post });
        } catch (error) {
            console.error('Error fetching post:', error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    }

    else if (req.method === 'PUT') {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'Title and Content are required' });
        }

        try {
            const newSlug = slugify(title, { lower: true, strict: true });

            const updatedPost = await Post.findOneAndUpdate(
                { slug },
                { title, content, slug: newSlug },
                { new: true }
            );

            if (!updatedPost) {
                return res.status(404).json({ success: false, message: 'Post not found' });
            }

            return res.status(200).json({ success: true, post: updatedPost });
        } catch (error) {
            console.error('Error updating post:', error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    }

    else if (req.method === 'DELETE') {
        try {
            const deletedPost = await Post.findOneAndDelete({ slug });

            if (!deletedPost) {
                return res.status(404).json({ success: false, message: 'Post not found' });
            }

            return res.status(200).json({ success: true, message: 'Post deleted successfully' });
        } catch (error) {
            console.error('Error deleting post:', error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    }

    else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
