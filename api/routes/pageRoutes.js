const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const HomePage = require("../models/homepage"); // modelin dosya adı buysa
const Rooms = require("../models/roomspage");
const SuperiorRoom = require('../models/superiorroom') ;
const Subrooms = require('../models/subrooms')
const RestaurantPage = require("../models/restaurantpage");
const BarCafes = require("../models/barcafespage");
const BeachPools = require("../models/beachpoolspage");
const KidsClub = require('../models/kidsclubpage');
const SpaPage = require('../models/spapage');
const EntertainmentPage = require("../models/entertainment");

// GET
router.get("/entertainment", async (req, res) => {
  try {
    const doc = await EntertainmentPage.findOne({});
    res.json(doc || {});
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// PUT
router.put("/entertainment", async (req, res) => {
  try {
    const updated = await EntertainmentPage.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Güncelleme başarısız" });
  }
});


// GET SPA PAGE
router.get('/spa', async (req, res) => {
  try {
    let spa = await SpaPage.findOne();
    if (!spa) spa = await SpaPage.create({});
    res.json(spa);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT SPA PAGE
router.put('/spa', async (req, res) => {
  try {
    const body = req.body;
    const updated = await SpaPage.findOneAndUpdate({}, body, { new: true, upsert: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// GET kidsclub page data
router.get('/kidsclub', async (req, res) => {
  try {
    const page = await KidsClub.findOne({ slug: 'kidsclub' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT kidsclub page update
router.put('/kidsclub', async (req, res) => {
  try {
    const updated = await KidsClub.findOneAndUpdate(
      { slug: "kidsclub" },
      req.body,
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/beachpools", async (req, res) => {
  const doc = await req.db.collection("beachpools").findOne({});
  res.json(doc || BeachPools.empty());
});

router.put("/beachpools", async (req, res) => {
  // (Auth check, validation eklenebilir)
  const body = req.body;
  const result = await req.db.collection("beachpools").findOneAndUpdate(
    {},
    { $set: body },
    { returnDocument: "after", upsert: true }
  );
  res.json(result.value);
});

// GET - fetch
router.get("/barcafes", async (req, res) => {
  const doc = await BarCafes.findOne({}) || {};
  res.json(doc);
});

// PUT - update (with auth middleware as needed)
router.put("/barcafes", async (req, res) => {
  const doc = await BarCafes.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true }
  );
  res.json(doc);
});


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