const mongoose = require("mongoose");

const RestaurantPageSchema = new mongoose.Schema({
  slug: { type: String, default: "restaurantpage" },

  mainBanner: {
    image: String,
    subtitle: { tr: String, en: String, de: String, ru: String },
    title:    { tr: String, en: String, de: String, ru: String },
    text:     { tr: String, en: String, de: String, ru: String }
  },

  clinaryInfo: {
    image1: String,
    image2: String,
    subtitle: { tr: String, en: String, de: String, ru: String },
    title:    { tr: String, en: String, de: String, ru: String },
    texts: [
    {
      tr: String,
      en: String,
      de: String,
      ru: String
    }
  ]
  },

  mainRestaurantSection: {
    image: String,
    subtitle: { tr: String, en: String, de: String, ru: String },
    title:    { tr: String, en: String, de: String, ru: String },
    text:     { tr: String, en: String, de: String, ru: String },
    list: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    buttonText: { tr: String, en: String, de: String, ru: String },
    buttonLink: String
  },

  cuisines: [
    {
      image: String,
      title:       { tr: String, en: String, de: String, ru: String },
      description: { tr: String, en: String, de: String, ru: String },
      text:        { tr: String, en: String, de: String, ru: String },
      link: String,
      buttonText:  { tr: String, en: String, de: String, ru: String }
    }
  ],

  clinaryReverseInfo: {
    image1: String,
    image2: String,
    subtitle: { tr: String, en: String, de: String, ru: String },
    title:    { tr: String, en: String, de: String, ru: String },
    text1:    { tr: String, en: String, de: String, ru: String },
    text2:    { tr: String, en: String, de: String, ru: String }
  },

  cuisines2: [
    {
      image: String,
      title:       { tr: String, en: String, de: String, ru: String },
      description: { tr: String, en: String, de: String, ru: String },
      text:        { tr: String, en: String, de: String, ru: String },
      link: String,
      buttonText:  { tr: String, en: String, de: String, ru: String }
    }
  ],

  discoverBackground: {
    image: String,
    subtitle:   { tr: String, en: String, de: String, ru: String },
    title:      { tr: String, en: String, de: String, ru: String },
    text:       { tr: String, en: String, de: String, ru: String },
    buttonText: { tr: String, en: String, de: String, ru: String },
    link: String
  }
});

module.exports = mongoose.model("RestaurantPage", RestaurantPageSchema);
