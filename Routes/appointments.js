
import express from "express";
import db from "../db.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();


router.get("/", adminAuth, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM appointments ORDER BY date");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


router.get("/user/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await db.query(
            "SELECT * FROM appointments WHERE user_id = $1 ORDER BY date",
            [user_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


router.post("/", async (req, res) => {
    const { user_id, mobile_number, date } = req.body;
    if (!user_id || !mobile_number || !date) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await db.query(
            "INSERT INTO appointments (user_id, mobile_number, date, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_id, mobile_number, date, "pending"]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

router.put("/:id", async (req, res) => {
    const { mobile_number, date, status } = req.body;

    try {
        const result = await db.query(
            "UPDATE appointments SET mobile_number = COALESCE($1, mobile_number), date = COALESCE($2, date), status = COALESCE($3, status) WHERE id = $4 RETURNING *",
            [mobile_number, date, status, req.params.id]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: "Appointment not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
router.delete("/user/:id", async (req, res) => {
    const { user_id } = req.body; // from frontend
    try {
        const result = await db.query(
            "DELETE FROM appointments WHERE id = $1 AND user_id = $2 RETURNING *",
            [req.params.id, user_id]
        );

        if (result.rows.length > 0) {
            res.json({ deleted: result.rows[0] });
        } else {
            res.status(404).json({ message: "Appointment not found or not yours" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

router.delete("/:id", adminAuth, async (req, res) => {
    try {
        const result = await db.query(
            "DELETE FROM appointments WHERE id = $1 RETURNING *",
            [req.params.id]
        );

        if (result.rows.length > 0) {
            res.json({ deleted: result.rows[0] });
        } else {
            res.status(404).json({ message: "Appointment not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});





// Middleware check if user is admin or not
const requireAdmin = (req, res, next) => {
    const role = req.headers["x-role"]; // or from auth middleware
    if (role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

//admin can Get all appointments
router.get("/", requireAdmin, async (req, res) => {
    try {
        const result = await db.query(
            "SELECT a.*, u.username, u.email FROM appointments a JOIN users u ON a.user_id = u.id ORDER BY a.date DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching appointments");
    }
});

// Update appointment status approve or decline for admin
router.put("/:id/status", requireAdmin, async (req, res) => {
    const { status } = req.body;
    try {
        const result = await db.query(
            "UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *",
            [status, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating status");
    }
});

//admin delete the appointment 
router.delete("/:id", requireAdmin, async (req, res) => {
    try {
        await db.query("DELETE FROM appointments WHERE id = $1", [req.params.id]);
        res.json({ message: "Appointment deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting appointment");
    }
});





export default router;