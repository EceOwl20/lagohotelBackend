const mongoose = require("mongoose");

// Çok dilli alanlar için tekrar kullanılabilir şema parçası
const MultiLang = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

// Special şeması
const SpecialSchema = new mongoose.Schema({
  slug: { type: String, default: "special", unique: true },

  // Banner bölümü
  banner: {
    subtitle: MultiLang,
    title: MultiLang,
    text: MultiLang,
    buttonText: MultiLang,
    image: { type: String, default: "" }
  },

  // SpecialTypesSection
  types:{
     subtitle: MultiLang,
    title: MultiLang,
    text: MultiLang,
    items: [
    {
      subtitle: MultiLang,
      title: MultiLang,
      text: MultiLang,
      image: String
    }
  ]
  },

  // SpecialGridSection
  gridItems: {
     subtitle: MultiLang,
    title: MultiLang,
    text: MultiLang,
    items: [
    {
      subtitle: MultiLang,
      title: MultiLang,
      text: MultiLang,
      image: String
    }
  ]
  },

  // SpecialInfoSection
  infoSection: {
    subtitle: MultiLang,
    title: MultiLang,
    texts: [MultiLang]
  },

  // SpecialCarousel
  carousel: [String],

  // BackgroundSection
  background: {
    subtitle: MultiLang,
    title: MultiLang,
    text: [MultiLang],
    link: { type: String, default: "" },
    image: { type: String, default: "" }
  }

}, { timestamps: true });

module.exports = mongoose.models.Special || mongoose.model("Special", SpecialSchema);
