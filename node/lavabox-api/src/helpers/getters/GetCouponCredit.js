import CouponCredit from 'models/couponCredit';

const GetCreditCoupon = async (code, userId, status, res) => {
    try {
        let result;
        if(code) {
            result = await CouponCredit.aggregate([{
                $lookup: {
                    from: "users", // collection name in db
                    localField: "userUsed",
                    foreignField: "_id",
                    as: "user"
                }},
                {
                    $match: { code: code} ,
                    $match: { _userId: userId} ,
                    $match: {status: status}
                }]).exec();
    
            console.log(result)
            return result;   
        } else{
            result = await CouponCredit.aggregate([{
            $lookup: {
                from: "users", // collection name in db
                localField: "userUsed",
                foreignField: "_id",
                as: "user"
            }},
            {
                $match: {_userId: userId},
              //  $match: {status: status}
            },
            {
                $match: {status: status}
            }
        ]).exec();

        //console.log(result)
        return result;
        }
    } catch (error) {
        console.log("GetCoupon", error);
        return res.status(500).send("There is a problem in our System please check later");
    }
}

export default GetCreditCoupon;