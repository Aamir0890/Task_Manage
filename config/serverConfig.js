const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: `${process.env.DB_HOST}`,
  dialect: `${process.env.DB_DIALECT}`
});

try {
     sequelize.authenticate();
    console.log("Connecting extablishes")
} catch (error) {
    console.log(error)
}
module.exports = sequelize;
