import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _userId : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    id: {type: String, default: ''},
    services: {
        seco: {  type: Boolean, default: false  },
        planchado: {  type: Boolean, default: false },
        edredones:{  type: Boolean, default: false },
        calzado:{  type: Boolean, default: false },
    },
    instructions: { type: String , default: ""},
    commentsAdmin: { type: Array, default: []},
    locker: { type: Number , default: 1},
    createdAt: { type: Date, required: true, default: Date.now },
    status: { type: String, default: "REQUESTED" },
    price: {type: Number, default: 0},
    paymentId: { type: String, default: "" },
    cardId: { type: String, default: "" },
    password: { type: String, default: "0000" },
    payed: { type: Boolean, default: false },
    deliveryDate: {type: Date, default: Date.now},
    district: {type: String, default: 'San Miguel'},
    building: {type: String, default: 'Alto San Miguel'},
    aditionalComment: {type: String, default: ''},
    totalGarments: {type: Number, default: 0},
    assigned: {type: Boolean, default: false}
});

const Order = mongoose.model('order', orderSchema);

export default Order;
