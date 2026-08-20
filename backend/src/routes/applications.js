const express = require("express");
const db = require("../db");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const { search, status } = req.query;

        let query = `
            SELECT *
            FROM applications
        `;

        const conditions = [];
        const values = [];

        if (search) {
            values.push(`%${search}%`);
            conditions.push(`
                (company_name ILIKE $${values.length}
                OR role ILIKE $${values.length})
            `);
        }

        if (status) {
            values.push(status);
            conditions.push(`status = $${values.length}`);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += " ORDER BY application_id";

        const result = await db.query(query, values);

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching applications:", error.message);

        res.status(500).json({
            error: "Failed to fetch applications"
        });
    }
});

router.get("/:id", async (req, res) => {
       try {
        const { id } = req.params;

        const result = await db.query(
            "select * FROM applications WHERE application_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Application not found"
            });
        }

        res.json({
            message: "Application Fetched successfully",
            application: result.rows[0]
        });
    } catch (error) {
        console.error("Error Fetching application:", error.message);

        res.status(500).json({
            error: "Failed to fetch application"
        });
    }
});



router.post("/", async (req, res) => {
    try {
        const { company_name, role, applied_date, status } = req.body;

        const result = await db.query(
            `INSERT INTO applications
             (company_name, role, applied_date, status)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [company_name, role, applied_date, status]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating application:", error.message);

        res.status(500).json({
            error: "Failed to create application"
        });
    }
});
// UPDATE an application
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { company_name, role, applied_date, status } = req.body;

        const result = await db.query(
            `UPDATE applications
             SET company_name = $1,
                 role = $2,
                 applied_date = $3,
                 status = $4
             WHERE application_id = $5
             RETURNING *`,
            [company_name, role, applied_date, status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Application not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating application:", error.message);

        res.status(500).json({
            error: "Failed to update application"
        });
    }
});
// DELETE an application
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(
            "DELETE FROM applications WHERE application_id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Application not found"
            });
        }

        res.json({
            message: "Application deleted successfully",
            application: result.rows[0]
        });
    } catch (error) {
        console.error("Error deleting application:", error.message);

        res.status(500).json({
            error: "Failed to delete application"
        });
    }
});
module.exports = router;

