import express from 'express';
import router_f from 'express-promise-router';
import BuildingController from 'building/BuildingController';

const router = router_f();

router.route('/')
    .post(BuildingController.CreateBuilding);

router.route('/:buildingId')
    .put(BuildingController.UpdateBuilding)

export default router;