import GetLogErrors from "../../helpers/getters/GetLogErrors";

const GetAllLogErrors = async (req, res, next) => {
  try {
    const { type, os, dateFrom, dateTo } = req.query;

    let result = await GetLogErrors(
      {
        os,
        dateFrom,
        dateTo,
      },
      type,
      res
    );

    if (result.error) {
      return res.status(400).send({
        message: result.error.message || "Internal error",
      });
    } else {
      return res.status(200).send(result.data);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export default GetAllLogErrors;
