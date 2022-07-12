const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const requireAuth = require('../middlewares/authorization');

const router = express.Router();

const jsonParser = bodyParser.json({
    limit: '40mb',
    type: 'application/json'
});

// router.get('/', jsonParser, get_users);
router.post('/signup', jsonParser, userController.add_user);
router.post('/login', jsonParser, userController.login);
router.get('/:username', jsonParser, requireAuth, userController.get_user_by_username);

module.exports = router;