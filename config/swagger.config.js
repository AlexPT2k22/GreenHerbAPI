const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GREENHERB API',
      version: '1.0.0',
      description: 'API para gestão inteligente de estufa de ervas aromáticas',
      contact: {
        name: 'ESII - GREENHERB',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Herb: {
          type: 'object',
          required: ['nome', 'especie'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único da erva',
            },
            nome: {
              type: 'string',
              description: 'Nome da erva aromática',
              example: 'Hortelã',
            },
            especie: {
              type: 'string',
              description: 'Espécie botânica',
              example: 'Mentha spicata',
            },
            tempMin: {
              type: 'number',
              minimum: -50,
              maximum: 50,
              description: 'Temperatura mínima (°C)',
              example: 15,
            },
            tempMax: {
              type: 'number',
              minimum: -50,
              maximum: 50,
              description: 'Temperatura máxima (°C)',
              example: 25,
            },
            umidadeMin: {
              type: 'number',
              minimum: 0,
              maximum: 100,
              description: 'Humidade mínima (%)',
              example: 50,
            },
            umidadeMax: {
              type: 'number',
              minimum: 0,
              maximum: 100,
              description: 'Humidade máxima (%)',
              example: 80,
            },
            luminosidadeMin: {
              type: 'number',
              minimum: 0,
              maximum: 100000,
              description: 'Luminosidade mínima (lux)',
              example: 5000,
            },
            luminosidadeMax: {
              type: 'number',
              minimum: 0,
              maximum: 100000,
              description: 'Luminosidade máxima (lux)',
              example: 20000,
            },
          },
        },
        Plan: {
          type: 'object',
          required: ['tipo', 'nome', 'duracao'],
          properties: {
            id: {
              type: 'string',
            },
            tipo: {
              type: 'string',
              enum: ['regular', 'emergência', 'pontual'],
              description: 'Tipo do plano de cultivo',
            },
            nome: {
              type: 'string',
              description: 'Nome do plano',
            },
            duracao: {
              type: 'number',
              minimum: 1,
              maximum: 365,
              description: 'Duração em dias',
            },
            autorizacaoResponsavel: {
              type: 'boolean',
              description: 'Obrigatória para planos pontuais',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            error: {
              type: 'string',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os ficheiros com anotações
};

module.exports = swaggerJsdoc(options);
