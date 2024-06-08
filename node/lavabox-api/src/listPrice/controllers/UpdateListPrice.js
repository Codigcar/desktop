import GetListPrice from 'helpers/getters/GetListPrices';

const UpdateListPrice = async (req, res, next) => {
    let userId = req.userId;
    try {
        const {status, name, clothes} = req.body;
        console.log(status, name, clothes)
        if(!req.params.listPriceId) {return res.status(400).send({type: 'missing-listPriceId', msg: 'You need provide a listPriceId'})}
        const listPrice = await GetListPrice({_id: req.params.listPriceId}, 'id', res);
        if(!listPrice) {return await res.status(400).send("ListPrice not found")}
        
        if(name) {listPrice.name = name;}
        if(status) {listPrice.status = status;}
        if(clothes && clothes.length>0) {listPrice.clothes = clothes;}
        let listPriceUpdated = await listPrice.save();
        console.log(listPriceUpdated);
        return res.status(200).send({
            msg: "List price updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}

export default UpdateListPrice;