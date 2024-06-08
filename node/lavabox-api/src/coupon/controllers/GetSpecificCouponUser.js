import CouponUser from 'models/couponUser';
import GetCoupon from 'helpers/getters/GetCoupon';

const GetSpecificCouponUser = async (req, res, next) => {
    try {
        let userId = req.userId;
        if(!req.params.couponCode) return res.status(400).send({type: "missing-couponCode", msg: 'You need to provider a couponCode'});
        const coupon = await GetCoupon({couponCode: req.params.couponCode, status: true}, 'user');
        
        if(!coupon) return res.status(400).send({type: 'notcreated', msg: 'We are unable to find this cupon'});
        return res.status(200).send(coupon);
    } catch (error) {
        consolelog(error);
        req.status(500).send(error);
    }
}

export default GetSpecificCouponUser;