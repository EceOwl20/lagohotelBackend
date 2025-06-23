// api/routes/header.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const Header = require("../models/Header");

// GET /api/header
router.get("/header", async (req, res) => {
  try {
    const header = await Header.findOne({ slug: "header" }); 
    if (!header) return res.status(404).json({ error: "Header bulunamadı" });
    res.json(header);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// PUT /api/header
router.put("/header", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Yetkiniz yok" });
    }
    const updated = await Header.findOneAndUpdate(
      { slug: "header" },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Güncelleme başarısız" });
  }
});

module.exports = router;