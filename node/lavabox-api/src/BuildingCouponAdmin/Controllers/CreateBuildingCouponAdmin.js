import BuildingCouponAdmin from 'models/buildingCouponAdmin';


const createBuildingCouponAdmin = async (req, res, next) => {
    try {
        let new_buildingCouponAdmin = new BuildingCouponAdmin({
            _couponAdminId: 'CA001',
            _buildingId: 'B0001',
            createdAt: Date.now()
        });

        let newBuildingCouponAdmin = await new_buildingCouponAdmin.save();
        console.log(newBuildingCouponAdmin);
        return res.status(200).send({
            msg: 'BuildingCouponAdin created'
        })
    } catch (error) {
        console.log("error create BuildingCouponAmin");
        console.log(error)
        res.status(500).send(error);
    }
}

export default createBuildingCouponAdmin;