import GetUsers from "../../helpers/getters/GetUsers";
import RegisterToken from "../RegisterToken";

let config = require("../../../src/configs/config");

const Confirmation = async (req, res) => {
	try {
		if (!req.params.token) return res.status(400).send({type: "missing-token", msg: "You need to provide a token"});

		let token = await RegisterToken.findOne({token: req.params.token}).exec();
		if (!token) return res.status(400).send({type: "not-registered", msg: "We are unable to find this user"});

		let user = await GetUsers(token._userId, "id", res);
		if (!user)
			return res.status(400).send({type: "not-registered", msg: "We were unable to find a user for this token."});

		if (user.local.isVerified) {
			return res.redirect(`${config.WEB_URL}/cuenta-confirmada`);
		} else {
			user.local.isVerified = true;
			user.save((err) => {
				if (err) return res.status(500).send({msg: err.message});
				return res.redirect(`${config.WEB_URL}/cuenta_confirmada`);
			});
		}
	} catch (error) {
		res.status(500).send(error);
	}
};
module.exports = Confirmation;
