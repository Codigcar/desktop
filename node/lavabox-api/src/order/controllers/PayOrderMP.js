import Order from 'models/order';
import GetOrders from 'helpers/getters/GetOrders';
// SDK de Mercado Pago
var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken("TEST-1422353104872780-041316-1ceb32e8c5930320cce3b2866311a667-545698167");

const PayOrderMP = async(req, res, next) => {
  console.log("PayOrderMP")
  console.log("User Id >> ", req.userId);
  try {
       //console.log(req.body)
      const {transaction_amount, token, description, installments, payment_method_id, payer, orderId} = req.body;
      let order = await GetOrders(orderId, 'id');
      
      const payment_data = {
        transaction_amount: transaction_amount, 
        token: token,
        description: description, 
        installments: installments,
        payment_method_id: payment_method_id,
        payer: payer
      }
      mercadopago.payment.save(payment_data).then(async function (response) {
        if (response.status == 201 || response.status == 201){
          order.status = "PAID";
          let orderUpdated = await order.save();
        }
        res.send(response);
      });
      //res.status(200);
    } catch (error) {
        console.log("PayOrderMP", error);
        res.status(500).send(error);
    }
}

export default PayOrderMP;