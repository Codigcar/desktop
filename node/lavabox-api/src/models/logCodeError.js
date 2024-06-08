const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const logCodeErrorSchema = new Schema(
  {
    name: String,
    message: String,
    componentName: String,
    error: {},
    os: String,
    osVersion: String,
  },
  {
    timestamps: true,
  }
);

// Create a model
const LogCodeError = mongoose.model("logCodeError", logCodeErrorSchema);

// Export the model
module.exports = LogCodeError;
