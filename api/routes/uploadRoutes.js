const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");


// 🔹 Görsel Yükleme
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "public/uploads";
    fs.mkdirSync(dir, { recursive: true }); // klasör yoksa oluştur
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const uploadImage = multer({ storage: imageStorage });

router.post("/", uploadImage.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Dosya bulunamadı" });

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});


// 🔹 Video Yükleme
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "public/uploads/videos";
    fs.mkdirSync(dir, { recursive: true }); // klasör yoksa oluştur
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".mp4", ".mov", ".webm"].includes(ext)) {
      return cb(new Error("Sadece video dosyaları kabul edilir"));
    }
    cb(null, true);
  },
});

router.post("/video", uploadVideo.single("video"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Video bulunamadı" });

  const videoUrl = `/uploads/videos/${req.file.filename}`;
  res.json({ videoUrl });
});





router.get("/list", (req, res) => {
  const dir = path.join(__dirname, "../public/uploads");
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ error: "Liste okunamadı" });
    // sadece .png/.jpg/.webp uzantılılar
    const images = files.filter(f => /\.(jpe?g|png|webp|gif)$/.test(f));
    res.json(images);
  });
});

router.get("/videos", (req, res) => {
  const dir = path.join(__dirname, "../public/uploads/videos"); // ✅ düzeltildi
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ error: "Liste okunamadı" });
    const videos = files.filter(f => /\.(mp4|mov|webm)$/i.test(f)); // ✅ sadece video
    res.json({ videos }); // ✅ anahtar adı "videos" olmalı
  });
});



module.exports = router;