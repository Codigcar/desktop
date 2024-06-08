const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const VerifyToken = (req, res, next) => {
	let jwtToken = req.headers.authorization;

	if (typeof jwtToken !== 'string') {
		res.sendStatus(400);
		return;
	}

	let TokenArray = jwtToken.split(" ");

	if (TokenArray[0] === "Bearer") {
		let token = TokenArray[1];
		if (!token) return res.status(407).send({auth: false, message: 'No token provided.'});

		jwt.verify(token, config.secret, (err, decoded) => {
			console.log(err, decoded)
			if (err) return res.status(407).send({auth: false, message: 'Failed to authenticate token.'});
			req.userId = decoded.id;
			next();
		});
	} else {
		res.status(407).send({auth: false, type: "non-bearer", message: 'Authorization must be bearer token'});
	}
}

module.exports = VerifyToken;
