const mongoose = require("mongoose");

const MultiLang = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

const GallerySchema = new mongoose.Schema({
  slug: { type: String, default: "gallery", unique: true },

  banner: {
    subtitle: MultiLang,
    title: MultiLang,
    image: { type: String, default: "" }
  },

  categories: [
    {
      key: { type: String, default: "" }, // ex: general, rooms
      title: MultiLang,
      images: [String] // /uploads/... veya dış link
    }
  ]
}, { timestamps: true });

module.exports = mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
