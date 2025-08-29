const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// GET all blogs
router.get('/', async(req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// GET blog by ID
router.get('/:id', async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

// POST a new blog
router.post('/', async(req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create blog' });
    }
});

// PUT update blog by ID
router.put('/:id', async(req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update blog' });
    }
});

// DELETE blog by ID
router.delete('/:id', async(req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

module.exports = router;