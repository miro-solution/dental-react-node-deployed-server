const express = require('express');

const router = express.Router();
const auth = require('../utils/auth');
const usersController = require('../controllers/usersController');

//need text middleware to parse plain text token
router.post('/login', express.text(), usersController.userLogin);
router.post('/register', express.text(), usersController.userRegister);

//check for unique url
router.get('', usersController.readUsers);
router.get('/uniqueUrl', usersController.isUnique);

//gets user info by id
router.get('/:id', usersController.getUser);

//get user info from public calendar route
router.get('/:url/:eventDuration', usersController.getUserByUrl);
router.get('/get_appoitmentTypes', usersController.getAllAppointmentsTypes);

//get itent list from dialogflow
router.get('/dialogflow/intent/get_intent_list', usersController.getItentListFromDialogFlow);

router.put('/profile/:id', usersController.updateUser);
router.put('/afterprofile/:id', usersController.AfterUpdateProfile);

//possible TODO: update meetings arr inside update user if possible
router.post('/meetings/:id', usersController.createMeetings);
router.put('/meetings', usersController.updateMeetings);
router.delete('/meetings', usersController.deleteMeetings);

router.post('/email_verify', usersController.emailVerify);
router.post('/check_email_verification_code', auth, usersController.checkVerificationCode);
router.post('/reset-pass', auth, usersController.resetPassword);

// router.get('/dentist/:sub', usersController.getDentists);
// router.post('/dentist/:_id', usersController.addDentist);
// router.put('/dentist/:_id', usersController.updateDentist);
// router.delete('/dentist/:_id', usersController.deleteDentist);

module.exports = router;
