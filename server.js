require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Project = require('./models/Project'); // ✅ Import model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.get('/api/projects', async(req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error("Error fetching projects:", err.message);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

app.post('/api/projects', async(req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        console.error("Error adding project:", err.message);
        res.status(500).json({ error: "Failed to add project" });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("Hello, backend is running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});