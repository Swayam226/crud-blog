import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const posts = await Post.find().sort({ createdAt: -1 }); // Latest first
            return res.status(200).json({ success: true, posts });
        } catch (error) {
            console.error('Error fetching posts:', error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
