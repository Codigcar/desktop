let createPay = (paypal, payment) => {
  return new Promise((resolve, reject) => {
    paypal.payments.create(payment, function (err, payment) {
      if (err) {
        reject(err)
      } else {
        resolve(payment)
      }
    })
  })
}

module.exports = {
  createPay,
}
