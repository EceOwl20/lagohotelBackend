// models/fitness.js
const mongoose = require('mongoose');

const langFields = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

const FitnessSchema = new mongoose.Schema({
  // MainBanner
  mainBanner: {
    image: String,
    subtitle: langFields,
    title: langFields,
    text: langFields,
  },
  // Info Section
  infoSection: {
    img1: String,
    img2: String,
    texts: [langFields],   // [subtitle, title, text]
    texts2: [langFields],  // [subtitle2, title2, text2]
    texts3: [langFields],  // [subtitle3, title3, text3, list1, list2, ...]
  },
  // Spa Gallery
  spaGallery: {
    span: langFields,
    header: langFields,
    text: langFields,
    images: [String], // gallery image urls
  },
  // Carousel/Activities
  activities: {
    span: langFields,
    header: langFields,
    text: langFields,
    images: [String],         // activity img urls (yoga, zumba, ...)
    headers: [langFields],    // carousel başlıkları
  },
  // Spa Types Info
  spaTypes: [
    {
      isImageLeft: Boolean,
      showLink: Boolean,
      span: langFields,
      header: langFields,
      text: langFields,
      img: String,
    }
  ]
});

module.exports = mongoose.models.Fitness || mongoose.model('Fitness', FitnessSchema);
