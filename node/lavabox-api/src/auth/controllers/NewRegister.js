const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Email = require('email-templates');
const fetch = require('node-fetch');
const config = require('../../configs/config');
const User = require('../../models/user');
const { JWT_SECRET } = require('../../configs/config')
const RegisterToken = require('../RegisterToken');
import culqi from '../../configs/culqi';
var axios = require('axios');

const NewRegister = async (req, res, next) =>  {
    try {
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
        console.log("lastNameId", latestUser[0].local.id);
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

        //create culqi customer
        const culqi_customer = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            address: address,
            address_city: "Lima",
            country_code: "PE",
            phone_number: phone
        }
        
        const findCustomer = await FindCustomer(email);
        console.log("find", findCustomer)
        if(!findCustomer) {
          const customer = await CreateCustomer(culqi_customer);
          console.log("customer", customer)
          if(customer) {
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
                        customer_id: customer.id,
                        buildingId: buildingId
                    }
                });
                console.log("user allocated ! ");
                console.log(new_user);
                let newUser = await new_user.save();
                console.log("user created ! ");

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
                        deepLink: config.deepLink
                    }
                });
                return res.status(200).send({msg: 'Account created, please check email', user_token: token.token });
            } else {
                return res.status(500).json({msg: "Error to save customer"})
            }
        } else if(findCustomer) {
            const deleteCustomer = await DeleteCustomer(findCustomer.id);
            if(deleteCustomer) {
                const customer = await CreateCustomer(culqi_customer);
                console.log("customer", customer)
                if(customer) {
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
                            customer_id: customer.id,
                            buildingId: buildingId
                        }
                    });
                    console.log("user allocated ! ");
                    console.log(new_user);
                    let newUser = await new_user.save();
                    console.log("user created ! ");

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
                            deepLink: config.deepLink
                        }
                    });
                    return res.status(200).send({msg: 'Account created, please check email', user_token: token.token });
                } else {
                    return res.status(500).json({msg: "Error to save customer"})
                }
            } else {
                return res.status(500).json({msg: "Error to delete customer"});
            }
        } else {
            return res.status(500).json({msg: "Error to find customer"})
        }
             
    } catch (error) {
       console.log(error);
       return res.status(500).send(error); 
    }
   
}
module.exports = NewRegister;

async function FindCustomer(email) {
    try {
        let url = 'https://api.culqi.com/v2/customers';
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json', 
                'Accept-Encoding': '*',
                'Authorization': 'Bearer '+culqi.private_key
            },
            redirect: 'follow'
        });
        console.log("FindCustomer", response);
        
        if(response.status === 200 || response.status === 201) {
            const responseJson = await response.json();
            //console.log(responseJson);    
            for (let i = 0; i < responseJson.data.length; i++) {
                if((responseJson.data[i].email).toUpperCase() === email.toUpperCase()) {
                    console.log(responseJson.data[i]);
                    return responseJson.data[i];
                }
            }
            return false;
        } else {
            return false;
        }     
    } catch (error) {
        console.log(error);
    }
}

async function CreateCustomer(customer_data) {
    try {
        
        var data = JSON.stringify(customer_data);
        let url = 'https://api.culqi.com/v2/customers';
        const response = await fetch(url, {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept-Encoding': '*',
                'Authorization': 'Bearer '+culqi.private_key
                
            },
            body: data
        });
        console.log("CreateCustomer", response);
        if(response.status === 200 || response.status === 201) {
            return await response.json()
        } else {
            return false;
        }
    } catch (error) {
        console.log("error", error.response);
        return error;
    }
}

async function DeleteCustomer(id) {
    try {
        let url = 'https://api.culqi.com/v2/customers';
        const response = await fetch(url+"/"+id, {
            method: 'delete',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+culqi.private_key
            },
        });
        console.log("Delete", response);
        if(response.status === 200 || response.status === 201) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        
    }
}
