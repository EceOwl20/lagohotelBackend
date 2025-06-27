// models/about.js
const mongoose = require('mongoose');

const defaultLangs = ['tr', 'en', 'de', 'ru'];

// Çok dilli alanlar için şablon
const MultiLangString = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

// Embla Carousel slide şeması
const emblaSlideSchema = new mongoose.Schema({
  src: { type: String, default: "" },
  title: MultiLangString,
  link: { type: String, default: "" }
});

// Ana şema
const AboutSchema = new mongoose.Schema({
  mainBanner2: {
    img: { type: String, default: "" },
    span: MultiLangString,
    header: MultiLangString,
    opacity: { type: Boolean, default: true }
  },
  infoSection: {
    isImageLeft: { type: Boolean, default: false },
    span: MultiLangString,
    header: MultiLangString,
    text: MultiLangString,
    link: { type: String, default: "" },
    showLink: { type: Boolean, default: true },
    img: { type: String, default: "" },
    buttonText: MultiLangString
  },
  kidsMomentCarousel: {
    showheader: { type: Boolean, default: false },
    header: MultiLangString,
    images: [{ type: String }]
  },
  missionVisionSection: {
    texts: [{ type: MultiLangString }],
    texts2: [{ type: MultiLangString }],
    texts3: [{ type: MultiLangString }],
    leftImg: { type: String, default: "" },
    rightImg: { type: String, default: "" },
    showLink: { type: Boolean, default: false },
    buttonText: MultiLangString
  },
  emblaCarousel: [emblaSlideSchema]
});

module.exports = mongoose.model('AboutPage', AboutSchema);
