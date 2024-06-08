const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserAdmin = require('../../models/userAdmin');
const RegisterToken = require('../RegisterToken');
const config = require('../../configs/config');

const LoginAdmin = async (req, res, next) => {
    try {
        const {email, password} = req.value.body;
        let user = await UserAdmin.findOne({email: email});
        console.log(user);
        if(!user) return res.status(404).send({type: 'not-found-user', msg: 'User not found'});
        if(!user.isVerified) return res.status(403).send({type: 'not-verified', msg: 'Your acount has not been verified.'});
        console.log(password);
        console.log(user.password);
        let passwordIsValid = bcrypt.compareSync(password, user.password);
        console.log("passwordIsValid", passwordIsValid);
        if(!passwordIsValid) return res.status(401).send({auth: false, token: null});
        let token = jwt.sign({id:user._id}, config.secret, {
            expiresIn: '30 days' // expires in 30 dias
        })
        return res.status(200).send({auth: true, token: token, _id: user._id})
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

module.exports = LoginAdmin;