import GetOrders from "./controllers/GetOrders";
import GetSpecificOrder from "./controllers/GetSpecificOrder";
import UpdateOrder from "./controllers/UpdateOrder";
import CancelOrder from "./controllers/CancelOrder";
import CreateOrder from "./controllers/CreateOrder";
import PayOrder from "./controllers/PayOrder";
import PayOrderMP from './controllers/PayOrderMP';
import GetOrdersUnAssigned from './controllers/GetOrdersUnAssigned';
import GetAllOrders from './controllers/GetAllOrders';

const OrderController =  {
  GetOrders: GetOrders,
  GetAllOrders: GetAllOrders,
  GetSpecificOrder: GetSpecificOrder,
  UpdateOrder: UpdateOrder,
  CancelOrder: CancelOrder,
  CreateOrder: CreateOrder,
  PayOrder: PayOrder,
  PayOrderMP: PayOrderMP,
  GetOrdersUnAssigned: GetOrdersUnAssigned
}

export default OrderController;
