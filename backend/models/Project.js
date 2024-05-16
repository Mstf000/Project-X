const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Project', ProjectSchema);
