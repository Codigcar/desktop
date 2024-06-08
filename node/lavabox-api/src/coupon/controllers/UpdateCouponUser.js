import CouponUser from 'models/couponUser';
import CouponCredit from 'models/couponCredit';
import GetCoupon from 'helpers/getters/GetCoupon';

export const UpdateCouponUser = async (req, res, next) => {
    let userId = req.userId;
    try {
        const {couponId, status, user} = req.body;
        console.log(req.body)
        const coupon = (await GetCoupon({_id: couponId}, 'user'))[0]; 
        console.log(coupon);
        if(!coupon) res.status(400).send({msg: "not-fount coupon"});

        if(!status && coupon.status) {
            let new_couponCreit = new CouponCredit({
                credit: 1000,
                code: GetCouponCode(7),
                status: true,
                _userId: user,
                userUsed: userId,
                createdAt: Date.now()
            });

            let newCouponCredit = await new_couponCreit.save();
            console.log("credit", newCouponCredit);
        }

        coupon.status = status;
        coupon.usedDate = Date.now();
        await coupon.save();
        
        res.status(200).send("coupon user updated")
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}
const GetCouponCode = (length) => {
    var result           = 'CRD';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


export default UpdateCouponUser