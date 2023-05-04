import Sequelize, { Model } from "sequelize";

export default class Dbase extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo deve ser preenchido",
            },
          },
        },
        login: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo deve ser preenchido",
            },
          },
        },
        passKey: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo deve ser preenchido",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "dbase",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}