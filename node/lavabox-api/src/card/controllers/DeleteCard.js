import GetCards from 'helpers/getters/GetCards';
import GetUsers from 'helpers/getters/GetUsers';
const CulqiService = require('../../services/culqi')

const DeleteCard = async (req, res, next) => {
	try {
		let userId = req.userId;
		const cardId = req.params.cardId;

		let user = await GetUsers(userId, 'id');
		let card = await GetCards(cardId, 'id');
		if (!card) return res.status(400).send("User has no card");
		if (card.email !== user.local.email) return res.status(400).send("User not allowed to update the card");

		await CulqiService.deleteCard(card.token)
		await card.deleteOne();

		res.status(200).send({status: true, msg: 'Card Deleted!'});
	}catch (e) {
		res.status(403).send({status: false, msg: e.message});
	}
}

export default DeleteCard;
