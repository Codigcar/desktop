const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    isVerified: {
       type: Boolean,
       default: false
    },
    firstName: {
        type: String
    },
    lastName: {
      type: String
    },
    phone: {
      type: String
    }
});


userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch(error) {
    throw new Error(error);
  }
}

// Create a model
const UserAdmin = mongoose.model('userAdmin', userSchema);

// Export the model
module.exports = UserAdmin;
