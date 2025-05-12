const express = require('express');
const router = express.Router();
const { User } = require('../models');

// ユーザー一覧取得
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'サーバーエラー' });
  }
});

// ユーザー登録
router.post('/', async (req, res) => {
  const { email, name, age, hobby } = req.body;

  try {
    const user = await User.create({ email, name, age, hobby });
    res.status(201).json(user);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(e => e.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: '登録に失敗しました' });
  }
});

// ユーザー削除
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'ユーザーが見つかりません' });
    }
  } catch (err) {
    res.status(500).json({ error: '削除に失敗しました' });
  }
});

module.exports = router;
