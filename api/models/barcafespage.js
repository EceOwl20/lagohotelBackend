const mongoose = require("mongoose");

const langObj = { tr: String, en: String, de: String, ru: String };

const multiText = {
  tr: [String],
  en: [String],
  de: [String],
  ru: [String]
};

const cuisinesItemSchema = new mongoose.Schema({
  image: String,
  title:       { tr: String, en: String, de: String, ru: String },
  text: { tr: String, en: String, de: String, ru: String },
  subtitle:    { tr: String, en: String, de: String, ru: String },
  link:        String,
  buttonText:{tr: String, en: String, de: String, ru: String }
});

const cuisineSchema = new mongoose.Schema({
  title:       { tr: String, en: String, de: String, ru: String },
  subtitle: { tr: String, en: String, de: String, ru: String },
  text:        { tr: String, en: String, de: String, ru: String },
  cuisine:    { 
    type: [cuisinesItemSchema],
    validate: {
      validator: arr => arr.length === 4,
      message:      'Her cuisine öğesi tam olarak 3 alt item içermeli'
    }
  }
});

const barCafesSchema = new mongoose.Schema({
  mainBanner: {
    image: String,
    subtitle: langObj,
    title: langObj,
    text: langObj
  },
  clinaryInfo: {
    image1: String,
    image2: String,
    subtitle: langObj,
    title: langObj,
    texts: multiText
  },
  backgroundSections: [{
    image: String,
    subtitle: langObj,
    title: langObj,
    texts: multiText,
    link: String,
    buttonText: langObj
  }],
  otherOptions: [cuisineSchema],
  otherOptions2: [cuisineSchema],

  barCarousel: {
    images: [String],
    subtitle: langObj,
    title: langObj,
    text: langObj,
    buttonText: langObj
  },
  discoverBackground: {
    image: String,
    subtitle: langObj,
    title: langObj,
    text: langObj,
    buttonText: langObj,
    link: String
  }
});

module.exports = mongoose.model("BarCafes", barCafesSchema);
