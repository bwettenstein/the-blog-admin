const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// GET request
// Grabs all of the messages and displays them to the user.
router.get('/message-list', messageController.messageListGet);

// GET request
// Displays information to the user on a specific message
router.get('/:id', messageController.getMessageGet);

// GET Request
// Returns a message to the user telling them the info they need to provide to create a message
router.get('/create', messageController.createMessageGet);

// POST request
// Verifies that the user sent the needed info
// After verification, it saves the model to the database
router.post('/create', messageController.createMessagePost);

// PUT request
// Verifies that the user sent the needed info
// After verification, it updates the existing message with the updated content
router.put('/:id', messageController.editMessagePut);

// DELETE request
// Verifies that the user sent the needed info
// After verification, it removes the message from the database
router.delete('/:id', messageController.deleteMessageDelete);

module.exports = router;
