import BuildingCouponAdmin from 'models/buildingCouponAdmin';

const GetBuildingCouponAdmin = async (trails, req, res, next) => {
    var result;

    try {
        result = await BuildingCouponAdmin.find(trails).exec();
        return result;
    } catch (error) {
        console.log(error);
        return res.status(500).send('There is a problem in our System please check later');
    }
}

export default GetBuildingCouponAdmin;
