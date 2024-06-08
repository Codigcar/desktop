import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const CouponAdminSchema = new Schema({
    userName: {type: String, default: ""},
    couponCode: {type: String, default: "HolaLavabox", required: true},
    description: {type: String, default: ""},
    discount: {type: Number, default: 20},
    createdAt: {type: Date, default: Date.now},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    status: {type: Boolean, default: true}
});

const CouponAdmin = mongoose.model('couponAdmin', CouponAdminSchema);

export default CouponAdmin;