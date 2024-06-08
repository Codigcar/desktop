import express from 'express';
import router_f from 'express-promise-router';
import CouponController from 'coupon/CouponController';
import BuildingCouponAdmin from 'BuildingCouponAdmin/BuildingCouponAdminController';

const router = router_f();

/*router.route('/admin')
    .post(CouponController.CreateCoupon);*/

router.route('/admin/:couponCode')
    .get(CouponController.GetSpecificCouponAdmin);

router.route('/admin/used/:couponId')
    .get(CouponController.GetSpecificUsedCouponAdmin);

router.route('/admin/used')
    .post(CouponController.CreateUsedCouponAdmin)

router.route('/user/search/:couponCode')
    .get(CouponController.GetSpecificCouponUser);

router.route('/user/used')
    .post(CouponController.UpdateCouponUser)

router.route('/user/generate')
    .get(CouponController.GetCouponUser);

router.route('/user/credit')
    .get(CouponController.GetCreditCoupon);

router.route('/user/credit/update')
    .post(CouponController.UpdateCredit)

router.route('/user/credit/:couponCode')
    .get(CouponController.GetSpecificCreditCoupon);

router.route('/user/couponAdminBuilding/:couponId')
    .get(BuildingCouponAdmin.GetBuildingCouponAdmin);

/*router.route('/user/couponAdminBuilding')
    .post(BuildingCouponAdmin.CreateBuildingCouponAdmin);*/

/*router.route('/user/credit')
    .post(CouponController.CreateCreditCoupon);*/


export default router;