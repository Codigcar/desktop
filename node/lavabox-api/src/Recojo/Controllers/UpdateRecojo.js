import GetRecojo from 'helpers/getters/GetRecojos';

const UpdateRecojo = async (req, res, next) => {
    let userId = req.userId;
    try {
        const {orders} = req.body;
        console.log(orders);
        if(!req.params.recojoId) res.status(400).send({ type:'missing-recojoId', msg: 'You need to provide a recojoId' });
        const recojo = await GetOrders({ _id: req.params.recojoId}, 'id');
        if(orders) { recojo.orders = orders}

        let recojoUpdate = await recojo.save();

        return res.status(200).send({oldInfo: recojo, newInfo: recojoUpdate});
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

export default UpdateRecojo;