const Card = require('../../models/card');
const GetCards = async (traits, type, res)=>{
  let result;
  try{
    switch (type) {
      case "id":
        result = await Card.findById(traits).exec();
        break;
      case "list":
        result = await Card.find(traits).exec();
        break;
      case "unique":
        result = await Card.findOne(traits).exec();
        break;
    }
    return result;
  }
  catch (err) {
    return res.status(500).send("There is a problem in our System please check later")
  }
}

module.exports = GetCards;
