import express from 'express';
import router_f from 'express-promise-router';
import UserController from 'user/UserController';

const router = router_f();

router.route('/')
    .get(UserController.GetUsers);

router.route('/:userId')
    .get(UserController.GetSpecificUser);

router.route('/:userId')
    .put(UserController.UpdateUser);

router.route('/:userId')
    .delete(UserController.DeleteUser);

export default router;