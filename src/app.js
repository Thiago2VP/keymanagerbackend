require('dotenv').config();
require('./models');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');
const tokenRoutes = require('./routes/token');
const wordsRoutes = require('./routes/words');

const whiteList = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  
  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  
  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/words', wordsRoutes);
  }
}

module.exports = new App().app;
