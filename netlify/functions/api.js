const serverless = require("serverless-http");
const db = require("../../backend/src/db");
const app = require("../../backend/src/server");

let initialized = false;

const initializeDatabase = async () => {
    if (!initialized) {
        await db.initializeDatabase();
        initialized = true;
    }
};

exports.handler = async (event, context) => {
    await initializeDatabase();

    return serverless(app)(event, context);
};