import { Router } from 'express';
import router_f from 'express-promise-router';
import ListPriceController from 'listPrice/listPriceController';

const router = router_f();

router.route('/').
    get(ListPriceController.GetListPrice);

router.route('/')
    .post(ListPriceController.CreateListPrice);

router.route('/:listPriceId')
    .put(ListPriceController.UpdatedListPrice);

router.route('/:listPriceId')
    .get(ListPriceController.GetSpecificListPrice);

export default router;