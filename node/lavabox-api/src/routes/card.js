import express from 'express';
import router_f from 'express-promise-router';
import CardController from '../card/CardController';
const router = router_f();

import  { validateBody, schemas } from '../helpers/routeHelpers';


router.route('/')
    .get(CardController.GetCards);

router.route('/')
    .post(validateBody(schemas.cardSchema), CardController.CreateCard);

router.route('/:cardId')
    .get(CardController.GetSpecificCard);

router.route('/:cardId')
    .put(validateBody(schemas.cardSchema), CardController.UpdateCard);

router.route('/:cardId')
    .delete(CardController.DeleteCard);

export default router;
