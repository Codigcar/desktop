import GetBuilding from 'helpers/getters/GetBuilding';

const UpdateBuilding = async (req, res, next) => {
    let userId = req.userId;
    try {
        const {name, direction, status, listPriceId, numDep} = req.body;
        if(!req.params.buildingId) {return res.status(400).send({type: 'missing-building', msg: 'You need provide a buildingId'})}
        
        let building = await GetBuilding({_id: req.params.buildingId}, 'id', res);
        //console.log(building)
        if(!building) {return res.status(400).send("building not fount")}
        
        if(name) {building.name = name;}
        if(direction) {building.direction = direction;}
        if(status) {building.status = status;}
        if(listPriceId) {building._listPriceId = listPriceId}
        if(numDep>0) {building.numDep = numDep}
        console.log(building)
        let buildingUpdated = await building.save();

        console.log(buildingUpdated);
        return res.status(200).send( {
            msg: "Building updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("UpdateBuilding error");
    }
}

export default UpdateBuilding;