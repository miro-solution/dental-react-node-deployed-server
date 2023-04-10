const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../utils/auth');

router.get('/:sub', usersController.getDentists);
router.post('/:_id', usersController.addDentist);
router.put('/:_id', usersController.updateDentist);
router.delete('/:_id', usersController.deleteDentist);

module.exports = router;
