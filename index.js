require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.config');
const sequelize = require('./config/db.config');

const app = express();

// Sincronizar base de dados SQLite
sequelize.sync({ alter: false }).then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Database sync error:', err);
});

app.use(express.json());

// Swagger UI - Documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'GREENHERB API Docs'
}));

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});