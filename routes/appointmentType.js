const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');

router.post('/', appointmentsController.createAppointmentType);

router.get('/', appointmentsController.readAppointmentTypes);

router.delete('/:_id', appointmentsController.deleteAppointmentType);
router.put('/:_id', appointmentsController.updateAppointmentType);

module.exports = router;
