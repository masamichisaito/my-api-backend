const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
  const { email, name, age, hobby } = req.body;

  try {
    const user = await User.create({ email, name, age, hobby });
    res.status(201).json(user);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// routes/users.js
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('一覧取得エラー:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

