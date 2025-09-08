import express from "express";
import db from "../db.js";

const router = express.Router();



router.post("/users", async (req, res) => {



    const { email, username, password } = req.body;

    await db.query(
        "INSERT INTO users (email, username, password) VALUES ($1, $2, $3, $4)",
        [email, username, password]
    );
    const users = await db.query(

        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    res.status(201).json({ users: newusers.rows[0] });
});



router.get("/users/:email", async (req, res) => {

    const user = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [req.params.email]
    );

    res.json(user.rows[0]);

});


export default router;
