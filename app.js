const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = {
  development: 'http://localhost:5173',
  production: 'https://your-app.onrender.com',
  test: 'http://localhost:4173',
};

const currentEnv = process.env.NODE_ENV || 'development';

app.use(cors({
  origin: allowedOrigins[currentEnv],
  credentials: true
}));

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

module.exports = app;


