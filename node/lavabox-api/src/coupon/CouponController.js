import CreateCoupon from './controllers/CreateCoupon';
import GetSpecificCouponAdmin from './controllers/GetSpecificCouponAdmin';
import GetSpecificUsedCouponAdmin from './controllers/GetSpecificUsedCouponAdmin';
import CreateUsedCouponAdmin from './controllers/CreateUsedCouponAdmin';
import GetCouponUser from './controllers/GetCouponUser';
import GetCreditCoupon from './controllers/GetCouponCredit';
import CreateCreditCoupon from './controllers/CreateCreditCoupon';
import GetSpecificCouponUser from './controllers/GetSpecificCouponUser';
import GetSpecificCreditCoupon from './controllers/GetSpecificCouponCredit';
import UpdateCouponUser from './controllers/UpdateCouponUser';
import UpdateCredit from './controllers/UpdateCredit';

const CouponController = {
    CreateCoupon: CreateCoupon,
    GetSpecificCouponAdmin: GetSpecificCouponAdmin,
    GetSpecificUsedCouponAdmin: GetSpecificUsedCouponAdmin,
    CreateUsedCouponAdmin: CreateUsedCouponAdmin,
    GetCouponUser: GetCouponUser,
    GetCreditCoupon: GetCreditCoupon,
    GetSpecificCouponUser: GetSpecificCouponUser,
    GetSpecificCreditCoupon: GetSpecificCreditCoupon,
  //  CreateCreditCoupon: CreateCreditCoupon
    UpdateCouponUser: UpdateCouponUser,
    UpdateCredit: UpdateCredit
}

export default CouponController;