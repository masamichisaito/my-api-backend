const express = require('express');
const cors = require('cors');

const app = express();

// JSONリクエストのパース
app.use(express.json());

// CORS設定（必要に応じて調整）
const corsOptions = {
  origin: [
    'http://localhost:5173', // ローカル開発用
    'https://your-frontend.onrender.com' // 本番フロントエンドのURL
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// ルート定義（ルーターを分離する構成が望ましい）
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// テスト用ルート（E2E用など）
if (process.env.NODE_ENV === 'test') {
  const testRoutes = require('./routes/testRoutes');
  app.use('/test', testRoutes);
}

module.exports = app;
