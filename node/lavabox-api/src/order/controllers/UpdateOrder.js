import Order from 'models/order'; 
import GetOrders from 'helpers/getters/GetOrders';
import Email from 'email-templates';
import Config from 'configs/config';
import GetUsers from 'helpers/getters/GetUsers';

const UpdateOrder = async(req, res, next) => {
    let userId = req.userId;
    try {
        const { status, services, instructions, locker, password, aditionalComment, deliveryDate, building } = req.body; 
        console.log("Body", status, services, instructions, locker, password, aditionalComment, deliveryDate);
        if(!req.params.orderId) return res.status(400).send({ type:'missing-userrId', msg: 'You need to provide a userId' });
        const order = await GetOrders({ _id: req.params.orderId}, 'id');
    
        var orderType = '';

        if(services.seco){
            order.services.seco = services.seco;  
            orderType+='Lavado al seco | ';
        };
        if(services.planchado){
            order.services.planchado = services.planchado; 
            orderType+='Lavado y planchado por peso | ';
        };
        if(services.edredones){
            order.services.edredones = services.edredones; 
            orderType+='Sabanas, cubrecamas y edredones';
        };
        if(instructions){order.instructions = instructions};
        if(aditionalComment){order.aditionalComment = aditionalComment}
        if(locker){order.locker = locker}
        if(password){order.password = password}
        if(deliveryDate){order.deliveryDate = deliveryDate}
        if(status){order.status = status};
        if(building){order.building = building};

        let orderUpdated = await order.save();
        console.log("orderUpdated", orderUpdated);

       if(aditionalComment && aditionalComment.length > 0) {
           const user = await GetUsers({_id: order._userId}, 'id');
            let emailTitle = "Comentario Nuevo"
            let emailFrom = 'LavaBox <info@lavaboxlavanderia.com>';
            //comment
            // let new_email = new Email({
            //     message: {
            //         from: emailFrom,
            //         subject: emailTitle,
            //         to: Config.emailAdmin
            //     },
            //     send: true,
            //     transport: Config.transport
            // });

            // let newEmail = await new_email.send({
            //     template: 'adminComment',
            //     message: {
            //         to: Config.emailAdmin
            //     },
            //     send: true,
            //     locals: {
            //         building: order.building,
            //         code_operation: order.id,
            //         userId: user.local.id,
            //         serviceType: orderType,
            //         userName: user.local.firstName+" "+user.local.lastName,
            //         direction: order.district,
            //         userEmail: user.local.email,
            //         createdAt: order.createdAt,
            //         price: order.price,
            //         aditionalComment: order.aditionalComment
            //         }
            // });
        } 
        
        if(status === "QUOTING"){
            let emailFrom = 'LavaBox <info@lavaboxlavanderia.com>';
            const user = await GetUsers({_id: order._userId}, 'id');
            let emailTitle = '¡Paga tu pedido Lavabox!';
            // comment
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
            template: 'pay',
            message: {
              to: user.local.email
            },
            send: true,
            locals: {
              deepLink: Config.deepLink,
              email: user.local.email,
              orderId: order.id,
              pay: (order.price)/100
            }
          });

          console.log("email pay send", newEmail);

        }

        if(status === 'PENDING_PAYMENT' && order.price > 0) {
            let emailFrom = 'LavaBox <info@lavaboxlavanderia.com>';
            const user = await GetUsers({_id: order._userId}, 'id');
            let emailTitle = '¡Paga tu pedido Lavabox!';
            //comment
            // let new_email = new Email({
            //     message: {
            //         from: emailFrom,
            //         subject: emailTitle,
            //         to: user.local.email
            //     },
            //     send: true,
            //     transport: Config.transport
            // });
            //
          // let new_email = new Email({
          //   message: {
          //     from: emailFrom,
          //     subject: emailTitle,
          //     to: user.local.email
          //   },
          //   send: true,
          //   transport: Config.transport
          // });
          //
          // let newEmail = await new_email.send({
          //   template: 'pay',
          //   message: {
          //     to: user.local.email,
          //
          //   },
          //   send: true,
          //   locals: {
          //     deepLink: Config.deepLink,
          //     email: user.local.email,
          //     orderId: order.id,
          //     pay: (order.price)/100
          //   }
          // });

          // console.log("email pay send", newEmail);


        } 
        
        if(status === "ORDER_IN_LOCKER") {
            const user = await GetUsers({_id: order._userId}, 'id');
            let emailFrom = 'LavaBox <info@lavaboxlavanderia.com>';
            let emailTitle = 'Tu orden se encuentra en tu locker';
            //comment
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
                template: 'locker',
                message: {
                    to: user.local.email
                },
                send: true,
                locals: {
                    locker: order.locker,
                    key_locker: order.password,
                    orderId: order.id,
                    email: user.local.email
                }
            });
            console.log("email locker send");
        }
        res.status(200).send({oldInfo: order, newInfo: orderUpdated});
    } catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

export default UpdateOrder;
