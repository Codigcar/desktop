import CouponAdmin from 'models/couponAdmin';
import CouponUser from 'models/couponUser';
import CouponCredit from 'models/couponCredit';

const GetCoupon = async (traits, type, res) => {
    console.log("helper>getcoupon", traits);
    var result;
    try {
        switch (type) {
            case 'admin':
                result = await CouponAdmin.find(traits).exec();
                break;
            case 'user':
                result = await CouponUser.find(traits).exec();
                console.log("user", result)  
                break;
            case 'credit':
                result = await CouponCredit.find(traits).exec();
                break;
            }
        console.log("GetCoupon", result);
        return result;
    } catch (error) {
        console.log("GetCoupon", error);
        return res.status(500).send("There is a problem in our System please check later");
    }
}

export default GetCoupon;