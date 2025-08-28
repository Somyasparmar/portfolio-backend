const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a Project model
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const Project = mongoose.model('Project', ProjectSchema);

// Add a project
app.post('/api/projects', async(req, res) => {
    try {
        const { title, description } = req.body;
        const project = new Project({ title, description });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add project' });
    }
});

// Get all projects
app.get('/api/projects', async(req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Define a Blog model
const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', BlogSchema);

// Add a blog
app.post('/api/blogs', async(req, res) => {
    try {
        const { title, content } = req.body;
        const blog = new Blog({ title, content });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add blog' });
    }
});

// Get all blogs
app.get('/api/blogs', async(req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));