const express = require('express');
const { register, login, matchskills } = require('../controllers/user');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/match-skills/:id',matchskills);

module.exports = router;