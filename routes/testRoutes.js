// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models'); // SequelizeのUserモデルを想定

// 🔁 全ユーザー削除（DELETE）
router.delete('/reset-users', async (req, res) => {
  try {
    await User.destroy({ where: {}, truncate: true });
    res.status(204).end();
  } catch (err) {
    console.error('ユーザー削除失敗:', err);
    res.status(500).json({ error: 'ユーザー削除失敗' });
  }
});

// 🆕 ユーザー一括作成（POST）
router.post('/reset-users', async (req, res) => {
  try {
    const { users } = req.body;
    if (!Array.isArray(users)) {
      return res.status(400).json({ error: 'usersは配列で送信してください' });
    }

    const createdUsers = await User.bulkCreate(users);
    res.status(201).json(createdUsers);
  } catch (err) {
    console.error('ユーザー作成失敗:', err);
    res.status(500).json({ error: 'ユーザー作成失敗' });
  }
});

module.exports = router;
