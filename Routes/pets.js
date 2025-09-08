import express from "express";
import db from "../db.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();



router.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM pets ORDER BY id");
    res.json(result.rows);
});

// localhost:5000/api/products/
// body name price, header x-role



router.post("/", adminAuth, async (req, res) => {
    const { name, type } = req.body;
    const result = await db.query(
        "INSERT INTO pets (name, type) VALUES ($1, $2) RETURNING *",
        [name, type]
    );
    res.status(201).json(result.rows[0]);
});

router.put("/:id", adminAuth, async (req, res) => {
    const { name, type } = req.body;
    const result = await db.query(
        "UPDATE pets SET name = $1, type = $2 WHERE id = $3 RETURNING *",
        [name, type, req.params.id]
    );
    result.rows.length > 0
        ? res.json(result.rows[0])
        : res.status(404).json({ message: "pet not found" });
});

// localhost:5000/api/products/2
router.delete("/:id", adminAuth, async (req, res) => {
    const result = await db.query("DELETE FROM pets WHERE id = $1 RETURNING *", [req.params.id]);
    result.rows.length > 0
        ? res.json({ deleted: result.rows[0] })
        : res.status(404).json({ message: "pet not found" });
});

export default router;


































// const router = express.Router();
// router.post("/pets", async (req, res) => {
//     const { name, type, owner_id } = req.body;

//     await db.query(
//         "INSERT INTO pets (name, type, owner_id) VALUES ($1, $2, 3)",
//         [name, type, owner_id]
//     );




//     const pets = await db.query(

//         "SELECT * FROM pets WHERE owner_id = $1",
//         [owner_id]
//     );
//     res.status(201).json({ pets: pets.rows[0] });
// });





// router.get("/pets/:owner_id", async (req, res) => {

//     const user = await db.query(
//         "SELECT * FROM pets WHERE owner_id = $1",
//         [req.params.owner_id]
//     );

//     res.json(user.rows[0]);

// });


// export default router;
