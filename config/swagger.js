const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    info: {
      title: 'Ecommerce API',
      version: '1.0.0'
    }
  },
  apis: ['../routes/*.js'] 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;