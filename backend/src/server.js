const express = require("express");
const cors = require("cors");
const db = require("./db");
const applicationsRouter = require("./routes/applications");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://magenta-bienenstitch-b38612.netlify.app"
    ]
}));

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/api/applications", applicationsRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Student Internship & Application Tracker API"
    });
});

if (require.main === module) {
    app.listen(PORT, async () => {
        try {
            await db.initializeDatabase();
            console.log(`Server running on http://localhost:${PORT}`);
        } catch (error) {
            console.error("Failed to initialize database:", error);
            process.exit(1);
        }
    });
}

module.exports = app;