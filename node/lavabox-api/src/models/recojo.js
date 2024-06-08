import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recojoSchema = new Schema({
    _userAdminId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'useradmin'},
    id: {type: String, default: ''},
    day: {type: Date, default: Date.now},
    hour: {type: String, default: '00:00'},
    orders: {type: Array, default: []},
});

const Recojo = mongoose.model('recojo', recojoSchema);

export default Recojo;
