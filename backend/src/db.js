require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.on("connect", () => {
    console.log("Database connected successfully.");
});

pool.on("error", (error) => {
    console.error("Unexpected database error:", error);
});

module.exports = pool;