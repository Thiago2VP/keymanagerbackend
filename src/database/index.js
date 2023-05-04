import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../models/User";
import Dbase from "../models/Dbase";

const models = [User, Dbase];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));