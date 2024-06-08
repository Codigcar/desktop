const fetch = require('node-fetch')
const baseUrl = process.env.CULQI_URL
const headers = {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${process.env.PRIVATE_KEY}`
}

//Token
const getToken = async (data) => {
	const resp = await fetch(`${baseUrl}/tokens`, { method: 'post', headers, body: JSON.stringify(data) });

	const response = await resp.json()
	if (resp.status === 200 || resp.status === 201) {
		return response
	} else {
		throw new Error(response.merchant_message)
	}
}

// Customer
const getAllCustomers = async () => {
	const resp = await fetch(`${baseUrl}/customers`, { method: 'get', headers });
	const response = await res.json();

	if (resp.status === 200 || resp.status === 201) {
		return response;
	} else {
		throw new Error(response.merchant_message)
	}
}

const findCustomer = async (email) => {
	try {
		const res = await fetch(`${baseUrl}/customers?email=${email}`, { method: 'GET', headers });

		if (res.status === 200 || res.status === 201) {
			const response = await res.json();
			return response.data[0];
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
	}
}

const createCustomer = async (item) => {
	const resp = await fetch(`${baseUrl}/customers`, {
		method: 'post',
		headers,
		body: JSON.stringify({
			first_name: item.firstName,
			last_name: item.lastName,
			email: item.email,
			address: `Direccion ${item.address}`,
			address_city: "Lima",
			country_code: "PE",
			phone_number: item.phone,
		})
	});

	if (resp.status === 200 || resp.status === 201) {
		return response;
	} else {
		console.error(response)
		throw new Error(response.merchant_message)
	}
}


// Card
const createCard = async (customerId, token, brand) => {
	const resp = await fetch(`${baseUrl}/cards`, {
		method: 'post',
		headers,
		body: JSON.stringify({
			customer_id: customerId,
			token_id: token,
			validate: true,
			metadata: { marca_tarjeta: brand }
		})
	});
	
	const response = await resp.json()
	if (resp.status === 200 || resp.status === 201) {
		return response;
	} else {
		console.error(response)
		throw new Error(response.merchant_message)
	}
}

const updateCard = async (cardId, token, brand) => {
	const resp = await fetch(`${baseUrl}/cards/${cardId}`, {
		method: 'patch',
		headers,
		body: JSON.stringify({
			token_id: token,
			metadata: { marca_tarjeta: brand }
		})
	});
	const response = await resp.json()

	if (resp.status === 200 || resp.status === 201) {
		return response
	} else {
		throw new Error(response.merchant_message)
	}
}

const deleteCard = async (cardId) => {
	try {
		const resp = await fetch(`${baseUrl}/cards/${cardId}`, { method: 'delete', headers });

		return resp.status === 200 || resp.status === 201 ? await resp.json() : false
	} catch (error) {
		return error;
	}
}

export default {
	getToken,
	getAllCustomers,
	findCustomer,
	createCustomer,
	createCard,
	updateCard,
	deleteCard
}
