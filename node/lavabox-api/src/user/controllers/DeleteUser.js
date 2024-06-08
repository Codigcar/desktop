import User from 'models/user';
import GetUser from 'helpers/getters/GetUsers';

const DeleteUser = async(req,res,next) => {
    
    //DELETE A USER 
    try { 
        if(!req.params.userId) return res.status(400).send({ type:'missing-userId', msg: 'You need to provide a userId' });
        const userId = await GetUser({ _id: req.params.userId}, 'id');
        if(!userId) return res.status(400).send({ type: 'not-created or already deleted', msg: 'We are unable to find this order'});
        let userDeleted = await User.deleteOne({ "_id": userId._id});
        return res.status(200).send(userDeleted);
    } catch(error){
        return res.status(500).send(error);
    }
}

export default DeleteUser; 