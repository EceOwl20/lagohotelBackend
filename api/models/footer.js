// models/Footer.js
const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
  slug: { type: String, default: "footer", unique: true },
  // Sosyal Medya Linkleri
  social: {
    tripadvisor: String,
    google: String,
    facebook: String,
    youtube: String,
    instagram: String
  },
  // Hızlı Menü (Dinamik dizi, başlık ve linkler çok dilli)
  quickMenu: [
    {
      title:   { tr: String, en: String, de: String, ru: String },
      links: [
        {
          text: { tr: String, en: String, de: String, ru: String },
          url:  String
        }
      ]
    }
  ],
  // Alt Linkler
  bottomLinks: [
    {
      text: { tr: String, en: String, de: String, ru: String },
      url: String
    }
  ],
  // İletişim Alanları
  contact: {
    phoneLabel:  { tr: String, en: String, de: String, ru: String },
    phone:       String,
    callCenterLabel: { tr: String, en: String, de: String, ru: String },
    callCenter:  String,
    emailLabel:  { tr: String, en: String, de: String, ru: String },
    email:       String,
    addressLabel: { tr: String, en: String, de: String, ru: String },
    address:     { tr: String, en: String, de: String, ru: String }
  },

});

module.exports = mongoose.model("Footer", FooterSchema);