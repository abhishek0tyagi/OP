const express = require('express');

const router = express.Router();
// const { errorHandler } = require('../utils/common');
// const { rateLimiter5, rateLimiter100 } = require('../middleware/rate-limiter');
const userController = require('../controllers/userController')

router.get('/register', userController.register);

module.exports = router;