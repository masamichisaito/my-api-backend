const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/users');
const { User } = require('./models'); // Userモデルのインポート

app.use(express.json());
app.use('/users', userRoutes);

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
