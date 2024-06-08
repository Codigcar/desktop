import GetRecojo from 'helpers/getters/GetRecojos';

const GetSpecificRecojo = async(req, res, next) => {
    try {
        if(!req.params.recojoId) return res.status(400).send({ type:'missing-recojoId', msg: 'You need to provide a recojoId' });
       console.log(req.params.recojoId);
        const recojo = await GetRecojo({_id: req.params.recojoId}, 'id', res);
        if(recojo) return res.status(400).send({ type: 'not-created', msg: 'We are unable to find this recojo'});
        
        return res.status(200).send(recojo);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}
export default GetSpecificRecojo;