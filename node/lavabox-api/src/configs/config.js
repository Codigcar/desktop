const secret = require("./secret");
const transport = require("./transport");
const culqi = require("./culqi");
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.MONGO_URI);
module.exports = {
  secret: secret,
  transport: transport,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_URL: process.env.APP_URL,
  APIKEY_LOG_SECRET: process.env.APIKEY_LOG_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
  emailAdmin: process.env.EMAIL_ADMIN,
  deepLink: process.env.DEEP_LINK,
  WEB_URL: process.env.WEB_URL,
  culqi: culqi,
};
