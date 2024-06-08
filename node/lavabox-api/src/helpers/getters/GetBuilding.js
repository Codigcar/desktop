import Building from 'models/building';

const GetBuilding = async (trails, type, res) => {
    var result;
    try {
        switch (type) {
            case 'id':
                result = await Building.findById(trails).exec();
                break;
            case 'list':
                result = await Building.find(trails).exec();
                break;
        }        
       return result;
    } catch (error) {
        console.log(error);
        return req.status(500).send(error);
    }
}

export default GetBuilding;