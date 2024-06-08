import Prices from 'models/prices';

const CreatePrice = async (req, res, next) => {
    let userId = req.userId;
    const {name, price} = req.body;
    console.log(name, price);

    let new_price = await Prices({
        name: name,
        price: price
    });

    let newPrice = await new_price.save();
    return res.status(200).send({
        msg: 'Price created'
    });
}

export default CreatePrice;