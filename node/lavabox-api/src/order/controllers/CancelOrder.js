import Order from 'models/order';
import GetOrders from 'helpers/getters/GetOrders';

const CancelOrder = async(req, res, next) =>{
  console.log(req.params.orderId);
  try {
      if(!req.params.orderId) return res.status(400).send({ type:'missing-userrId', msg: 'You need to provide a userId' });
      const order = await GetOrders(req.params.orderId, 'id');
      console.log(order);
      order.status = "CANCELED";
      let orderUpdated = await order.save();
      res.status(200).send({type: 'order-cancelled', msg: "Tu orden fue cancelada"});
  } catch(error){
      res.status(500).send(error);
  }
}


export default CancelOrder;
