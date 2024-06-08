import Order from '../../models/order';

const GetOrder = async (traits, type, res) => {
	let result
	try {
		switch (type) {
			case "id":
				result = await Order.findById(traits).exec();
				break;
			case "list":
				result = await Order.find(traits).sort([["createdAt", "-1"]]).exec();
				break;
			case "unique":
				result = await Order.findOne(traits).exec();
				break;
		}
		return result;
	} catch (err) {
		return res.status(500).send(err)
	}
}

export default GetOrder;
