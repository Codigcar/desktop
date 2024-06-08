import CouponCredit from 'models/couponCredit';
import GetUsers from 'helpers/getters/GetUsers';
import GetCouponCredit from 'helpers/getters/GetCouponCredit';

const GetCreditCoupon = async (req, res, next) => {
    let userId = req.userId;
    try {
        console.log(userId);
        const credit = await GetCouponCredit(undefined, userId, true);
        if(!credit || credit.length === 0) return res.status(400).send({msg: "not have credit"});

        return res.status(200).send(credit);
    } catch (error) {
        console.log('GetCreditCoupon', error);
        res.status(500).send(error);
    }
}

export default GetCreditCoupon;