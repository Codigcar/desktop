import api from "./api";
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 8000;
api.listen(port, () => {
  console.log("Server listening on port " + port);
});
