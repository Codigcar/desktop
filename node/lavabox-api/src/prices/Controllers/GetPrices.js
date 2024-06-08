import GetPrices from 'helpers/getters/GetPrices';
import Prices from 'models/prices';

const GetClothesPrice = async (req, res, next) => {
    try {
        let userId = req.userId;
        console.log("userId >", userId)
        let prices_ = await Prices.find({});
       // console.log("prices", prices_);
        if(!prices_) return res.status(400).send("has not prices in the data base");
        return res.status(200).send(prices_);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error);
    }
}

export default GetClothesPrice;