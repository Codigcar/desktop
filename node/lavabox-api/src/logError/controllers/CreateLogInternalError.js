import LogInternalError from "models/logInternalError";

export const SaveLogInternalError = async ({
  file = "",
  functionName = "",
  type = "",
  info = {},
  status = 0,
}) => {
  try {
    const logObj = new LogInternalError({
      file,
      type,
      functionName,
      info,
      status,
    });
    return await logObj.save();
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
