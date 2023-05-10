const { Router } = require('express');
const homeController = require('../controllers/Home');

const router = new Router();

module.exports = router.get('/', homeController.index);
