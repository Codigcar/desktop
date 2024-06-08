import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pricesSchema = new Schema({
    name: {type: String, default: ''},
    price: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now} 
});

const Prices = mongoose.model('prices', pricesSchema);

export default Prices;