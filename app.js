const express = require('express');
const cors = require('cors');
const app = express();

// CORS ミドルウェアを最初に配置
app.use(cors({
  origin: [
    'http://localhost:5173',                     // ローカル開発用
    'https://my-ui-frontend.onrender.com'        // 本番Renderフロントエンド
  ],
  credentials: true
}));

app.use(express.json());

// ルートの定義
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);


module.exports = app;
