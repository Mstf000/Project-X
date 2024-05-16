const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Add this after middleware
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Add this after the authentication routes
const projectRoutes = require('./routes/projects');
app.use('/api/projects', projectRoutes);

// MongoDB Connection
const dbURI = 'mongodb+srv://mstf:mstf123@cluster0.pfzhwqr.mongodb.net/project-x';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
