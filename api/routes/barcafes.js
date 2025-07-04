const express = require("express");
const router = express.Router();
const BarCafe = require("../models/subbarcafes");

// Tüm barcafe sayfalarını getir
router.get("/pages/barcafes/subbarcafes", async (req, res) => {
  try {
    const barcafes = await BarCafe.find().lean();
    res.json(barcafes);
  } catch (err) {
    res.status(500).json({ error: "Barcafe çekilemedi" });
  }
});

// Tek barcafe getir (panelde gerekirse)
router.get("/pages/barcafes/subbarcafes/:slug", async (req, res) => {
  try {
    const barcafe = await BarCafe.findOne({ slug: req.params.slug }).lean();
    res.json(barcafe);
  } catch (err) {
    res.status(404).json({ error: "Bulunamadı" });
  }
});

// Kaydet/güncelle
router.put("/pages/barcafes/subbarcafes/:slug", async (req, res) => {
  try {
    const updated = await BarCafe.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Güncellenemedi" });
  }
});

module.exports = router;
