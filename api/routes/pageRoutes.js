const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const HomePage = require("../models/homepage"); // modelin dosya adı buysa
const Rooms = require("../models/roomspage");
const SuperiorRoom = require('../models/superiorroom') ;

const RestaurantPage = require("../models/restaurantpage");
const BarCafes = require("../models/barcafespage");
const BeachPools = require("../models/beachpoolspage");
const KidsClub = require('../models/kidsclubpage');
const SpaPage = require('../models/spapage');
const EntertainmentPage = require("../models/entertainment");
const ConnectPage = require("../models/contactpage");
const Fitness = require('../models/fitnesspage');
const About = require("../models/aboutpage");
const SubRoom = require('../models/subroom');
const Subrestaurant = require("../models/subRestaurant");
const BarCafe = require("../models/subbarcafes");
const Special = require("../models/specialpage");

router.get("/special", async (req, res) => {
  try {
    let doc = await Special.findOne().lean();
    // Eğer henüz yoksa boş şema dönebiliriz
    if (!doc) {
      doc = new Special();
      await doc.save();
      doc = doc.toObject();
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Tek dokümanı güncelle / oluştur ---
router.put("/special", async (req, res) => {
  try {
    const updated = await Special.findOneAndUpdate(
      {},           // filtre yok: ilk bulunanı güncelle
      { $set: req.body },
      { new: true, upsert: true }
    ).lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tüm barcafe sayfalarını getir
router.get("/barcafes/subbarcafes", async (req, res) => {
  try {
    const barcafes = await BarCafe.find().lean();
    res.json(barcafes);
  } catch (err) {
    res.status(500).json({ error: "Barcafe çekilemedi" });
  }
});

// Tek barcafe getir (panelde gerekirse)
router.get("/barcafes/subbarcafes/:slug", async (req, res) => {
  try {
    const barcafe = await BarCafe.findOne({ slug: req.params.slug }).lean();
    res.json(barcafe);
  } catch (err) {
    res.status(404).json({ error: "Bulunamadı" });
  }
});

// Kaydet/güncelle
router.put("/barcafes/subbarcafes/:slug", async (req, res) => {
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

// Tüm restaurantlar (slug listesi)
router.get('/restaurants/subrestaurants', async (req, res) => {
  try {
    const restaurants = await Subrestaurant.find().lean();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tek restaurant detay
router.get("/restaurants/subrestaurants/:slug", async (req, res) => {
  const { slug } = req.params;
  const data = await Subrestaurant.findOne({ slug }).lean();
  if (!data) return res.status(404).json({ error: "Bulunamadı!" });
  res.json(data);
});

// Güncelleme (panel kaydeder)
router.put("/restaurants/subrestaurants/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    // req.body içindeki alanları $set ile ekle/güncelle, diğerlerini koru
    const updated = await Subrestaurant.findOneAndUpdate(
      { slug },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eski endpoint'ler de desteklensin (geriye uyumluluk için)
router.get('/rooms/subroom', async (req, res) => {
  try {
    const rooms = await SubRoom.find().lean();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/rooms/subroom/:slug', async (req, res) => {
  try {
    const room = await SubRoom.findOne({ slug: req.params.slug }).lean();
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get('/rooms/subroom/:slug', async (req, res) => {
//   try {
//     const room = await SubRoom.findOne({ slug: req.params.slug }).lean();
//     res.json(room);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// route
router.put('/rooms/subroom/:slug', async (req, res) => {
   console.log("REQ.BODY:", req.body); // <-- BURAYA BAK
  const updated = await SubRoom.findOneAndUpdate(
    { slug: req.params.slug },
    req.body, // burada background, carousel vs. hepsi olmalı
    { new: true, upsert: true }
  );
  res.json(updated);
});


// GET - get page data
router.get("/about", async (req, res) => {
  try {
    const data = await About.findOne({});
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// PUT - update page data
router.put('/about', async (req, res) => {
  try {
    const updated = await About.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Güncelleme başarısız' });
  }
});

// GET
router.get('/fitness', async (req, res) => {
  try {
    const doc = await Fitness.findOne({}) || {};
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// PUT
router.put('/fitness', async (req, res) => {
  try {
    const updated = await Fitness.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Güncelleme başarısız' });
  }
});

// GET
router.get("/contact", async (req, res) => {
  const doc = await ConnectPage.findOne() || {};
  res.json(doc);
});

// PUT (güncelle veya oluştur)
router.put("/contact", async (req, res) => {
  const update = req.body;
  const doc = await ConnectPage.findOneAndUpdate({}, update, { new: true, upsert: true });
  res.json(doc);
});

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
    res.json(page || {});
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
  try {
    let doc = await BeachPools.findOne({});
    if (!doc) {
      // eğer hiç doküman yoksa boş bir tane oluşturup geri döndür
      doc = new BeachPools({});
      await doc.save();
    }
    res.json(doc);
  } catch (err) {
    console.error("GET /beachpools error:", err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/beachpools
router.put("/beachpools", async (req, res) => {
  try {
    const updates = req.body;
    // boş bir filtre ({}) ile ilk dokümanı güncelle veya yoksa oluştur (upsert)
    const doc = await BeachPools.findOneAndUpdate(
      {},
      updates,
      {
        new: true,     // güncel dokümanı dön
        upsert: true,  // yoksa oluştur
        runValidators: true
      }
    );
    res.json(doc);
  } catch (err) {
    console.error("PUT /beachpools error:", err);
    res.status(500).json({ error: err.message });
  }
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


module.exports = router;