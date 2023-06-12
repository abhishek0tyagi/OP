const express = require('express');

const router = express.Router();
// const { errorHandler } = require('../utils/common');
// const { rateLimiter5, rateLimiter100 } = require('../middleware/rate-limiter');
const userController = require('../controllers/userController');
const probandsol = require('../controllers/probandsol');

router.get('/register/:phone', userController.register);
router.post('/verifyPhoneOtp', userController.verifyPhoneOtp);
router.post('/PandS',probandsol.PandS);

module.exports = router;