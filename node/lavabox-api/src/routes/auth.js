const express = require("express");
const router = require("express-promise-router")();
//const passport = require('passport');

const UserController = require("../auth/controllers/AuthController");

const { validateBody, schemas } = require("../helpers/routeHelpers");
router
  .route("/register")
  .post(validateBody(schemas.registerSchema), UserController.Register);

router
  .route("/newregister")
  .post(validateBody(schemas.registerSchema), UserController.NewRegister);

router
  .route("/login")
  .post(validateBody(schemas.authSchema), UserController.Login);

router
  .route("/Logout")
  .post(validateBody(schemas.authSchema), UserController.Logout);

router.route("/confirmation/:token").get(UserController.Confirmation);

router.route("/recover").post(UserController.RecoverPassword);

router.route("/change_password/:token").post(UserController.ChangePassword);

router.route("/secret").get(UserController.secret);

// admin route

router.route('/admin/register')
    .post(validateBody(schemas.registerAdminSchema), UserController.RegisterAdmin)

router
  .route("/admin/login")
  .post(validateBody(schemas.authSchema), UserController.LoginAdmin);

module.exports = router;
