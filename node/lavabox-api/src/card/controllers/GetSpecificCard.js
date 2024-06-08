import GetCards from 'helpers/getters/GetCards';
import GetUsers from 'helpers/getters/GetUsers';

const GetSpecificCard = async(req, res, next) =>{
  try{
    let userId = req.userId;
    let cardId = req.params.cardId;
    console.log(userId, cardId);
    let user =  await GetUsers(userId, 'id');
    let card = await GetCards(cardId, 'id');
    if(!card) return res.status(400).send("User has no cards");
    console.log(user, card);
    if(card.email != user.local.email) return res.status(400).send("User not allowed to get the card");
    console.log(user, card);
    return res.status(200).send(card);
  }catch(error){
    console.log(error);
    return res.status(403).send("Error");
  }
}

export default GetSpecificCard;
