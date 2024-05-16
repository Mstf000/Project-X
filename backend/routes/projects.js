const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all projects for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new project
router.post('/', auth, async (req, res) => {
    const { title, description, code } = req.body;

    try {
        const newProject = new Project({
            userId: req.user.id,
            title,
            description,
            code,
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a project
router.put('/:id', auth, async (req, res) => {
    const { title, description, code, completed } = req.body;

    try {
        let project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ msg: 'Project not found' });

        if (project.userId.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        project.title = title || project.title;
        project.description = description || project.description;
        project.code = code || project.code;
        project.completed = completed !== undefined ? completed : project.completed;

        project = await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a project
router.delete('/:id', auth, async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ msg: 'Project not found' });

        if (project.userId.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        await Project.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
