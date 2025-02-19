const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/api/menu", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pizzaMenu");
    res
      .status(200)
      .json({ message: "Menu retrieved successfully", data: rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
