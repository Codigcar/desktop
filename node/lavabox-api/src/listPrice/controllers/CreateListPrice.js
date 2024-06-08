import ListPrice from 'models/listPrice';

const CreateListPrice = async (req, res, next) => {
    let userId = res.userId;
    const {clothes, status, name} = req.body;
    
    try {
        let new_listPrice = new ListPrice({
            name: name,
            status: true, 
            clothes: clothes
        });

        let newListPrice = await new_listPrice.save();
        console.log(newListPrice);
        return res.status(200).send({
            msg: "List Price created"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
} 

export default CreateListPrice;