import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UsedCouponSchema = new Schema({
    _userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    _couponId: {type: mongoose.Schema.Types.ObjectId, required: true},
    usedDate: {type: Date, default: Date.now, required: true}
});

const UsedCoupon = mongoose.model('usedCouponAdmin', UsedCouponSchema);

export default UsedCoupon;