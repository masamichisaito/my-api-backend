const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// テスト用ルート（必ず最後のルートの前に！）
app.use('/__test__', require('./routes/test'));

// /users のルートはこれ1つだけで十分！
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

module.exports = app;
