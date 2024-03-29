const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/* GET login page. */
router.get('/', indexController.getLoginPage);

// POST login info
router.post('/', indexController.postLoginPage);

module.exports = router;
