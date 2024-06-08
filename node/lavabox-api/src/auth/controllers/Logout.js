const Email = require('email-templates');
const crypto = require('crypto');
const User = require('../../models/user');
const config = require("../../configs/config");

const Logout = async(req,res, next) => {
    res.status(200).send({ auth: false, token: null});
} 

module.exports = Logout;