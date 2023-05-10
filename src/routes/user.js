const { Router } = require('express');
const userController = require('../controllers/User');

const loginRequired = require('../middlewares/loginRequired');

const router = new Router();

router.post('/', userController.store);
router.put("/", loginRequired, userController.update);
router.delete("/", loginRequired, userController.delete);

module.exports = router;
