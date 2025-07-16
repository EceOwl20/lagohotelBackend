// models/fitness.js
const mongoose = require('mongoose');

const langFields = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

const listItemSchema = new mongoose.Schema({
  tr: String,
  en: String,
  de: String,
  ru: String,
}, { _id: false }); // _i

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
   subtitle: langFields,
  title:    langFields,
  text:     langFields,

  // The two background images
  img1: String,
  img2: String,

  // Overlay on the left image
  left: {
    subtitle: langFields,
    title:    langFields,
    text:     langFields,
  },

  // Overlay on the right image, plus dynamic lists
  right: {
    subtitle: langFields,
    title:    langFields,
    text:     langFields,
    lists:    [listItemSchema],
  },
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
      subtitle: langFields,
      title: langFields,
      text: langFields,
      img: String,
      buttonText: langFields
    }
  ]
});

module.exports = mongoose.models.Fitness || mongoose.model('Fitness', FitnessSchema);
