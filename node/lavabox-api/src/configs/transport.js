const dotenv = require("dotenv");
dotenv.config();
const transport = {
  host: process.env.TRANSPORT_HOST,
  port: process.env.TRANSPORT_PORT,
  secure: process.env.TRANSPORT_SECURE,
  auth: {
    user: process.env.TRANSPORT_USER,
    pass: process.env.TRANSPORT_PASS,
  },
};

module.exports = transport;
