const express = require('express');
const router = express.Router();

const installController = require('../controllers/install');

router.get('/', installController.index);
router.get('/callback', installController.callback);

module.exports = router;