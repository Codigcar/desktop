import GetCards from '../../helpers/getters/GetCards';
import GetUsers from "../../helpers/getters/GetUsers";
const CulqiService = require('../../services/culqi');

const UpdateCard = async(req, res, next) =>{
  try{
    let user =  await GetUsers(req.userId, 'id');
    let card = await GetCards(req.params.cardId, 'id');
    if(!card) return res.status(400).send("User has no card");
    if(card.email !== user.local.email) return res.status(400).send("User not allowed to update the card");

    const { token, createdAt, cardBrand, title } = req.body;
    const culqiCard = await CulqiService.updateCard(card.token, token, cardBrand)
    console.log(culqiCard)
    
    card.title = title
    card.fourDigits = culqiCard.source.last_four;
    card.email = user.local.email;
    card.userCreatedAt = createdAt;
    card.dbCreatedAt = Date.now();
    card.cardBrand = culqiCard.source.metadata.marca_tarjeta;
    
    let nCard = await card.save();
    res.status(200).send(nCard);
  }catch(error){
    res.status(403).json({status: false, message: error.message})
  }
}

export default UpdateCard;
