const express = require("express");
const router = express.Router();
const RoomFeatures = require("../models/roomFeatures");

// GET (panel için)
router.get("/", async (req, res) => {
  const data = await RoomFeatures.findOne().lean();
  res.json(data || {});
});

// PUT (panel kayıt)
router.put("/", async (req, res) => {
  try {
    const updated = await RoomFeatures.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
