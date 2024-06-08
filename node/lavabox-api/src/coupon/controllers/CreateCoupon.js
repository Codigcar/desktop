import CouponAdmin from 'models/couponAdmin';

const CreateCouponAdmin = async (req, res, next) => {
    let userId = req.userId;

    const {userName, couponCode, description, discount, createdAt, startDate, endDate, status} = req.body;
    console.log(req.body);
    try {
        let new_coupon = new CouponAdmin({
            userName: userName,
            couponCode: couponCode,
            description: description,
            discount: discount,
            createdAt: createdAt,
            startDate: startDate,
            endDate: endDate,
            status: status
        });

        let newCouponAdmin = await new_coupon.save();
        console.log(newCouponAdmin);
        return res.status(200).send({
            msg: "Coupon created"
        });

    } catch (error) {
        console.log("CreateCoupon", error);
        res.status(500).send(error);
    }
}

export default CreateCouponAdmin;