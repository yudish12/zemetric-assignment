const { Sequelize } = require("sequelize");
const Redis = require("ioredis");

const serviceUri = process.env.REDIS_SERVICE_URI;
const redisClient = new Redis(serviceUri);

const isProd = process.env.ENV === "production";

// Determine the host based on the environment
const sequelizeClient = new Sequelize(
  isProd ? process.env.PROD_DB_NAME : process.env.DEV_DB_NAME,
  isProd ? process.env.PROD_DB_USERNAME : process.env.DEV_DB_USERNAME,
  isProd ? process.env.PROD_DB_PASSWORD : process.env.DEV_DB_PASSWORD,
  {
    host: isProd ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST,
    port: isProd ? process.env.PROD_DB_PORT : process.env.DEV_DB_PORT,
    dialectOptions: isProd ? { ssl: { rejectUnauthorized: false } } : {},
    dialect: "postgres",
  }
);

module.exports = { sequelizeClient, redisClient };
