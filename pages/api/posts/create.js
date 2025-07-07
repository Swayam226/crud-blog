import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';
import sanitizeHtml from 'sanitize-html';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'Title and Content are required' });
    }

    try {
        const slug = slugify(title, { lower: true, strict: true });

        // 🔒 Check for existing post with same slug
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            return res.status(400).json({
                success: false,
                message: 'A post with this title already exists. Please choose a different title.'
            });
        }

        // Sanitizing the rich text content
        const cleanContent = sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ['src', 'alt', 'width', 'height'],
            },
        });

        const newPost = new Post({
            title,
            content: cleanContent,
            slug,
        });

        await newPost.save();

        return res.status(201).json({ success: true, post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}
