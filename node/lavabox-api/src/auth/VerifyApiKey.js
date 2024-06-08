const VerifyApiKey = (secretApiKey) => (req, res, next) => {
  let apiKey = req.headers["ApiKey"] || req.headers["apikey"];
  if (typeof apiKey !== "string") {
    res.sendStatus(400);
    return;
  }

  if (!apiKey) {
    return res
      .status(407)
      .send({ auth: false, message: "No ApiKey provided." });
  } else {
    if (apiKey === secretApiKey) {
      next();
    } else {
      return res.status(407).send({ auth: false, message: "Invalid ApiKey." });
    }
  }
};

export default VerifyApiKey;
