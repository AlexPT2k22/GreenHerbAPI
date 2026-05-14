const { Sequelize } = require('sequelize');

// Configuração SQLite - não depende de SGBD específico instalado
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'test' ? ':memory:' : './database.sqlite',
  logging: false,
});

module.exports = sequelize;