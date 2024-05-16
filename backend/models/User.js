const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: String, required: true },
    avatar: {
        gender: String,
        hair: String,
        eyes: String,
        face: String,
    },
    currentLevel: { type: Number, default: 1 },
    experiencePoints: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
