'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Words extends Model {
    static associate(models) {
      Words.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Words.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        notEmpty: {
          msg: "O campo deve ser preenchido",
        },
      },
    },
    login: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        notEmpty: {
          msg: "O campo deve ser preenchido",
        },
      },
    },
    keyPass: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        notEmpty: {
          msg: "O campo deve ser preenchido",
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Words',
  });
  return Words;
};
