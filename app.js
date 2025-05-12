const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.onrender.com',
  ],
  credentials: true,
};
app.use(cors(corsOptions));

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// テスト用ルート（CI用）
if (process.env.NODE_ENV === 'test') {
  const testRoutes = require('./routes/testRoutes');
  app.use('/test', testRoutes);
}

module.exports = app;
