import GetCards from '../../helpers/getters/GetCards';
import GetUsers from "../../helpers/getters/GetUsers";
import Card from '../../models/card';
import CulqiService from '../../services/culqi';

const CreateCard = async (req, res, next) => {
	try {
		let userId = req.userId;
		const {token, createdAt, cardBrand, title} = req.body;
		let user = await GetUsers({_id: userId}, 'id');
		if (!user) return res.status(404).send({type: 'not-found-user', msg: 'User not found'});
		if (!user.local.isVerified) return res.status(403).send({
			type: 'not-verified',
			msg: 'Your account has not been verified.'
		});

		if (!user.local.customer_id) {
			const findCustomer = await CulqiService.findCustomer(user.local.email);

			if (!findCustomer) {
				const culqiCustomer = await CulqiService.createCustomer(user.local)
				user.local.customer_id = culqiCustomer.id;
			} else {
				user.local.customer_id = findCustomer.id;
			}
			user = await user.save();
		}

		const culqiCard = await CulqiService.createCard(user.local.customer_id, token, cardBrand)
		console.log(culqiCard)
		const validateDuplicateCard = await GetCards({token: culqiCard.id, email: user.local.email}, 'list');
		if (!!validateDuplicateCard.length) return res.status(409).send({ type: 'duplate-card', msg: 'Duplicate card.' });

		const itemCard = new Card({
			token: culqiCard.id,
			email: user.local.email,
			title: title,
			fourDigits: culqiCard.source.last_four,
			cardBrand: culqiCard.source.metadata.marca_tarjeta,
			createdAt: createdAt,
			dbCreatedAt: Date.now()
		});

		const card = await itemCard.save();
		res.status(200).send(card);
	} catch (error) {
		res.status(403).json({status: false, message: error.message})
	}
}

export default CreateCard;
