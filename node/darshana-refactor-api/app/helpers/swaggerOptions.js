const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Darshana API',
      version: '1.0.0',
      description: 'Darshana API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: process.env.WEB_URL,
      },
    ],
  },
  basePath: '/',
  apis: [`./app/router.js`],
}

module.exports = {
  options: options,
}
