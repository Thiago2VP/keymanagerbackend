const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { DataTypes } = require('sequelize');
const db = require('../models/index');
const User = user(db.sequelize, DataTypes);

class TokenController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({ errors: ["Credenciais inválidas."] });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ errors: ["Usuário não existe."] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: ["Senha inválida."] });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.status(200).json({ token, user: { name: user.name, id, email } });
  }
}

module.exports = new TokenController();
