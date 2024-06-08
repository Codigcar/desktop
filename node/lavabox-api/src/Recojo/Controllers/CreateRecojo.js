import Recojo from 'models/recojo';
import Config from 'configs/config';
import GetOrders from 'helpers/getters/GetOrders';

const CreateRecojo = async (req, res, next) => {
    let userId = req.userId;

    const {id, day, hour, orders} = req.body;
    console.log(id, day, hour, orders);
    try {
        // create recojo (cabezara)
        const parseDate = day.split('/');
        const newDate = parseDate[2]+"-"+parseDate[1]+"-"+parseDate[0];
        let new_recojo = new Recojo({
            _userAdminId: userId,
            id: id,
            day: newDate,
            hour: hour,
            orders: orders
        })

        let newRecojo = await new_recojo.save();
        
        //Update orders
        if(orders.length >0){
            orders.map(async (order) => {
                
                let order_ = await GetOrders({_id: order._orderId}, 'id', res);
                if(order_) {
                    order_.totalGarments = order.totalClothes;
                    order_.price = order.totalPrice;
                    order_.assigned = true;
                    let tableComment = [];
                    // iteracion en el detalle para extraer el nombre, cantidad y precio
                    order.detail.map((detail) => {
                        tableComment.push([detail.content, detail.quantity, (detail.price)/100]);
                    });
                    order_.commentsAdmin = tableComment;

                    let orderUpdated = await order_.save();
                }
            });
        }

        return res.status(200).send({
            msg: 'Recojo Created'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export default CreateRecojo;