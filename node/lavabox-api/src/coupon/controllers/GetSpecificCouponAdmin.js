import CouponAdmin from 'models/couponAdmin';
import GetCoupon from 'helpers/getters/GetCoupon';

const GetSpecificCouponAdmin = async (req, res, next) => {
    try {
        if(!req.params.couponCode) return res.status(400).send({type: "missing-couponCode", msg: 'You need to provider a couponCode'});
        const coupon = await GetCoupon({couponCode: req.params.couponCode, status: true}, 'admin');
        if(!coupon) return res.status(400).send({type: 'notcreated', msg: 'We are unable to find this cupon'});
        
        //console.log(coupon)
        return res.status(200).send(coupon);
    } catch (error) {
        console.log("GetSpecificCouponAdmin", error);
        return res.status(500).send(error)
    }
    
}

export default GetSpecificCouponAdmin;