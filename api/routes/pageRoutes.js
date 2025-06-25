const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const HomePage = require("../models/homepage"); // modelin dosya adı buysa
const Rooms = require("../models/roomspage");
const SuperiorRoom = require('../models/superiorroom') ;
const Subrooms = require('../models/subrooms')
const RestaurantPage = require("../models/restaurantpage");

// GET (public)
router.get("/restaurants", async (req, res) => {
  try {
    const page = await RestaurantPage.findOne({ slug: "restaurantpage" });
    if (!page) return res.status(404).json({ error: "Bulunamadı" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// PUT (admin)
router.put("/restaurants", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Yetkiniz yok" });
    }
    const updatedPage = await RestaurantPage.findOneAndUpdate(
      { slug: "restaurantpage" },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updatedPage);
  } catch (err) {
    res.status(500).json({ error: "Güncelleme başarısız" });
  }
});

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


/*superiorroom*/ 
router.get("/rooms/superiorroom", async (req, res) => {
  try {
    const page = await SuperiorRoom.findOne({ slug: "superiorroom" });
    if (!page) return res.status(404).json({ error: "Odalar bulunamadı" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// PUT /api/pages/rooms → anasayfa içeriğini güncelle (sadece admin için)
router.put("/rooms/superiorroom", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Yetkiniz yok" });
    }

    const updatedPage = await SuperiorRoom.findOneAndUpdate(
      { slug: "superiorroom" },
      req.body,
      { new: true, upsert: true } // upsert: ilk kayıt yoksa oluşturur
    );

    res.json(updatedPage);
  } catch (err) {
    res.status(500).json({ error: "Güncelleme başarısız" });
  }
});

// GET /api/pages/subrooms
router.get('/rooms/subrooms', async (req, res) => {
  try {
    const rooms = await Subrooms.find({}, 'slug').lean()
    return res.json(rooms.map(r => r.slug))
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Sunucu hatası' })
  }
})

// 2) Tek bir slug’a göre tam belgeyi döner
//    GET /api/pages/rooms/subrooms/:slug
router.get('/rooms/subrooms/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const doc = await Subrooms.findOne({ slug }).lean()
    if (!doc) return res.status(404).json({ error: 'Oda bulunamadı' })
    return res.json(doc)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Sunucu hatası' })
  }
})

// 3) Slug’a göre belgeyi günceller
//    PUT /api/pages/rooms/subrooms/:slug
router.put('/rooms/subrooms/:slug', verifyToken, async (req, res) => {
  console.log('PUT /subrooms/:slug body:', req.body);
  try {
    const updated = await Subrooms.findOneAndUpdate(
      { slug: req.params.slug },

     { $set: req.body },
      { new: true, upsert: true }
    );
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Güncelleme başarısız' });
  }
});

module.exports = router;