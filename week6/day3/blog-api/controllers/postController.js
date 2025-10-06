import * as Post from '../models/postModel.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.getPostById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.createPost(title, content);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.updatePost(req.params.id, title, content);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deletePost = async (req, res) => {
    try {
        await Post.deletePost(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
