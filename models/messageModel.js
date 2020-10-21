const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 1,
  },
  text: {
    type: String,
    required: true,
    min: 1,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

MessageSchema.virtual('url').get(function () {
  return '/admin/message/' + this._id;
});

module.exports = mongoose.model('Message', MessageSchema);
