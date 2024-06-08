import User from '../../models/user';
const GetUsers = async (traits, type, res)=>{
  let result;
  try{
    switch (type) {
      case "id":
        result = await User.findById(traits).exec();
        break;
      case "list":
        result = await User.find(traits).exec();
        break;
      case "unique":
        result = await User.findOne(traits).exec();
        break;
    }
    return result;
  }
  catch (err) {
    return res.status(500).send("There is a problem in our System please check later")
  }
}

export default GetUsers;
