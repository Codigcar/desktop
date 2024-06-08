import GetBuildingCouponAdmin from 'helpers/getters/GetBuildingCouponAdmin';
import GetUsers from 'helpers/getters/GetUsers';

const GetCouponAdminforBuilding = async (req, res, next) => {
    try {
        let userId = req.userId;
        console.log("userId >", userId)
        let user = await GetUsers({_id: userId},'id');
        if(!user) return res.status(400).send({msg: 'user not found'});
        console.log("user", user);

        const couponId = req.params.couponId;
        console.log("couponId", couponId)
        //console.log(req);
        if(!couponId) return res.status(400).send({msg: 'Coupon id requires'});

        const buildingCouponAdmin = await GetBuildingCouponAdmin({_couponAdminId: couponId, _buildingId: user.local.buildingId});
        console.log(buildingCouponAdmin);
        if(buildingCouponAdmin.length === 0) return res.status(404).send({type: 'not-fount-buildingCoupon', msg: 'Building coupon not fount'});

        return res.status(200).send(buildingCouponAdmin);
    } catch (error) {
        console.log("GetCouponAdminforBuilding");
        console.log(error);
        res.status(500).send("Error");
    }
}

export default GetCouponAdminforBuilding;