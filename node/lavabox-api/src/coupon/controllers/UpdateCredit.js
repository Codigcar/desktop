import CouponCredit from 'models/couponCredit';
import GetCoupon from 'helpers/getters/GetCoupon';


const UpdateCredit = async (req, res, next) =>{
    let userId = req.userId;
    try {
        const {couponId, status} = req.body;
        const credit = (await GetCoupon({_id: couponId, status: true}, 'credit'))[0];
        console.log("credit", credit);
        if(!credit) res.status(400).send({msg: "not-fount credit"});
        credit.status = status;
        credit.usedDate = Date.now();
        await credit.save();
        res.status(200).send("credit updated");
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

export default UpdateCredit;