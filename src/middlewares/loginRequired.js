const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { DataTypes } = require('sequelize');
const db = require('../models/index');
const User = user(db.sequelize, DataTypes);

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["É necessário estar logado."],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário inválido"],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
        errors: ["Token expirado ou inválido"],
    });
  }
}
