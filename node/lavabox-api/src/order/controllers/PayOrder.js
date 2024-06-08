import Order from "models/order";
import GetOrders from "../../helpers/getters/GetOrders";
import GetUsers from "../../helpers/getters/GetUsers";
import fetch from "node-fetch";
import Email from "email-templates";
import Config from "configs/config";
import culqi from "../../configs/culqi";
import {SaveLogInternalError} from "../../logError/controllers/CreateLogInternalError";

const sendMails = async (order, user) => {
	let typeService = "";
	if (order.services.seco) typeService += "Lavado al seco | ";
	if (order.services.planchado) typeService += "Lavado y planchado por peso | ";
	if (order.services.edredones) typeService += "Sabanas, cubrecamas y edredones";

	// email admin
	let emailFrom = "LavaBox <info@lavaboxlavanderia.com>";
	let email_admin = new Email({
		message: {
			from: emailFrom,
			to: Config.emailAdmin,
			subject: `Pago realizado – Edificio ${order.building}, código de operación: ${order._id}`,
		},
		send: true,
		transport: Config.transport,
	});

	await email_admin.send({
		template: "adminPaidOut",
		message: {to: Config.emailAdmin},
		locals: {
			code_operation: order.id,
			direction: order.building,
			userId: user.local.id,
			userName: user.local.firstName + " " + user.local.lastName,
			typeOrder: typeService,
			emailUser: user.local.email,
			deliveryDate: order.createdAt,
			price: order.price / 100,
		},
	});

	// email user
	let emailTitle = "¡Tu pago fue realizado con éxito!";
	let new_email = new Email({
		message: {from: emailFrom, subject: emailTitle, to: user.local.email},
		send: true,
		transport: Config.transport,
	});

	await new_email.send({
		template: "paid",
		message: {to: user.local.email},
		send: true,
		locals: {
			name: user.local.firstName + " " + user.local.lastName,
			price: order.price / 100,
			orderId: order.id,
			email: user.local.email,
		},
	});
}

const PayOrder = async (req, res, next) => {
	try {
		let {cardToken, price} = req.body;

		if (!cardToken)
			return res.status(400).send({type: "missing-payment-method", msg: "You need to provide a payment method"});
		if (!price) return res.status(400).send({type: "missing-price", msg: "You need to provide a price"});
		if (!req.params.orderId) return res.status(400).send({type: "missing-userId", msg: "You need to provide a userId"});

		const order = await GetOrders(req.params.orderId, "id");
		let user = await GetUsers(req.userId, "id");
		if (!user) return res.status(400).send({type: "no-user", msg: "There is no user"});

		const paymentBody = {
			amount: price,
			currency_code: "PEN",
			email: user.local.email,
			source_id: cardToken,
		};

		const urlCulqi = "https://api.culqi.com/v2/charges";
		const response = await fetch(urlCulqi, {
			method: "POST",
			headers: {"Content-Type": "application/json", Authorization: `Bearer ${culqi.private_key}`},
			body: JSON.stringify(paymentBody),
		});

		const responseJson = await response.json();
		if (response.status === 200 || response.status === 201) {
			order.price = price;
			order.status = "PAID";
			order.payed = true;
			await order.save();
			await sendMails(order, user)

			res.status(200).send({type: "order-paid", msg: "Tu orden fue pagada"});
		} else {
			await SaveLogInternalError({
				file: "PayOrder.js",
				functionName: "PayOrder",
				type: "culqi",
				info: responseJson,
				status: response.status,
			});
			res.status(500).send(responseJson);
		}
	} catch (e) {
		console.log(e)
		await SaveLogInternalError({
			file: "PayOrder.js",
			functionName: "PayOrder",
			type: "internal",
			info: error,
		});
		res.status(500).send(error);
	}
};

export default PayOrder;
