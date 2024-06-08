const fetch = require('node-fetch')

async function createSale({
  items,
  total,
  subtotal,
  customer,
  tax_total,
  invoice_type,
}) {
  let response = await fetch(
    process.env.SIMPLEFACT_API_URL + '/v1/sales/orders',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + process.env.SIMPLEFACT_PRIVATE_KEY,
      },
      body: JSON.stringify({
        items: items,
        currency: 'PEN',
        total,
        tax_total,
        subtotal,
        invoice_type,
        date: new Date(),
        customer_address: customer.address,
        customer_document_number: customer.document_number,
        customer_document_type: customer.document_type,
        customer_name: customer.name,
      }),
    },
  )
  let r = await response.json()
  return r
}

module.exports = {
  createSale,
}
