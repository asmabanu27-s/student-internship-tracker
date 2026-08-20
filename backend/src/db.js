require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false
});

pool.on("connect", () => {
    console.log("Database connected successfully.");
});

pool.on("error", (error) => {
    console.error("Unexpected database error:", error);
});

async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS applications (
                application_id SERIAL PRIMARY KEY,
                company_name VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL,
                applied_date DATE NOT NULL,
                status VARCHAR(50) NOT NULL
            );
        `);

        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Database initialization failed:", error);
        throw error;
    }
}

module.exports = pool;
module.exports.initializeDatabase = initializeDatabase;