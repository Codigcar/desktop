import router_f from 'express-promise-router';
import PricesController from 'prices/PricesController';

const router = router_f();

router.route('/')
    .get(PricesController.GetPrices);
    
router.route('/')
    .post(PricesController.CreatePrice);

export default router;