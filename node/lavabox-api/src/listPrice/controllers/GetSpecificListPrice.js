import ListPrice from 'models/listPrice';
import GetListPrices from 'helpers/getters/GetListPrices';

const GetSpecificListPrice = async(req, res, next) =>{
    try {
        if(!req.params.listPriceId) return res.status(400).send({ type:'missing-listPriceId', msg: 'You need to provide a listPriceId' }) 
        
        const listPrice = await GetListPrices({_id: req.params.listPriceId}, 'id', res);
        if(!listPrice) return res.status(400).send({ type: 'not-created', msg: 'We are unable to find this list price'});
        
        return res.status(200).send(listPrice);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

export default GetSpecificListPrice;