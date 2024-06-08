import Recojo from 'models/recojo';
import GetRecojos from 'helpers/getters/GetRecojos';

const GetUserRecojos = async (req, res, next) => {
	try {
		let recojos = await Recojo.find({}).sort({day: 'desc'}).exec();
		if (!recojos) return res.status(400).send("has not recojos in the data base");
		return res.status(200).send(recojos);
	} catch (error) {
		console.log(error);
		return res.status(403).send(error);
	}
}

export default GetUserRecojos;
