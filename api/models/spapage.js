const mongoose = require("mongoose");

const multiLang = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

// Galeri resmi path'leri string, massage carousel için img ve başlık, link
const SpaPageSchema = new mongoose.Schema({
  mainBanner: {
    image: String,
    subtitle: multiLang,
    title: multiLang,
    text: multiLang
  },
  spaInfoSection: {
    img1: String,
    img2: String,
    texts: [multiLang],
    texts2: [multiLang],
    texts3: [multiLang]
  },
  spaHeaderSection: {
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    images: [String] // Galeri görselleri
  },
  massageCarousel: {
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    headers: [multiLang],
    images: [String] // Görsel pathleri
  },
  spaTypesInfoSection: {
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    img: String,
    buttonText: multiLang
  },
  spaReverse: {
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    img: String
  }
}, { timestamps: true });

module.exports = mongoose.models.SpaPage || mongoose.model("SpaPage", SpaPageSchema);
