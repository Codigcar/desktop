const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const config = require('../../configs/config');

const LoginWithEmail = async (req, res, next) => {
    try {
        const { email, password } = req.value.body;
        let user = await User.findOne({"localEmail.email": email});
        console.log(user);
        if (!user) return res.status(401).send({ type: 'login error', msg: 'User or Password incorrect' });
        console.log(password);
        console.log(user.localEmail.password);
        let passwordIsValid = bcrypt.compareSync(password, user.localEmail.password);
        console.log(passwordIsValid);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: '30 days' // expires in 30 dias
        });
        return res.status(200).send({ auth: true, token: token, _id: user._id });
    } catch (error) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.export = LoginWithEmail;