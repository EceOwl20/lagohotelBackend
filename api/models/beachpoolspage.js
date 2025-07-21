// models/BeachPools.js
const mongoose = require("mongoose");

const defaultLangs = ["tr", "en", "de", "ru"];

// Çok-dilli alanlar için alt şema
const multiLangSchema = new mongoose.Schema({
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" },
}, { _id: false });

// ClinaryInfo.texts için: her dil bir string dizisi
const multiLangArraySchema = new mongoose.Schema({
  tr: { type: [String], default: [] },
  en: { type: [String], default: [] },
  de: { type: [String], default: [] },
  ru: { type: [String], default: [] },
}, { _id: false });

// Carousel item
const carouselItemSchema = new mongoose.Schema({
  image: String,
  title: multiLangSchema,
  span: multiLangSchema,
}, { _id: false });

// PoolList item
const poolListItemSchema = new mongoose.Schema({
  image:      String,
  hoverImage: String,
  subtitle:   multiLangSchema,
  title:      multiLangSchema,
  description: multiLangSchema,
}, { _id: false });

const BeachPoolsSchema = new mongoose.Schema({
  mainBanner: {
    desktop: {
      girlImage:  String,
      textImage:  String,
      waveImage:  String,
      subtitle:   multiLangSchema,
      title:      multiLangSchema,
      text:       multiLangSchema,
      buttonText: multiLangSchema,
    },
    mobile: {
      bgImage:     String,
      subtitle:    multiLangSchema,
      mobileTitle: multiLangSchema,
      text:        multiLangSchema,
    },
  },
  clinaryInfo: {
    image1:   String,
    image2:   String,
    subtitle: multiLangSchema,
    title:    multiLangSchema,
     texts: [
      {
        type: multiLangSchema,
        default: () => ({ tr:"",en:"",de:"",ru:"" })
      }
    ],   
  },
  imageBackground: {
    image:     String,
    subtitle:  multiLangSchema,
    title:     multiLangSchema,
    text1:     multiLangSchema,
    text2:     multiLangSchema,
    icon1Text: multiLangSchema,
    icon2Text: multiLangSchema,
  },
  carousel: {
    subtitle: multiLangSchema,
    title:    multiLangSchema,
    text:     multiLangSchema,
    carouselItem:[ carouselItemSchema ]
  },
  poolSection: {
    subtitle: multiLangSchema,
    title:    multiLangSchema,
    text:     multiLangSchema,
    video:    String,
  },

   poolListSection: {
    subtitle: multiLangSchema,
    title:    multiLangSchema,
    text:     multiLangSchema,
  },
  poolList:[ poolListItemSchema ],
}, {
  collection: "beachpools",
  timestamps: true
});

module.exports = mongoose.models.BeachPools || mongoose.model("BeachPools", BeachPoolsSchema);
