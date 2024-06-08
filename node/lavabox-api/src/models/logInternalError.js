const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const logInternalErrorSchema = new Schema(
  {
    file: String,
    type: String,
    functionName: String,
    status: Number,
    info: {},
  },
  {
    timestamps: true,
  }
);

// Create a model
const LogInternalError = mongoose.model(
  "logInternalError",
  logInternalErrorSchema
);

// Export the model
module.exports = LogInternalError;
