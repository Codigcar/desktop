import User from 'models/user'; 

const GetUsers = async(req,res,next) => { 
    let users = await User.find({});

    /*const userMap = {}; 
    users.forEach((user) =>{
        userMap[user._id] = user;
    });*/
    return res.status(200).send(users);
}

export default GetUsers;