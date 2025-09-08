import express from "express";
const router = express.Router();

router.get("/dog", async (req, res) => {
    try {
        const response = await fetch("https://api.thedogapi.com/v1/images/search", {
            headers: {
                "x-api-key": process.env.DOG_API_KEY
            }
        });
        const data = await response.json();
        res.json({ url: data[0].url });
    } catch (err) {
        console.error("Error fetching dog:", err);
        res.status(500).json({ error: "Failed to fetch dog" });
    }
});

export default router;
