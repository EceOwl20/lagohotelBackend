// models/Header.js
const mongoose = require("mongoose");

const HeaderSchema = new mongoose.Schema({
  slug: { type: String, default: "header", unique: true },
  logo: String, // dosya yolu
  phone: String,
  bookNowLink:    { tr: String, en: String, de: String, ru: String },
  bookNowText:    { tr: String, en: String, de: String, ru: String },
  contactLink:    { tr: String, en: String, de: String, ru: String },
  contactText:    { tr: String, en: String, de: String, ru: String },
  letUsCallYouLink: { tr: String, en: String, de: String, ru: String },
  letUsCallYouText: { tr: String, en: String, de: String, ru: String },
  // Dinamik menü:
  menuItems: [
    {
      text: { tr: String, en: String, de: String, ru: String },
      link: { tr: String, en: String, de: String, ru: String }
    }
  ],
  social: {
    tripadvisor: String,
    google: String,
    facebook: String,
    youtube: String,
    instagram: String
  }
});
module.exports = mongoose.model("Header", HeaderSchema);