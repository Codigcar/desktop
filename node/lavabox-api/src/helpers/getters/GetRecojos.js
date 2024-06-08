import Recojo from 'models/recojo';

const GetRecojo = async (trails, type, res) => {
    var result;
    try {
        switch (type) {
            case 'id':
                result = await Recojo.findById(trails).exec();
                break
            case 'list':
                result = await Recojo.find(trails).sort([["createdAt", "-1"]]).exec();
            case 'unique':
                result = await Recojo.findOne(trails).exec();
        }

        return result
    } catch (error) {
        return res.status(403).send(error);
    }
    
}

export default GetRecojo;
