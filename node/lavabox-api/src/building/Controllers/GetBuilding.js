import GetBuilding from 'helpers/getters/GetBuilding';

const GetAllBuilding = async (req, res, next) => {
    let userId = req.userId;
    try {
        let building = await GetBuilding({},'list', res);
        if(!building) return  res.status(400).send({msg: "not have building"});

        return res.status(200).send(building);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

export default GetAllBuilding;