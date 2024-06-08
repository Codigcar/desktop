import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    id: {type: String, default: ''},
    name: {type: String, required: true, default: ''},
    direction: {type: String , required: true, default: ''},
    createdAt: {type: Date, default: Date.now},
    status: {type: Boolean, default: true},
    _listPriceId: {type: String, default: ''},
    numDep: {type: Number, default: 0}
});

const Building = mongoose.model('building', buildingSchema);

export default Building;