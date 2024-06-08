import { Router } from "express";
import router_f from "express-promise-router";
import LogErrorController from "../logError/logErrorController";

const { validateQuery, schemas } = require("../helpers/routeHelpers");

const router = router_f();

router
  .route("/")
  .get(validateQuery(schemas.logQuerySchema), LogErrorController.GetLogErrors);
router.route("/component").post(LogErrorController.CreateLogComponentError);
router.route("/function").post(LogErrorController.CreateLogFunctionError);
router.route("/code").post(LogErrorController.CreateLogCodeError);

export default router;
