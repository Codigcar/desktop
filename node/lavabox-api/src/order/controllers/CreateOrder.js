import Email from 'email-templates';
import Order from 'models/order';
import User from 'models/user';
import Config from 'configs/config';
import GetUsers from 'helpers/getters/GetUsers';
import GetBuilding from 'helpers/getters/GetBuilding';

//CREATE AN ORDER

const CreateOrder = async (req, res, next) => {
        let userId = req.userId;
        console.log('[userId]: ',userId);
        console.log('[userId]: ',JSON.stringify(userId));
        const { seco, planchado, edredones, calzado, instruccions, locker} = req.body;
        //console.log(req.body);

        const latestOrder = await Order.find({}).sort({_id:-1}).limit(1);
        console.log("latestOrder", (latestOrder));
        var id = '';

        if(latestOrder.length>0) {
            //console.log("into if")
            let parseLetter = (latestOrder[0].id).substr(0,2);
            let parseNumber = parseInt((latestOrder[0].id).substr(2,3));
           // console.log(parseLetter, parseNumber);
            if(parseNumber === 999) {
                //console.log("cambio de letra");
                let newLetter = getSequenceLetter(parseLetter);
                id = newLetter+'001';
            } else {
                //console.log("incrementar numero");
                let increment = parseNumber + 1;
                //console.log("increment", increment);
                let idx = 3 - ((increment.toString()).length);
                let ceros = '';
                for (let index = 0; index < idx; index++) {
                    ceros = ceros + '0';
                }
                id = parseLetter+ceros+increment;
            }
        } else {
            id ='AA001';
        }       

        //console.log("id => ", id);
        try{
        let new_order = new Order({
            _userId: userId,
            id: id, 
            instructions: instruccions,
            commentsAdmin: "Procesando orden",
            locker: parseInt(locker)
           // status: 'PENDING_PAYMENT'

        });
        let user =  await GetUsers({ _id: userId }, 'id');
        //console.log(user);
        let typeService = '';
        if(seco) {
            new_order.services.seco = !!seco; 
            typeService+='Lavado al seco |';
        }
        if(planchado) { 
            new_order.services.planchado = !!planchado; 
            typeService+='Lavado y doblado por peso |';
        }
        if(edredones) {
            new_order.services.edredones = !!edredones; 
            typeService+='Sabanas, cubrecamas y edredones |';
        }
        if(calzado) {
            new_order.services.calzado = !!calzado; 
            typeService+='Calzado, carteras y correas';
        }
        const buildingId = user.local.buildingId;

        // get direction by buildingId
        let building = false;
        if(buildingId[0] === 'B') {
            building = await GetBuilding({id: buildingId}, 'list', res);
            building = building[0];
        } else {
            building = await GetBuilding({_id: buildingId}, 'id', res);
        }
        if(!building) res.status(400).send({ type: 'not-created', msg: 'We are unable to find this building'});

        new_order.building = building.direction;
        new_order.district = user.local.address;
      
        let newOrder = await new_order.save();
       //console.log(newOrder);
        let emailFrom = 'LavaBox <info@lavaboxlavanderia.com>';
        let emailTitle = '¡Tu orden ha sido aceptada!';

        // send email to admin
        let new_email_admin = new Email({
            message: {
                from: emailFrom,
                subject: 'Operación Nueva - '+newOrder.building,
                to: Config.emailAdmin
            },
            send: true,
            transport: Config.transport
        });

        let newEmailAdmin = await new_email_admin.send({
            template: 'adminNewOrder',
            message: {
                to: Config.emailAdmin
            },
            locals: {
                key_build: newOrder.building,
                orderId: newOrder.id, 
                userId: user.local.id,
                userName: user.local.firstName+" "+user.local.lastName,
                phone: user.local.phone,
                typeOrder: typeService,
                comment: instruccions,
                buildingName: newOrder.building,
                district: newOrder.district,
                userEmail: user.local.email,
                createdAt: new Date(newOrder.createdAt),
                locker: newOrder.locker
            }
        });

        // send email to user
        let new_email = new Email({
            message: {
                from: emailFrom,
                subject: emailTitle,
                to: user.local.email
            },
            send: true,
            transport: Config.transport
        });
        let newEmail = await new_email.send({
            template: 'ordercreation',
            message: {
                to: user.local.email
            },
            send: true,
            locals: {
                orderId: newOrder.id,
                host: req.headers.host,
                name: user.local.firstName+" "+user.local.lastName,
                direction: user.local.address,
                locker: locker,
                resumen: typeService,
                email: user.local.email
            }
        })

        return res.status(200).send({
            msg: 'Order created'

    });
} catch(error){
    console.log(error);
    res.status(500).send(error);
}
  //  res.status(200).send("good")
}
// letter = AA
const getSequenceLetter = (letter) => {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let change;
    let sequenceLetter =[] ;
    if(letter[1] === 'Z'){
        sequenceLetter = ['0', 'Z']
        change = 0;
    } else {
        sequenceLetter = ['A', '0']
        change = 1;
    }
    for (let i = 0; i < letters.length; i++) {
        if(letters[i] === letter[change]) {
            console.log(letters[i])
            if(i < letters.length - 1) {
                sequenceLetter[change] = letters[i+1];
            } 
        }
    }

    return sequenceLetter[0]+sequenceLetter[1];
}

export default CreateOrder;
