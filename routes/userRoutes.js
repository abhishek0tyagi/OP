const express = require('express');
var multer = require("multer");
const upload = require('../middleware/middle');
const horoScope = require('../controllers/horoScope')

const router = express.Router();
// const { errorHandler } = require('../utils/common');
// const { rateLimiter5, rateLimiter100 } = require('../middleware/rate-limiter');
const userController = require('../controllers/userController');
const probandsol = require('../controllers/probandsol');
const  problemController = require('../controllers/problemsController');

router.get('/register/:phone', userController.register);
router.post('/verifyPhoneOtp', userController.verifyPhoneOtp);
router.post('/PandS', probandsol.PandS);
router.post('/createProblemCategory', problemController.createProblemCategory);
router.get('/getProblemsCategory', problemController.getProblemsCategory);


router.get('/charts',horoScope.charts)  //get male and female match making score

router.get('/matchmakingScore',horoScope.matchmakingScore)  //get male and female match making score
router.get('/exceltoJson',upload.single('fileName'),userController.exceltoJson)
module.exports = router;