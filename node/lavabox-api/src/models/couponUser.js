import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const couponUserSchema = new Schema({
    _userId: {type: mongoose.Schema.Types.ObjectId, required: true, reference: 'users'},
    couponCode: {type: String, default: '', required: true},
    description: {type: String, default: ''},
    discount: {type: Number, default: 1000, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
    usedDate: {type: Date, default: Date.now},
    status: {type: Boolean, required: true, default: true}
});

const CouponUser = mongoose.model('couponUser', couponUserSchema);

export default CouponUser;

