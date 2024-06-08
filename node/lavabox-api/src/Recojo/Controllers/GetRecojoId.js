import Recojo from 'models/recojo';
import GetRecojos from 'helpers/getters/GetRecojos';

const GetRecojoId = async(req, res, next) => {
    try {
        let userId = req.userId;
        console.log("userId >", userId)

        let recojos = await Recojo.find({}).sort({_id:-1}).limit(1);;
        if(recojos.length === 0) return res.status(200).send({id: 1});

        console.log(recojos);
        let lastId = parseInt(recojos[0].id);
        let id =  lastId+1;
        return res.status(200).send({id: id});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}
export default GetRecojoId;