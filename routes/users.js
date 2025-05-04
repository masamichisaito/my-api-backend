const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('一覧取得エラー:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { email, name, age, hobby } = req.body;

  try {
    const user = await User.create({ email, name, age, hobby });
    res.status(201).json(user);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map(e => {
        if (e.path === 'email' && e.type === 'notNull Violation') {
          return 'email は必須です';
        }
        if (e.path === 'email' && e.type === 'Validation error') {
          return '正しいメール形式で入力してください';
        }
        if (e.path === 'name') {
          return 'name は必須です';
        }
        if (e.path === 'age' && e.validatorKey === 'min') {
          return 'age は0以上である必要があります';
        }
        return e.message;
      });
      return res.status(400).json({ errors: messages });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'email はすでに登録されています' });
    }

    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
