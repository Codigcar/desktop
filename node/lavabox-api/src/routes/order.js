import express from 'express';
import router_f from 'express-promise-router';
import OrderController from '../order/OrderController';

const router = router_f();

router.route('/').get(OrderController.GetOrders);
router.route('/all').get(OrderController.GetAllOrders);
router.route('/unassigned').get(OrderController.GetOrdersUnAssigned);
router.route('/:orderId').get(OrderController.GetSpecificOrder);
router.route('/').post(OrderController.CreateOrder);
router.route('/pay/:orderId').post(OrderController.PayOrder);
router.route('/payMp').post(OrderController.PayOrderMP);
router.route('/:orderId').put(OrderController.UpdateOrder);
router.route('/:orderId').delete(OrderController.CancelOrder);

export default router;
