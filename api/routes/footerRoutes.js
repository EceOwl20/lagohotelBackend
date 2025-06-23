// api/routes/footer.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const Footer = require("../models/footer");

// GET /api/footer
router.get("/footer", async (req, res) => {
  try {
    const footer = await Footer.findOne({ slug: "footer" }); 
    if (!footer) return res.status(404).json({ error: "Footer bulunamadı" });
    res.json(footer);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// PUT /api/footer
router.put("/footer", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Yetkiniz yok" });
    }
    const updated = await Footer.findOneAndUpdate(
      { slug: "footer" },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Güncelleme başarısız" });
  }
});

module.exports = router;