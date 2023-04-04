const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../utils/auth');
//need text middleware to parse plain text token
router.post('/login', express.text(), usersController.userLogin);
router.post('/register', express.text(), usersController.userRegister);

//check for unique url
router.get('/uniqueUrl', usersController.isUnique);
router.get('', usersController.readUsers);

//gets user info by id
//May not be necessary
router.get('/:id', usersController.getUser);

//get user info from public calendar route
router.get('/:url/:eventDuration', usersController.getUserByUrl);

router.put('/profile/:id', usersController.updateUser);
router.put('/afterprofile/:id', usersController.AfterUpdateProfile);

//possible TODO: update meetings arr inside update user if possible
router.post('/meetings/:id', usersController.createMeetings);
router.put('/meetings', usersController.updateMeetings);
router.delete('/meetings', usersController.deleteMeetings);

router.post('/email_verify', usersController.emailVerify);
router.post('/check_email_verification_code', auth, usersController.checkVerificationCode);
router.post('/reset-pass', auth, usersController.resetPassword);

module.exports = router;
