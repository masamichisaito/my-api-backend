const express = require('express');
const router = express.Router();
const { User } = require('../models');

// 全ユーザー削除（テスト用）
router.delete('/reset-users', async (req, res) => {
  try {
    await User.destroy({ where: {}, truncate: true, restartIdentity: true });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'ユーザーリセットに失敗しました' });
  }
});

// 任意のテストデータを登録（必要に応じて）
router.post('/reset-users', async (req, res) => {
  try {
    const { users } = req.body;
    const created = await User.bulkCreate(users);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'テストデータ登録に失敗しました' });
  }
});

module.exports = router;