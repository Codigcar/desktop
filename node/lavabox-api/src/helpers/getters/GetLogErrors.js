const LogCodeError = require("../../models/logCodeError");
const LogComponentError = require("../../models/logComponentError");
const LogFunctionError = require("../../models/logFunctionError");
const LogInternalError = require("../../models/logInternalError");

const GetLogErrors = async ({ os, dateFrom, dateTo }, type, res) => {
  console.log('tmr')
  var data = [];

  const filter = {};
  if (os) {
    filter["os"] = os;
  }

  if (dateFrom) {
    filter["createdAt"] = {
      $gte: dateFrom,
    };
  }
  if (dateTo) {
    const filterCreatedAt = filter["createdAt"] ?? {};
    filter["createdAt"] = {
      ...filterCreatedAt,
      $lte: dateTo,
    };
  }

  try {
    switch (type) {
      case "code":
        data = await LogCodeError.find(filter).sort([["createdAt", "-1"]]);
        break;
      case "component":
        data = await LogComponentError.find(filter).sort([["createdAt", "-1"]]);
        break;
      case "function":
        data = await LogFunctionError.find(filter).sort([["createdAt", "-1"]]);
        break;
      case "internal":
        data = await LogInternalError.find(filter).sort([["createdAt", "-1"]]);
        break;
      default:
        return {
          data: null,
          error: new Error(
            "Type must be one of the following: code, component, function, internal."
          ),
        };
    }
    return { data, error: null };
  } catch (error) {
    return {
      result: null,
      error,
    };
  }
};

module.exports = GetLogErrors;
