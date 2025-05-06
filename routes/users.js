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
  const { email, name, age, hobby, isTestData } = req.body; 
  console.log('[📩 POST受信]', req.body); // ← 追加！

  try {
    const user = await User.create({ email, name, age, hobby, isTestData });
    console.log('[✅ 登録成功]', user); // ← 追加！
    res.status(201).json(user);
  } catch (err) {
    console.error('[❌ 登録エラー]', err); // ← 追加！

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
      return res.status(400).json({ errors: messages }); // ← これが必須
    }
    
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'email はすでに登録されています' });
    }
    
    return res.status(500).json({ error: 'Internal Server Error' });
    
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: '指定されたユーザーが存在しません' });
    }

    res.status(204).send(); // 成功でも返すデータがなければ204
  } catch (err) {
    console.error('[❌ 削除エラー]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
