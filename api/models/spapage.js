const mongoose = require("mongoose");

const multiLang = {
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

const carouselCardSchema = new mongoose.Schema({
  image: String,
  title: multiLang,
  text: multiLang
}, { _id: false });


const SpaPageSchema = new mongoose.Schema({
  mainBanner: {
    image: String,
    subtitle: multiLang,
    title: multiLang,
    text: multiLang
  },
  SpaInfoSection: {
    subtitle: multiLang,
  title:    multiLang,
  text:     multiLang,


  img1: String,
  img2: String,


  left: {
    subtitle: multiLang,
    title:    multiLang,
    text:     multiLang,
  },


  right: {
    subtitle: multiLang,
    title:    multiLang,
    text:     multiLang,
    lists:    [listItemSchema],
  },
  },


  spaHeaderSection: {
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    images: [String] 
  },

  
  massageCarousel: {
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    headers: [multiLang],
     carouselCards: [carouselCardSchema] 
  },


  spaTypesInfoSection: {
     isImageLeft: Boolean,
      showLink: Boolean,
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    img: String,
    buttonText: multiLang
  },
  
  spaReverse: {
    subtitle: multiLang,
    title: multiLang,
    text: multiLang,
    img: String
  }
}, { timestamps: true });

module.exports = mongoose.models.SpaPage || mongoose.model("SpaPage", SpaPageSchema);
