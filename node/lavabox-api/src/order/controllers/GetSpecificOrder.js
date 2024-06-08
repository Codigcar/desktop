import Order from 'models/order';
import GetOrder from 'helpers/getters/GetOrders';

const GetSpecificOrder = async(req, res, next) =>{
  try {
     if(!req.params.orderId) return res.status(400).send({ type:'missing-orderId', msg: 'You need to provide a orderId' });
    const orderId = await GetOrder({ _id: req.params.orderId }, 'id');
    if (!orderId) return res.status(400).send({ type: 'not-created', msg: 'We are unable to find this order'});

    return res.status(200).send(orderId);
  } catch(error) {
    return res.status(500).send(error);
  }
}

export default GetSpecificOrder;
