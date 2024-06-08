import UsedCouponAdmin from 'models/usedCouponAdmin';
import GetUsedCoupon from 'helpers/getters/GetUsedCoupon';

const GetSpecificUsedCouponAdmin = async (req, res, next) => {
    try {
        let userId = req.userId;
        if(!req.params.couponId) return res.status(400).send({type: 'missing-couponId', msg: 'You need to provider a couponId'});
        const usedCoupon = await GetUsedCoupon({_couponId: req.params.couponId, _userId: userId}, 'admin');
        if(!usedCoupon) return res.status(400).send({type: 'notCreated', msg: 'We are unable to find this used coupon'});

        return res.status(200).send(usedCoupon);
    } catch (error) {
        console.log('GetSpecificUsedCouponAdmin', error);
        return res.status(500).send(error);
    }
}

export default GetSpecificUsedCouponAdmin;