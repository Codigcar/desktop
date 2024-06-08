import LogFunctionError from "../../models/logFunctionError";

const CreateLogFunctionError = async (req, res, next) => {
  const data = req.body;
  try {
    const newLogObj = new LogFunctionError({
      componentName: data.componentName,
      description: data.description,
      args: data.args,
      error: data.error,
      os: data.os,
      osVersion: data.osVersion,
    });

    const newLog = await newLogObj.save();

    console.log(newLog);

    return res.status(200).send({
      message: "Log Componente created",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default CreateLogFunctionError;
