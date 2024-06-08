import GetListPrices from 'helpers/getters/GetListPrices';

const GetAllListPrices = async(req, res, next) => {
    try {
        let userId = req.userId;
        let listPrices = await GetListPrices({}, 'list', res);
        console.log(listPrices);
        if(!listPrices) {return res.status(400).send("List Price not fount");}
        return res.status(200).send(listPrices);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}

export default GetAllListPrices;