const express = require('express');
const cors = require('cors');
const app = express();

// JSONパース
app.use(express.json());

// CORS設定（必要に応じて環境変数から許可リストに切り替えも可能）
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://my-ui-frontend.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// テスト用ルート（E2Eなどでリセット用に使う場合）
const testRoutes = require('./routes/testRoutes');
app.use('/test', testRoutes);

// メインのユーザールート
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// 必要に応じてエラーハンドリングや404なども追加可能

module.exports = app;
