const bcryptjs = require('bcryptjs');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    passwordIsValid(password) {
      return bcryptjs.compare(password, this.passwordHash);
    }/*
    static associate(models) {
      User.hasMany(models.Words, { foreignKey: 'userId' });
    }*/
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 255],
          msg: 'Campo Nome deve ter entre 3 e 255 caracteres',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      unique: {
        msg: 'Email possui registro',
      },
      validate: {
        isEmail: {
          msg: 'Email inexistente',
        },
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    password: {
      type: DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        len: {
          args: [6, 45],
          msg: 'Campo Senha deve ter entre 6 e 45 caracteres',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeSave', async (user) => {
    if (user.password) {
      user.passwordHash = await bcryptjs.hash(user.password, 8);
    }
  });
  return User;
};
