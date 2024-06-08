const crypto = require('crypto');
const Email = require("email-templates");
const RegisterToken = require("../RegisterToken");
const config = require("../../configs/config");

const ResendToken = async (req,res, next) => {
    const { email } = req.value.body;
    let user = await user.findOne({ "local.email": email});
    if (!user) return res.status(400).send({ msg: 'No hemos encontrado una cuenta asociado a dicho correo' });
    if (user.isVerified) return res.status(400).send({ msg: 'Esta cuenta ya fue confirmada. Por favor, haga login' });

    try { 
        let token = new RegisterToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex')});
        let newToken = await token.save();
        let emailFrom = 'LavaBox <info@lavaboxlavanderia.com>';
        let emailTitle = 'Reenvío de link de confirmación';
        let emailToSend = new Email({
        message: {
            from: emailFrom,
            subject: emailTitle,
            to: user.email,
        },
        send: true,
        transport: config.transport
        });
        let newEmail = await emailToSend.send({
            template: 'register',
            message: {
            to: user.email
            },
            locals: {
            token: token.token,
            host: req.headers.host
            }
        })
        return res.status(200).send({ msg: 'Token resent', token: token});
    } catch(error){
        res.status(500).send(err);
    }
}

module.exports = ResendToken; 