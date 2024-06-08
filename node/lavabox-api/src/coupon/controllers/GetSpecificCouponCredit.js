import CouponCredit from 'models/couponCredit';
import GetUsers from 'helpers/getters/GetUsers';
import GetCouponCredit from 'helpers/getters/GetCouponCredit';

const GetSpecificCreditCoupon = async (req, res, next) => {
    let userId = req.userId;
    try {
        if(!req.params.couponCode) return res.status(400).send({type: "missing-couponCode", msg: 'You need to provider a couponCode'});
        const credit = await GetCouponCredit(req.params.couponCode, userId, true);
        if(!credit || credit.length === 0) return res.status(400).send({msg: "not have credit"});

        return res.status(200).send(credit);
    } catch (error) {
        console.log('GetSpecificCreditCoupon', error);
        res.status(500).send(error);
    }
}

export default GetSpecificCreditCoupon;