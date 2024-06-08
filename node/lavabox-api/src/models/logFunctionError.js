const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const logFunctionErrorSchema = new Schema(
  {
    componentName: String,
    description: String,
    args: [],
    error: {},
    os: String,
    osVersion: String,
  },
  {
    timestamps: true,
  }
);

// Create a model
const LogFunctionError = mongoose.model(
  "logFunctionError",
  logFunctionErrorSchema
);

// Export the model
module.exports = LogFunctionError;
