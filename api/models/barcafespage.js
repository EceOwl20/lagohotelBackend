const mongoose = require("mongoose");

const langObj = { tr: String, en: String, de: String, ru: String };

const multiText = {
  tr: [String],
  en: [String],
  de: [String],
  ru: [String]
};

const cuisineSchema = new mongoose.Schema({
  image: String,
  title: langObj,
  description: langObj,
  text: langObj,
  link: String,
  buttonText: langObj
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
