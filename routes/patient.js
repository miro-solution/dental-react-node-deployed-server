const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/dentist', patientController.getAllDentists);
router.get('/schedule', patientController.getAllSchedule);
router.get('/users-meetings', patientController.getAllUsersMeetings);

module.exports = router;
