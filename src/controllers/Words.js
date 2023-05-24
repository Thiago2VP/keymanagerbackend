const words = require('../models/words');
const { DataTypes, json } = require('sequelize');
const db = require('../models/index');
const Words = words(db.sequelize, DataTypes);

require('dotenv').config();
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CYRPTR_KEY);

class WordsController {
  async store(req, res) {
    try {
      const { name, login } = req.body;
      const keyPass = cryptr.encrypt(req.body.keyPass);
      const userId = req.userId;
      const word = await Words.create({ name, login, keyPass, userId });
      return res.status(201).json(word);
    } catch (e) {
      return res.status(400).json({
        errors: ['Dado não pôde ser guardado'],
      });
    }
  }

  async index(req, res) {
    try {
      const words = await Words.findAll({
        attributes: ['id', 'name', 'login', 'keyPass', 'userId'],
      });
      const userWords = words.filter((word) => word.userId === req.userId);
      for (let word of userWords) {
        word.keyPass = cryptr.decrypt(word.keyPass);
      }
      return res.status(200).json(userWords);
    } catch (e) {
      return res.status(400).json({
        errors: ['Dado não pôde ser encontrado'],
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const word = await Words.findByPk(id, {
        attributes: ['id', 'name', 'login', 'keyPass', 'userId'],
      });
      if (!word) {
        return res.status(400).json({
          errors: ['Informação de conta não existe'],
        });
      }
      word.keyPass = cryptr.decrypt(word.keyPass);
      return res.status(200).json(word);
    } catch (e) {
      return res.status(400).json({
        errors: ['Dado não pôde ser encontrado'],
      });
    }
  }

  async update(req, res) {
    try {
      const word = await Words.findByPk(req.params.id);
      if (!word) return res.status(400).json({ errors: ['Dado não existe'] });
      if (word.userId !== req.userId) return res.status(401).json({
        errors: ['O dado não pertence ao usuário']
      });
      const { name, login } = req.body;
      const keyPass = cryptr.encrypt(req.body.keyPass);
      const userId = req.userId;
      const wordUpdated = await word.update({ name, login, keyPass, userId });
      return res.status(200).json({
        name: wordUpdated.name,
        login: wordUpdated.login,
        keyPass: wordUpdated.keyPass
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const word = await Words.findByPk(req.params.id);
      if (!word) return res.status(400);json({ errors: ['Dado não existe'] });
      if (word.userId !== req.userId) return res.status(401).json({
        errors: ['O dado não pertence ao usuário']
      });
      const { name, login, keyPass } = word;
      await word.destroy();
      return res.status(200).json({ name, login, keyPass });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

module.exports = new WordsController();
