const express = require("express");
const router = express.Router();
const Subrestaurant = require("../models/subRestaurant");

// Tüm restaurantlar (slug listesi)
router.get("/", async (req, res) => {
  const datas = await Subrestaurant.find({}, "slug mainBanner.title").lean();
  res.json(datas);
});

// Tek restaurant detay
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const data = await Subrestaurant.findOne({ slug }).lean();
  if (!data) return res.status(404).json({ error: "Bulunamadı!" });
  res.json(data);
});

// Güncelleme (panel kaydeder)
router.put("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const updated = await Subrestaurant.findOneAndUpdate(
      { slug },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
