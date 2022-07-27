const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const requireAuth = require('../middlewares/authorization');

const router = express.Router();

const jsonParser = bodyParser.json({
    limit: '40mb',
    type: 'application/json'
});

router.post('/signup', jsonParser, userController.add_user);
router.post('/login', jsonParser, userController.login);
router.get('/', jsonParser, requireAuth, userController.get_current_user);
router.get('/:username', jsonParser, requireAuth, userController.get_user_by_username);

module.exports = router;