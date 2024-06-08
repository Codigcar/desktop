import ListPrice from 'models/listPrice';

const GetListPrices = async (trails, type, res )=> {
    var result;
    try {
        switch (type) {
            case 'id':
                result = await ListPrice.findById(trails).exec();
                break;
            case 'list':
                result = await ListPrice.find(trails).sort([['createdAt', "-1"]]);
            default:
                break;
        }
        return result;
    } catch (error) {
        return res.status(500).send("There is problem in our system");
    }
}

export default GetListPrices;