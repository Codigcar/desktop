import Prices from 'models/prices';

const GetPrice = async (trails, type, res) => {
    var result;
    try {
        switch (type) {
            case 'id':
                result = await Prices.findById(trails).exec();
                break
            case 'list':
                result = await Prices.find({});
            case 'unique':
                result = await Prices.findOne(trails).exec();
        }

        return result
    } catch (error) {
        return res.status(403).send(error);
    }
}

export default GetPrice;