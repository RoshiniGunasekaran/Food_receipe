const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('.server/routes/auth.js'); // Ensure this path is correct

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

console.log('Starting server...');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    console.error('Exiting process...');
    process.exit(1);
  });

// Use routes
app.use('/api', routes); // Assuming your routes are under /api

// Start server
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
