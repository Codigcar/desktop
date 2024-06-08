const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
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
    address: {
      type: String
    },
    phone: {
      type: String
    },
    customer_id: {
      type: String
    },
    buildingId: {
      type: String
    },
    pushToken: {
      type: String
    },
    createdAd: {
      type: Date,
      default: Date.now
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});


userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch(error) {
    throw new Error(error);
  }
}

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
