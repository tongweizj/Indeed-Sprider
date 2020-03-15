const path = require('path');

const express = require('express');

const plateController = require('../controllers/plate');

const router = express.Router();

router.get('/', plateController.getIndex);
router.get('/plate/edit/:plateid', plateController.getEditPlate);
router.post('/plate/edit/', plateController.postEditPlate);

module.exports = router;
