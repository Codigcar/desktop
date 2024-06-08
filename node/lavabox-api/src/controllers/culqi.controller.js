import CulqiService from '../services/culqi'

const getToken = async (req, res) => {
  try {
    const token = await CulqiService.getToken(req.body)
    return res.status(200).send({ status: true, token_id: token.id });
  } catch (e) {
    console.log(e)
    return res.status(403).json({ status: false, message: e.message })
  }
}

const getAllCustomers = async (req, res) => {
  try {
    const data = await CulqiService.getAllCustomers()
    return res.status(200).send({ status: true, ...data });
  } catch (e) {
    console.log(e)
    return res.status(403).json({ status: false, message: e.message })
  }
}

export default {
  getToken,
  getAllCustomers
}