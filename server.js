import express, { request, response } from "express";

// 

import cors from "cors";
import morgan from "morgan";
import authRoutes from './Routes/auth.js';
import usersRoutes from './Routes/users.js';
import petsRoutes from './Routes/pets.js';
import appointmentsRoutes from './Routes/appointments.js';
import dotenv from "dotenv";
import db from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// localhost:5000



// app.use("/users", usersRoutes);
// app.use("/pets", petsRoutes);
// app.use("/appointments", appointmentsRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/users", usersRoutes)
app.get("/", (req, res) => {
    res.send("✅ API is running");
});

db.connect().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
