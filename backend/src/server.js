const express = require("express");
const cors = require("cors");
const db = require("./db");
const applicationsRouter = require("./routes/applications");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

const PORT = 5000;

app.use(cors());
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});