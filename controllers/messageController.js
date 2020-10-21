const Message = require('../models/messageModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Get list of all messages
// Returns the id, title, text, user, and timestamp in json
exports.messageListGet = (req, res) => {
  Message.find({}, 'title text user', (err, results) => {
    if (err || !results) {
      return res.json({
        success: false,
        message: 'No messages found',
      });
    }
    return res.json({
      success: true,
      results,
    });
  });
};

// Just returns a message telling the user how to create a message
exports.createMessageGet = (req, res, next) => {
  return res.json({
    success: true,
    message:
      "Create a message by adding the message information to your headers. Required headers are 'message-title' and 'message-text'",
  });
};

// User sends the message information through headers:
// message-title: "String of message title here",
// message-text: "String of message text here",
exports.createMessagePost = async (req, res) => {
  // Each jwt has the User's ID in it
  const token = req.header('auth-token');

  // Grabs the user id embedded in the token.
  const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = verifiedToken._id;
  const foundUser = await User.findById(userId);

  if (foundUser && req.header('message-title') && req.header('message-text')) {
    const message = new Message({
      title: req.header('message-title'),
      text: req.header('message-text'),
      user: foundUser,
      timestamp: Date.now(),
    });
    await message.save();
    return res.json({
      success: true,
      message: 'Success, message created',
      createdMessage: message,
    });
  }
  return res.json({
    success: false,
    message: 'Missing headers',
  });
};

// Get a specific message
// Returns the id, title, text, user, and timestamp in json
exports.getMessageGet = async (req, res) => {
  const messageId = req.params.id;
  const foundMessage = await Message.findById(messageId);
  if (foundMessage) {
    return res.json({
      success: true,
      message: 'Message has been found',
      foundMessage,
      messageUrl: foundMessage.url,
    });
  } else {
    return res.json({
      success: false,
      message: 'Message was not found. Check if message id is valid',
    });
  }
};

// User can change the message title or text by making a put request.
// Requires the user to provide the updated title and text through headers
// Edited title is sent through the header, 'message-title'
// Edited text is sent through the header, 'message-text'
// The timestamp will be updated to when the edit executed.
exports.editMessagePut = async (req, res) => {
  const messageId = req.params.id;
  messageTitle = req.header('message-title');
  messageText = req.header('message-text');
  //   console.log(messageId, 'MESSAGE ID');
  //   console.log(messageTitle, 'MESSAGE TITLE');
  //   console.log(messageText, 'MESSAGE TEXT');
  if (messageId && messageTitle && messageText) {
    Message.findByIdAndUpdate(
      messageId,
      {
        title: messageTitle,
        text: messageText,
        timestamp: Date.now(),
      },
      (err, updatedMessage) => {
        if (err) {
          return res.json({
            success: false,
            message: err.message,
          });
        }
        return res.json({
          success: true,
          message: 'Successfully updated',
          updatedMessage,
        });
      }
    );
  } else {
    return res.json({
      success: false,
      message:
        'Incorrect message id and/or missing headers ("message-title" and "message-text" are required headers to edit a message)',
    });
  }
};

exports.deleteMessageDelete = (req, res, next) => {
  const messageId = req.params.id;
  Message.findByIdAndDelete(messageId, (err, deletedMessage) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Incorrect message id',
      });
    }
    return res.json({
      success: true,
      message: 'Message has been deleted',
      deletedMessage,
    });
  });
};
