const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const HomePage = require("../models/homepage"); // modelin dosya adı buysa
const Rooms = require("../models/roomspage");

// GET /api/pages/homepage → anasayfa içeriğini getir
router.get("/homepage", async (req, res) => {
  try {
    const page = await HomePage.findOne({ slug: "homepage" });
    if (!page) return res.status(404).json({ error: "Anasayfa bulunamadı" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// PUT /api/pages/homepage → anasayfa içeriğini güncelle (sadece admin için)
router.put("/homepage", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Yetkiniz yok" });
    }

    const updatedPage = await HomePage.findOneAndUpdate(
      { slug: "homepage" },
      req.body,
      { new: true, upsert: true } // upsert: ilk kayıt yoksa oluşturur
    );

    res.json(updatedPage);
  } catch (err) {
    res.status(500).json({ error: "Güncelleme başarısız" });
  }
});



/*rooms*/ 
router.get("/rooms", async (req, res) => {
  try {
    const page = await Rooms.findOne({ slug: "rooms" });
    if (!page) return res.status(404).json({ error: "Odalar bulunamadı" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// PUT /api/pages/rooms → anasayfa içeriğini güncelle (sadece admin için)
router.put("/rooms", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Yetkiniz yok" });
    }

    const updatedPage = await Rooms.findOneAndUpdate(
      { slug: "rooms" },
      req.body,
      { new: true, upsert: true } // upsert: ilk kayıt yoksa oluşturur
    );

    res.json(updatedPage);
  } catch (err) {
    res.status(500).json({ error: "Güncelleme başarısız" });
  }
});

module.exports = router;