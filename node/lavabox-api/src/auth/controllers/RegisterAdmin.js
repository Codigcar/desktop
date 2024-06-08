const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const config = require('../../configs/config');

const UserAdmin = require('../../models/userAdmin');
const {JWT_SECRET} = require('../../configs/config');
const RegisterToken = require('../RegisterToken');
const { createIndexes } = require('../../models/userAdmin');

const RegisterAdmin = async (req, res, next) => {
    const {email, password, firtName, lastName, phone} = req.value.body;
    const foundUser = await UserAdmin.findOne({email: email});
    if(foundUser) {
        console.log("User Found");
        console.log(foundUser);
        res.status(400).json({msg: "A ready already has the email or username you already using, please check"});
    }

    let hashedPassword = await bcrypt.hashSync(password, 8);
    console.log("hashedPassword", hashedPassword);

    let new_user = new UserAdmin({
        email: email,
        password: hashedPassword,
        firtName: firtName,
        lastName: lastName,
        phone: phone
    });

    console.log(new_user);
    let newUser = await new_user.save();
    console.log("user created!");
    let token = new RegisterToken({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
    let newToken = await token.save();
    console.log("newToken", newToken);

    return res.status(200).send({msg: 'Account created, please check email', user_token: token.token });
}

module.exports = RegisterAdmin;