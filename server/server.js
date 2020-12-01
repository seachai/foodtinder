require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('./Database/connection');

const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./Routes/userRoutes');

// Connect to MongoDB
mongoose.connection.once('open', (err) => {
  if (err) throw new Error(err);
});

/**
 * Middlewares
 */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'dist')));

/**
 * Routers
 */
app.use('/api/', userRoutes);

/**
 * Send all routes to index.html
 */
app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'client', 'index.html'));
  // res.status(200).redirect('/');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  res.status(500).json({ err: err.message.toString() });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
