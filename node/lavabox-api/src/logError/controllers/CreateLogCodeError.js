import LogCodeError from "../../models/logCodeError";

const CreateLogCodeError = async (req, res, next) => {
  const data = req.body;
  try {
    console.log("data", data);

    const newLogObj = new LogCodeError({
      name: data.name,
      message: data.message,
      componentName: data.componentName,
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

export default CreateLogCodeError;
