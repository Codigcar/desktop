import Order from 'models/order';
import GetOrders from 'helpers/getters/GetOrders';

const GetOrdersAssigned = async(req, res, next) =>{
    try{
        let userId = req.userId;
        let orders = await GetOrders({ assigned: false }, 'list');
        if(!orders) return res.status(400).send("has no orders assigned");
        return res.status(200).send(orders);
      }catch(error){
        console.log(error);
        return res.status(403).send("Error");
      }
}

export default GetOrdersAssigned;
