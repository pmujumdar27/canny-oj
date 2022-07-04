const express = require('express');
const bodyParser = require('body-parser');
const add_user = require('./user_routes/add_user');

const router = express.Router();

const jsonParser = bodyParser.json({
    limit: '40mb',
    type: 'application/json'
});

// router.get('/', jsonParser, get_users);
router.post('/', jsonParser, add_user);

module.exports = router;