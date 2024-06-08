const Email = require('email-templates');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../../models/user");
const RegisterToken = require('../RegisterToken');
const config = require("../../configs/config");

//TODO: get re.params.token as mandatory and proceed with change Password 
const ChangePassword = async (req, res, next) => {
	try {
		if (!req.params.token) return res.status(400).send({type: 'missing-token', msg: 'You need to provide a token'});
		const {password, repeat_password} = req.body;

		if (password !== repeat_password)
			res.status(400).send({type: "password-incongruence", msg: "Provided passwords are different"});

		let token = await RegisterToken.findOne({"token": req.params.token}).exec();
		if (!token) return res.status(400).send({type: 'not-registered', msg: 'We are unable to find this user'});

		let user = await User.findOne({"_id": token._userId});
		if (!user)
			return res.status(400).send({type: 'not-registered', msg: 'We were unable to find a user for this token.'});

		user.local.password = await bcrypt.hashSync(password, 8);

		await user.save();
		res.status(200).send({type: 'password-changed', msg: "Password Succesfully Changed. Please Login."});
	} catch (err) {
		return res.status(500).send({msg: err.message});
	}
}

module.exports = ChangePassword; 
