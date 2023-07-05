const express = require('express');
const { upload, memoryupload } = require('../middleware/middle');
const horoScope = require('../controllers/horoScope')
const { errorHandler } = require('../utils')

const router = express.Router();
// const { errorHandler } = require('../utils/common');
// const { rateLimiter5, rateLimiter100 } = require('../middleware/rate-limiter');
const userController = require('../controllers/userController');
const probandsol = require('../controllers/probandsol');
const problemController = require('../controllers/problemsController');
const panditListController = require('../controllers/panditListController')

router.get('/register/:phone', userController.register);
router.post('/verifyPhoneOtp', userController.verifyPhoneOtp);
router.post('/exceltoJSONDeepanshu', userController.exceltoJSONDeepanshu);
router.post('/uploadImage', memoryupload.single('fileName'), userController.uploadImage);
router.post('/PandS', probandsol.PandS);
router.post('/createProblemCategory', problemController.createProblemCategory);
router.get('/getProblemsCategory', problemController.getProblemsCategory);


router.get('/charts', horoScope.charts)  //get male and female match making score

router.get('/matchmakingScore', horoScope.matchmakingScore)  //get male and female match making score
router.post('/exceltoJson', upload.single('fileName'), errorHandler(userController.exceltoJson))
router.get('/getPoliceData', userController.getPoliceData);
router.get('/dashboardCount', userController.dashboardCount)
router.post('/registerPandit', panditListController.registerPandit)
router.get('/fetchPanditList', panditListController.fetchPanditList)
module.exports = router;