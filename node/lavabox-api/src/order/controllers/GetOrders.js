
import Order from 'models/order';
import GetUsers from 'helpers/getters/GetUsers';
import GetOrders from 'helpers/getters/GetOrders';

// GET THE ALL THE ORDERS
const GetUserOrders = async(req, res, next) =>{
  try{
    let userId = req.userId;
    let orders = await GetOrders({ _userId: userId }, 'list');
    if(!orders) return res.status(400).send("User has no cards");
    return res.status(200).send(orders);
  }catch(error){
    console.log(error);
    return res.status(403).send("Error");
  }
}

export default GetUserOrders;
