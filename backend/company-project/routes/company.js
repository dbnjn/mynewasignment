const express = require('express');
const { addcompany } = require('../controllers/company');
const router = express.Router();

router.post('/add-company',addcompany);

module.exports = router;