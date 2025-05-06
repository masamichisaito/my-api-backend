const express = require('express');
const cors = require('cors');
const app = express();

// JSONボディのパース
app.use(express.json());

// CORSの設定
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://my-ui-frontend.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions)); // ← これ1回でOK

// テスト用ルートの登録
const testRoutes = require('./routes/testRoutes');
app.use('/test', testRoutes);

// 本番用ルートの登録（必要に応じて追加）
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

module.exports = app;
