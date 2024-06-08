import router_f from 'express-promise-router';
import RecojoController from 'Recojo/RecojoController';

const router = router_f();

router.route('/')
    .get(RecojoController.GetRecojos);

router.route('/search/:recojoId')
    .get(RecojoController.GetSpecificRecojo);

router.route('/generateId')
    .get(RecojoController.GetRecojoId);

router.route('/')
    .post(RecojoController.CreateRecojo);

router.route('/:recojoId')
    .put(RecojoController.UpdateRecojo);

export default router;
