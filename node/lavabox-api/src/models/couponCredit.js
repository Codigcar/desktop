import mongoose from 'mongoose';
import CouponUser from './couponUser';
const Schema = mongoose.Schema;

const couponCreditSchema = new Schema({
    _userId: {type: String, required: true},
    userUsed: {type: Schema.Types.ObjectId, required: true, ref: 'users'},
    credit: {type: Number, default: 1000, required: true},
    code: {type: String, default: '', required: true},
    usedDate: {type: Date, default: Date.now },
    status: {type: Boolean, required: true, default: true},
    createdAt: {type: Date, required: true, default: Date.now}
});

const CouponCredit = mongoose.model('couponCredit', couponCreditSchema);

export default CouponCredit;