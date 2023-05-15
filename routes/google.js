const express = require('express');
const router = express.Router();
const googleApiCOntroller = require('../controllers/googleApiController');
console.log('google');
router.get('/street', googleApiCOntroller.getStreet);
router.get('/street-number', googleApiCOntroller.getStreetNumber);
router.get('/city', googleApiCOntroller.getCity);
router.get('/postalcode', googleApiCOntroller.getPostalCode);

module.exports = router;
