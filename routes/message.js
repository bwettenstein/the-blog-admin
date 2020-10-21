const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/message-list', messageController.messageListGet);

router.get('/:id', messageController.getMessageGet);

router.get('/create', messageController.createMessageGet);

router.post('/create', messageController.createMessagePost);

router.put('/:id/edit', messageController.editMessagePut);

router.delete('/:id/delete', messageController.deleteMessageDelete);

module.exports = router;
