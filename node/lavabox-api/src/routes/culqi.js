import router_f from 'express-promise-router';
const router = router_f();
import CulqiController from '../controllers/culqi.controller';


router.route('/token').post(CulqiController.getToken);
router.route('/customers').get(CulqiController.getAllCustomers)

export default router;