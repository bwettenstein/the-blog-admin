const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/message-list', messageController.messageListGet);

router.get('/create', messageController.createMessageGet);

router.post('/create', messageController.createMessagePost);

router.put('/:id', messageController.editMessagePut);

module.exports = router;
