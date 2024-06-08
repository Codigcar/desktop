const Joi = require("joi");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        console.log("validateBody", result);
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  validateQuery: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.query, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    registerSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      buildingId: Joi.string().required(),
    }),
    registerAdminSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
    }),
    cardSchema: Joi.object().keys({
      token: Joi.string().required(),
      createdAt: Joi.number().required().integer().positive(),
      cardBrand: Joi.string().required(),
      title: Joi.string().required(),
    }),
    logQuerySchema: Joi.object().keys({
      type: Joi.string()
        .valid("code", "function", "component", "internal")
        .required(),
      os: Joi.string().valid("ios", "android"),
      dateFrom: Joi.date(),
      dateTo: Joi.date(),
    }),
  },
};
