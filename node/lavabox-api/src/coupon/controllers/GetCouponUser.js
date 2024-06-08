import CouponUser from 'models/couponUser';
import GetCoupon from 'helpers/getters/GetCoupon';

export const GetCouponUser = async (req, res,next) => {
    console.log("GetCouponUser");
    let userId = req.userId;
    try {
        console.log(userId);
        const coupons = await GetCoupon({_userId: userId, status: true}, 'user');
        console.log(coupons)
        if(!coupons || coupons.length === 0) {
            const new_coupon = new CouponUser({
                _userId: userId,
                couponCode: GetCouponCode(7),
                CreatedAt: Date.now(),
                status: true
            });

            const newCouponUser = await new_coupon.save();
            console.log(newCouponUser);
            return res.status(200).send(newCouponUser);
        } else {
            return res.status(200).send(coupons[0]);
        }
    } catch (error) {
        console.log("GetCouponUser", error);
        res.status(500).send(error);
    }
}

const GetCouponCode = (length) => {
    var result           = 'USR';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 export default GetCouponUser;