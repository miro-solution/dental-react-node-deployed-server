const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const auth = require('../utils/auth');
router.post('/', auth, appointmentsController.createAppointmentType);

router.get('/', appointmentsController.readAppointmentTypes);

router.delete('/:_id', auth, appointmentsController.deleteAppointmentType);
router.put('/:_id', auth, appointmentsController.updateAppointmentType);

module.exports = router;
