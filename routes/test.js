const express = require('express');
const router = express.Router();
const { User } = require('../models');

// テスト用：全ユーザー削除
router.delete('/reset-users', async (req, res) => {
  try {
    await User.destroy({ where: {}, truncate: true, restartIdentity: true });
    res.status(204).send();
  } catch (err) {
    console.error('リセット失敗:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
