const Email = require('email-templates');
const crypto = require('crypto');

const RegisterToken = require("../RegisterToken");
const User = require("../../models/user");
const config = require("../../configs/config");

const RecoverPassword = async (req,res,next) => {
    try {
        const { email } = req.body;
        console.log(email);
        let user = await User.findOne({"local.email": email });
        if (!user) return res.status(400).send({ type: 'not-registered', msg: 'We were unable to find a user for this token.' });
        let token = new RegisterToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        let newToken = await token.save();
        let emailFrom = 'LavaBox <info@lavaboxlavanderia.com>';
        let emailTitle = 'Recuperar Contraseña';
        console.log(user);
        let node_email = new Email({
        message: {
            from: emailFrom,
            subject: emailTitle,
            to: user.local.email,
        },
        send: true,
        transport: config.transport
        });

        let newEmail = await node_email.send({
            template: 'recover',
            message: {
                to: user.local.email
            },
            send: true,
            locals: {
                token: token.token,
                host: req.headers.host,
                email: user.local.email
            }
        });
        return res.status(200).send({ msg: 'Recovery Mail Sent'});
    }catch(error) {
        res.status(500).send(error);
    }
}

module.exports = RecoverPassword;
