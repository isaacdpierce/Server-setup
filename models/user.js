// Set up instructions (data model) for mongoose to handle
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema is used to tell mongoose about the particular fields the model will have

// Define the model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);
// Export the model
module.exports = ModelClass;
