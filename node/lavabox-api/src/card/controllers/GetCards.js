import GetCards from 'helpers/getters/GetCards';
import GetUsers from 'helpers/getters/GetUsers';

const GetUserCards = async(req, res, next) =>{
  try{
    let userId = req.userId;
    let user =  await GetUsers(userId, 'id');
    let cards = await GetCards({ email: user.local.email }, 'list');
    if(!cards) return res.status(400).send("User has no cards");
    return res.status(200).send(cards);
  }catch(error){
    console.log(error);
    return res.status(403).send("Error");
  }
}

export default GetUserCards;
