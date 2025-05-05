const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://my-ui-frontend.onrender.com'
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // ← これが重要！

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

module.exports = app;
