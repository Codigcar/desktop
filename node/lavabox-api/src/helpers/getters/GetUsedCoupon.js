import UsedCouponAdmin from 'models/usedCouponAdmin';

const GetUsedCoupon = async (traits, type, res) => {
    var result;
    try {
        switch (type) {
            case 'admin':
                result = await UsedCouponAdmin.find(traits).exec();
                break;
        
        }
        return result;
    } catch (error) {
        console.log("GetUsedCoupon", error);
        return res.status(500).send(error);
    }
}

export default GetUsedCoupon;