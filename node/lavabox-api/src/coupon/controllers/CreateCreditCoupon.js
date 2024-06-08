import CouponCredit from 'models/couponCredit';

const CreateCreditCoupon = async (req, res, next) => {
    let userId = req.userId;
    const {credit, code, status} = req.body;

    try {
        let new_credit = new CouponCredit({
            _userId: userId,
            credit: credit, 
            code: code, 
            status: status
        });

        let newCoupon = await new_credit.save();
        console.log(newCoupon);

        return res.status(200).send({
            msg: "Coupon created"
        })
    } catch (error) {
        console.log("CreateCoupon", error);
        res.status(500).send(error);
    }
}

export default CreateCreditCoupon;