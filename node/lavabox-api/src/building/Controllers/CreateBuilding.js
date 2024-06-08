import Building from 'models/building';
import GetBuilding from 'helpers/getters/GetBuilding';


const createBuilding = async (req, res, next) => {
    let userId = req.userId;
    const {name, direction, status, listPriceId, numDep} = req.body;
    
    const buildRepeat = await GetBuilding({name: name}, 'list', res);

    if(!buildRepeat) {return res.status(400).send("name of building exist")}
    
    var id = '';
    let lastBuilding = await Building.find({}).sort({_id:-1}).limit(1);
    
    if(lastBuilding.length>0) {
        let parseLetter = (lastBuilding[0].id).substr(0,1);
        let parseNumber = parseInt((lastBuilding[0].id).substr(1,4));
        console.log(parseLetter, parseNumber);
        if(parseNumber === 9999) {
            //console.log("cambio de letra");
            let newLetter = getSequenceLetter(parseLetter);
            
            id = newLetter+'0001';
        } else {
            //console.log("incrementar numero");
            let increment = parseNumber + 1;
            //console.log("increment", increment);
            let idx = 4 - ((increment.toString()).length);
            let ceros = '';
            for (let index = 0; index < idx; index++) {
                ceros = ceros + '0';
            }
            id = parseLetter+ceros+increment;
        }
    } else {
        id ='B0001';
    }
    
    try {
        let new_building = new Building({
            name: name,
            direction: direction,
            status: status,
            _listPriceId: listPriceId,
            numDep: numDep,
            id: id
        });

        let newBuilding = await new_building.save();
        console.log(newBuilding)
        return res.status(200).send({
            msg: "Building created"
        });
    } catch (error) {
        console.log("create building", error);
        res.status(500).send(error);
    }
}

const getSequenceLetter = (letter) => {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let change;
    let sequenceLetter =[] ;
    if(letter[1] === 'Z'){
        sequenceLetter = ['0', 'Z']
        change = 0;
    } else {
        sequenceLetter = ['A', '0']
        change = 1;
    }
    for (let i = 0; i < letters.length; i++) {
        if(letters[i] === letter[change]) {
            console.log(letters[i])
            if(i < letters.length - 1) {
                sequenceLetter[change] = letters[i+1];
            } 
        }
    }

    return sequenceLetter[0]+sequenceLetter[1];
}

export default createBuilding;