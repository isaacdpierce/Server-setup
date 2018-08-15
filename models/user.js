const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Schema is used to tell mongoose about the particular fields the model will have
const bcrypt = require('bcrypt-nodejs');

// Set up instructions (data model) for mongoose to handle

// Define the model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save hook -> encrypt password
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);
// Export the model
module.exports = ModelClass;
