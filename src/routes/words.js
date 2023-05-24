const { Router } = require('express');
const wordsController = require('../controllers/Words');

const loginRequired = require('../middlewares/loginRequired');

const router = new Router();

router.get('/', loginRequired, wordsController.index);
router.get('/:id', loginRequired, wordsController.show);
router.post('/', loginRequired, wordsController.store);
router.put('/:id', loginRequired, wordsController.update);
router.delete('/:id', loginRequired, wordsController.delete);

module.exports = router;
