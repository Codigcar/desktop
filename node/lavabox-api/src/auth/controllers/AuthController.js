const JWT = require('jsonwebtoken');
const User = require('../../models/user');
const { JWT_SECRET } = require('../../configs/config');
const register = require("./Register");
const registerAdmin = require('./RegisterAdmin');
const login = require("./Login");
const loginAdmin = require("./LoginAdmin");
const logout = require("./Logout");
const Confirmation = require('./Confirmation');
import RecoverPassword from '../../auth/controllers/RecoverPassword';
import ChangePassword from '../../auth/controllers/ChangePassword';
const NewRegister = require('./NewRegister');

const signToken = user => {
    return token = JWT.sign({
        iss: 'lavabox',
        sub: user._id,
        iat: new Date().getTime(),//current time
        exp: new Date().setDate(new Date().getDate() + 30) // 30 day of expiration
    }, JWT_SECRET);
 }

const AuthController =  {
    Register: register,
    RegisterAdmin: registerAdmin,
    Login: login,
    LoginAdmin: loginAdmin,
    Logout: logout,
    Confirmation: Confirmation,
    RecoverPassword : RecoverPassword,
    ChangePassword: ChangePassword,
    NewRegister: NewRegister,

    googleOAuth: async (req, res, next) => {
      // Generate token
      const token = signToken(req.user);
      res.status(200).json({ token });
    },

    facebookOAuth: async (req, res, next) => {
      // Generate token
      const token = signToken(req.user);
      res.status(200).json({ token });
    },

    secret: async (req, res, next) => {
      console.log('I managed to get here!');
      res.json({ secret: "resource" });
    }
  }

module.exports = AuthController;
