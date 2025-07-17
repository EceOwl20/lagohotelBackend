// models/fitness.js
const mongoose = require('mongoose');

const langFields = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

const carouselCardSchema = new mongoose.Schema({
  image: String,
  title: langFields,
  text: langFields
}, { _id: false });

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


  img1: String,
  img2: String,


  left: {
    subtitle: langFields,
    title:    langFields,
    text:     langFields,
  },

  right: {
    subtitle: langFields,
    title:    langFields,
    text:     langFields,
    lists:    [listItemSchema],
  },
  },
 
  spaGallery: {
    subtitle: langFields,
    title: langFields,
    text: langFields,
    images: [String], 
  },
  
  massageCarousel: {
    subtitle: langFields,
    title: langFields,
    text: langFields,
    headers: [langFields],
     carouselCards: [carouselCardSchema] 
  },
  
  fitnessTypesInfoSection: {
     isImageLeft: Boolean,
      showLink: Boolean,
    subtitle: langFields,
    title: langFields,
    text: langFields,
    img: String,
    buttonText: langFields
  },

    fitnessReverse: {
    subtitle: langFields,
    title: langFields,
    text: langFields,
    img: String
  }
});

module.exports = mongoose.models.Fitness || mongoose.model('Fitness', FitnessSchema);
