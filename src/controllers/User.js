const user = require('../models/user');
const { DataTypes } = require('sequelize');
const db = require('../models/index');
const User = user(db.sequelize, DataTypes);

class UserController {
  async store(req, res) {
    try {
      const users = await User.findAll();
      for (let user of users) {
        if (user.email === req.body.email) return res.status(400).json({
          errors: ['Email já cadastrado']
        })
      }
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      return res.status(201).json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) return res.status(400).json({ errors: ["Usuário não existe"] });
      const userUpdated = await user.update(req.body);
      const { id, name, email } = userUpdated;
      return res.status(200).json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) return res.status(400).json({ errors: ["Usuário não existe"] });
      const { id, name, email } = user;
      await user.destroy();
      return res.status(200).json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

module.exports = new UserController();
