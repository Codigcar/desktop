import LogComponentError from "../../models/logComponentError";

const CreateLogComponentError = async (req, res, next) => {
  const data = req.body;
  try {
    const newLogObj = new LogComponentError({
      componentName: data.componentName,
      componentStack: data.componentStack,
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

export default CreateLogComponentError;
