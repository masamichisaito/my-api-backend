// routes/test.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// 🚨 全件削除してから再登録（isTestData無関係に削除！）
router.post('/reset-users', async (req, res) => {
  try {
    // 💥 全ユーザーデータ削除（全件！）
    await User.destroy({ where: {}, truncate: true, restartIdentity: true });

    // ✅ 受け取ったデータを登録（isTestData: true に強制してもOK）
    const usersWithFlag = req.body.users.map(user => ({
      ...user,
      isTestData: true
    }));

    const created = await User.bulkCreate(usersWithFlag);
    res.status(201).json({ message: '全削除→登録完了', count: created.length });
  } catch (err) {
    console.error('[❌ 完全リセットエラー]', err);
    res.status(500).json({ error: '完全リセット失敗', detail: err.message });
  }
});

module.exports = router;
