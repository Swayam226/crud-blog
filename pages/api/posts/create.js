import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { title, content } = req.body;

    // Basic validation
    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'Title and Content are required' });
    }

    try {
        // Generate SEO-friendly slug
        const slug = slugify(title, { lower: true, strict: true });

        // Create new post document
        const newPost = new Post({
            title,
            content,
            slug,
        });

        // Save to database
        await newPost.save();

        return res.status(201).json({ success: true, post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}
