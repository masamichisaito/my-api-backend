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

// 全ルートに対してCORS適用
app.use(cors(corsOptions));
app.use(express.json());

// 明示的に OPTIONS に対応させる（この書き方が安全）
app.options('/users', cors(corsOptions));

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

module.exports = app;
