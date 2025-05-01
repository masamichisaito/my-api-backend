const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.status(201).json(user);
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id } });
  res.status(204).end();
};
