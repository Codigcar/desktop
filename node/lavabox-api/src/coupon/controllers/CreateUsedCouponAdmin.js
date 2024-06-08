import UsedCouponAdmin from 'models/usedCouponAdmin';

const createUsedCouponAdmin = async (req, res, next) => {
    let userId = req.userId;

    const {_couponId, usedDate} = req.body;
    console.log(req.body);

    try {
        let new_usedCouponAdmin = new UsedCouponAdmin({
            _userId: userId,
            _couponId: _couponId,
            usedDate: usedDate
        });

        let newUsedCouponAdmin = await new_usedCouponAdmin.save();
        console.log(newUsedCouponAdmin);
        return res.status(200).send({
            msg: "usedCouponAdmin Created"
        });

    } catch (error) {
        console.log("usedCouponAdmin", error);
        res.status(500).send(error);
    }
}

export default createUsedCouponAdmin;