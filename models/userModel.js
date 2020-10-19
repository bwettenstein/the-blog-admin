const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 25,
  },
  password: {
    type: String || Number || Symbol,
    required: true,
  },
});

UserSchema.virtual('url').get(function () {
  return '/user-management/users' + this._id;
});

module.exports = mongoose.model('User', UserSchema);
