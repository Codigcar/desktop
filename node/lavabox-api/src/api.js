import auth from "./routes/auth";
import card from "routes/card";
import order from "routes/order";
import user from "routes/user";
import coupon from "routes/coupon";
import building from "routes/building";
import buildingPrivate from "routes/buildingPrivate";
import Recojo from "routes/recojo";
import Prices from "routes/prices";
import ListPrice from "routes/listPrice";
import LogError from "routes/logError";
import VerifyApiKey from "./auth/VerifyApiKey";
import culqi from "./routes/culqi";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const api = express();
const dotenv = require("dotenv");
const axios = require('axios');
dotenv.config();

const {MONGO_URI, APIKEY_LOG_SECRET} = require("../src/configs/config");
const VerifyToken = require("./auth/VerifyToken");

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", true);

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
console.log("MongoDB connected !");

//Middleware
api.use(morgan("dev"));

// Allow Big Files Transfer
api.use(bodyParser.urlencoded({limit: "200mb", extended: true}));
api.use(bodyParser.json());

// ACCEPTING CROSS SITE REQUESTS
api.use(cors());
api.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// Routes
api.get("/", function (req, res) {
	res.send("Welcome Lavabox API");
});

// AppLinks for ios

api.get("/apple-app-site-association", function (req, res) {
	var fs = require('fs'),
		path = require('path'),
		filePath = path.join(__dirname, 'apple-app-site-association');
	fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
		if (!err) {
			res.send(data);
		} else {
			res.send('Archivo no encontrado: ', err);
		}
	});
})

api.use("/auth", auth);
api.use("/building", building);
api.use('/culqi', culqi);
//LOG ENDPOINTS
api.use("/logerror", VerifyApiKey(APIKEY_LOG_SECRET), LogError);
//ALL OTHER ENDPOINTS ARE UNDER TOKEN
api.use(VerifyToken);
api.use("/user", user);
api.use("/buildingprivate", buildingPrivate);
api.use("/card", card);
api.use("/order", order);
api.use("/coupon", coupon);
api.use("/recojo", Recojo);
api.use("/prices", Prices);
api.use("/listprice", ListPrice);

export default api;
