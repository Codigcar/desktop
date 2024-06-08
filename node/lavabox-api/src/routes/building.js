import express from 'express';
import router_f from 'express-promise-router';
import BuildingController from 'building/BuildingController';

const router = router_f();

router.route('/')
    .get(BuildingController.GetBuilding);

router.route('/:buildingId')
    .get(BuildingController.GetSpecificBuilding);

export default router;