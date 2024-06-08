const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const config = require('../../configs/config');

const Login = async (req, res, next) => {
	try {
		const {email, password} = req.value.body;
		let user = await User.findOne({"local.email": email});
		if (!user) return res.status(401).send({type: 'login error', msg: 'User or Password incorrect'});
		if (!user.local.isVerified)
			return res.status(403).send({type: 'not-verified', msg: 'Your account has not been verified.'});

		let passwordIsValid = bcrypt.compareSync(password, user.local.password);
		if (!passwordIsValid) return res.status(401).send({auth: false, token: null});
		let token = jwt.sign({id: user._id}, config.secret, {
			expiresIn: 60 * 60 * (24 * 30) // expires in 30 dias
		});

		return res.status(200).send({auth: true, token: token, _id: user._id});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
}

module.exports = Login;
