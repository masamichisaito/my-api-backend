const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({
  origin: [
    'http://localhost:5173',                     // ローカル開発用
    'https://my-ui-frontend.onrender.com'        // 本番Renderフロントエンド
  ],
  credentials: true
}));
app.use(express.json());

// /users のルートはこれ1つだけで十分！
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

module.exports = app;
