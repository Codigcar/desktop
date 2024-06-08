import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const buildingCouponAdmin = new Schema({
    _couponAdminId: {type: String, required: true},
    _buildingId: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const BuildingCouponAdmin = mongoose.model('buildingCouponAdmin', buildingCouponAdmin);

export default BuildingCouponAdmin;