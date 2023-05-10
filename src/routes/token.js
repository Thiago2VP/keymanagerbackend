const { Router } = require('express');
const tokenController = require('../controllers/Token');

const router = new Router();

module.exports = router.post('/', tokenController.store);
