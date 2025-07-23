const mongoose = require("mongoose");

const multiLang = { tr: String, en: String, de: String, ru: String };

const BarCafeSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },

  mainBanner: {
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    image: String,
  },

  infoSection: {
    subtitle: multiLang,
    title: multiLang,
    text1: multiLang,
    text2: multiLang,
    image1: String,
    image2: String,
  },

  carousel: [String], // image url array

  // Alt cafe/bar opsiyonları
  otheroptions: {
    title: multiLang,
    subtitle: multiLang,
    text: multiLang,
  cafes: [
    {
      title: multiLang,
      description: multiLang,
      text: multiLang,
      buttonText: multiLang,
      link: String,
      image: String,
    }
  ],
  },

  background: {
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    buttonText: multiLang,
    link: String,
    image: String,
  }
});

module.exports = mongoose.models.BarCafe || mongoose.model("SubBarCafe", BarCafeSchema);
