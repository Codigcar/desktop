import User from 'models/user';
import GetUser from 'helpers/getters/GetUsers';

const GetSpecificUser = async(req,res,next) => {
    // Get an specific user by entering the ID

    try {
        if(!req.params.userId) return res.status(400).send({ type:'missing-userId', msg: 'You need to provide a userId' });
        const userId = await GetUser({ _id: req.params.userId}, 'id');
        if(!userId) return res.status(400).send({ type: 'not-created', msg: 'We are unable to find this user'});

        return res.status(200).send(userId);
    } catch(error) { 
        return res.status(500).send(error);
    }
}

export default GetSpecificUser; 