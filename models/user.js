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
// Before saving a model save this function
userSchema.pre('save', function(next) {
  // Get access to user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash (encrypt) the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // Overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);
// Export the model
module.exports = ModelClass;
