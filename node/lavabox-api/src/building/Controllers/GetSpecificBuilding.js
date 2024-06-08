import Building from 'models/building';
import GetBuilding from 'helpers/getters/GetBuilding';

const GetSpecificBuilding = async(req, res, next) => {
    try {
        let buildingId = req.params.buildingId;
        console.log(buildingId);
        if(!req.params.buildingId) return res.status(400).send({ type:'missing-orderId', msg: 'You need to provide a buildingId' });

        // const building = await GetBuilding({_id:req.params.buildingId}, 'list', res);

        let building = false;
        if(buildingId[0] === 'B') {
            building = await GetBuilding({id: buildingId}, 'list', res);
            building = building[0];
            console.log("=>", building)
        } else {
            building = await GetBuilding({_id: buildingId}, 'id', res);
        }
        if(!building) res.status(400).send({ type: 'not-created', msg: 'We are unable to find this building'});

        return res.status(200).send(building);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export default GetSpecificBuilding;
