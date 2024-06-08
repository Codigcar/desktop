const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const logComponentErrorSchema = new Schema(
  {
    componentName: String,
    componentStack: String,
    error: {},
    os: String,
    osVersion: String,
  },
  {
    timestamps: true,
  }
);

// Create a model
const LogComponentError = mongoose.model(
  "logComponentError",
  logComponentErrorSchema
);

// Export the model
module.exports = LogComponentError;
