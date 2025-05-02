const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config(); // ← .env を読み込む

const { User } = require('./models'); // User モデルを忘れずにインポート

// Docker環境でも通す簡易版CORS設定（必要に応じて厳密化）
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// ユーザーAPIルーティング
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// ユーザー一覧取得
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('一覧取得エラー:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
