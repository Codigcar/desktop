import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const listPriceSchema = new Schema({
    name: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now},
    status: {type: Boolean, default: true},
    clothes: {type: Array, default: []}
});

const listPrice = mongoose.model('listPrice', listPriceSchema);

export default listPrice;