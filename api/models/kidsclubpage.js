const mongoose = require("mongoose");

const MultiLang = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

const kidspoolItemSchema = new mongoose.Schema({
  image: String,
   subtitle: MultiLang,
  title: MultiLang,
  text: MultiLang,
   buttonText: MultiLang,
    link: MultiLang,
}, { _id: false });

const KidsClubSchema = new mongoose.Schema({
  slug: { type: String, default: "kidsclub", unique: true },

  mainBanner: {
    image: String,
    subtitle: MultiLang,
    title: MultiLang,
    text: MultiLang
  },

  kidsBamboo: {
    subtitle: MultiLang,
    title: MultiLang,
    text: MultiLang,
    span: MultiLang,
    image:String,
    clubData: [{
      image: String,
      ageGroup: MultiLang,
      title: MultiLang,
      description: MultiLang
    }],
    note: MultiLang
  },

  iconsSection: {
    icon1: MultiLang,
    icon2: MultiLang,
    icon3: MultiLang,
    icon4: MultiLang
  },

  kidsClubCarousel: {
    subtitle: MultiLang,
    title: MultiLang,
    text: MultiLang,
    slides: [{
      image: String,
      header: MultiLang
    }]
  },

  kidsRestaurantCarousel: {
    subtitle: MultiLang,
    title: MultiLang,
    text: MultiLang,
    list: {
      tr: [String],
      en: [String],
      de: [String],
      ru: [String]
    },
    images: [String]
  },

  kidspool: [{
     subtitle: MultiLang,
    title:    MultiLang,
    text:     MultiLang,
    carouselItem:[ kidspoolItemSchema ]
  }],

  kidsMomentCarousel: {
    header: MultiLang,
    images: [String]
  }
});

module.exports = mongoose.models.KidsClub || mongoose.model("KidsClub", KidsClubSchema);
