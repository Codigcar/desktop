const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Email = require('email-templates');
const config = require('../../configs/config');

const User = require('../../models/user');
const { JWT_SECRET } = require('../../configs/config')
const RegisterToken = require('../RegisterToken');

const Register = async (req, res, next) =>  {
   const { email, password, firstName, lastName, address, phone, buildingId } = req.value.body;
   const foundUser = await User.findOne({ "local.email": email});
   console.log("user found !")
   console.log(foundUser)
   if(foundUser){
       return res.status(400).json({msg: "A ready already has the email or username you are already using, please check"})
   }
   let hashedPassword = await bcrypt.hashSync(password, 8);
   console.log(hashedPassword);

   const latestUser = await User.find({}).sort({_id:-1}).limit(1);
   console.log("lastName", latestUser[0]);
   let id = 1;
   
   if(latestUser.length>0) {
    let increment = parseInt(latestUser[0].local.id) + 1;
    const idx =  6 - (increment.toString().length);
    let ceros = ''
    for (let index = 0; index < idx; index++) {
        ceros = ceros + '0';
    }
    id = ceros + increment;

   }
   /*
   console.log({method: 'local',
   local: {
       id: id,
       email: email,
       password: hashedPassword,
       phone: phone,
       firstName: firstName,
       lastName: lastName,
       address: address,
       customer_id: customer_id
   }})*/
   
    let new_user = new User({
        method: 'local',
        local: {
            id: id,
            email: email,
            password: hashedPassword,
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            address: address,
            buildingId: buildingId
        }
    });
    console.log("user allocated ! ")
    console.log(new_user);
    let newUser = await new_user.save();
    console.log("user created ! ")
    let token = new RegisterToken({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
    let newToken = await token.save();
    console.log("newToken", newToken);
    // email user
    let emailFrom = 'LavaBox <info@lavaboxlavanderia.com>';
    let emailTitle = '¡Bienvenido a LavaBox 😊!';
    let new_email = new Email({
        message: {
            from: emailFrom,
            subject: emailTitle,
            to: newUser.local.email
        },
        send: true,
        transport: config.transport,
    });
    let newEmail = await new_email.send({
        template: 'register',
        message: {
            to: new_user.email
        },
        send: true,
        locals: {
            token: token.token,
            host: req.headers.host,
            deepLink: config.deepLink,
            email: new_user.email
        }
    })
    return res.status(200).send({msg: 'Account created, please check email', user_token: token.token });
    //return res.status(200);
   }
module.exports = Register;
