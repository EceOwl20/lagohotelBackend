// routes/room.js
const express = require("express");
const router = express.Router();
const Room = require("../models/room");

// GET /api/rooms/:slug  -> Odayı getir
router.get("/:slug", async (req, res) => {
  try {
    const room = await Room.findOne({ slug: req.params.slug });
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Error fetching room" });
  }
});

// PUT /api/rooms/:slug -> Odayı güncelle (veya ekle)
router.put("/:slug", async (req, res) => {
  try {
    const updated = await Room.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
