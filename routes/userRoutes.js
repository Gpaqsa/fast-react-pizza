const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.post("/api/users", async (req, res) => {
  const { name="Example userName" } = req.body;

  // Input validation
  if (!name || typeof name !== "string" || name.length > 255) {
    return res
      .status(400)
      .json({ error: "Name is required and must be a string" });
  }

  try {
    // Insert the user into the database
    const result = await db.query("INSERT INTO users (name) VALUES (?)", [
      name,
    ]);
    // Send a success response
    res
      .status(201)
      .json({ message: "User created successfully", userId: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
