// import express from "express";
// import db from "../db.js";
// const router = express.Router();





// router.post("/users", async (req, res) => {



//     const { email, username, mobile_number, password } = req.body;

//     await db.query(
//         "INSERT INTO user_vetclinic (email, username, mobile_number, password) VALUES ($1, $2, $3, $4)",
//         [email, username, mobile_number, password]
//     );




//     const users = await db.query(
//         // "SELECT p.* FROM carts c JOIN products p ON c.product_id = p.id WHERE c.user_email = $1",
//         "SELECT * FROM user_vetclinic WHERE email = $1",
//         [email]
//     );
//     res.status(201).json({ users: newusers.rows[0] });
// });



// router.get("/users/:email", async (req, res) => {

//     const user = await db.query(
//         "SELECT * FROM user_vetclinic WHERE email = $1",
//         [req.params.email]
//     );

//     res.json(user.rows[0]);

// });



// export default router;
