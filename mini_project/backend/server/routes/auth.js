const express = require('express');
const { register, login } = require('../controllers/authController'); // Ensure this path is correct
const router = express.Router();

router.post('/auth/register', register);

router.post('/auth/login', login);

module.exports = router;
