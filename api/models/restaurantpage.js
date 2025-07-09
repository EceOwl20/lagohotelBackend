// api/models/restaurantpage.js
const mongoose = require("mongoose");

const defaultLangs = ['tr', 'en', 'de', 'ru'];

// 1) Alt cuisine item için ayrı bir Schema
const CuisinesItemSchema = new mongoose.Schema({
  image: String,
  title:       { tr: String, en: String, de: String, ru: String },
  description: { tr: String, en: String, de: String, ru: String },
  subtitle:    { tr: String, en: String, de: String, ru: String },
  link:        String
});

// 2) Cuisine (ana) için ayrı bir Schema, içinde 3 adet CuisinesItemSchema barındıracak
const CuisineSchema = new mongoose.Schema({
  title:       { tr: String, en: String, de: String, ru: String },
  description: { tr: String, en: String, de: String, ru: String },
  text:        { tr: String, en: String, de: String, ru: String },
  link:        String,
  buttonText:  { tr: String, en: String, de: String, ru: String },
  cuisine:    { 
    type: [CuisinesItemSchema],
    validate: {
      validator: arr => arr.length === 3,
      message:      'Her cuisine öğesi tam olarak 3 alt item içermeli'
    }
  }
});

// 3) Son olarak RestaurantPageSchema
const RestaurantPageSchema = new mongoose.Schema({
  slug: { type: String, default: "restaurantpage" },

  mainBanner: {
    image:    String,
    subtitle: { tr: String, en: String, de: String, ru: String },
    title:    { tr: String, en: String, de: String, ru: String },
    text:     { tr: String, en: String, de: String, ru: String }
  },

  clinaryInfo: {
    image1:   String,
    image2:   String,
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
    image:      String,
    subtitle:   { tr: String, en: String, de: String, ru: String },
    title:      { tr: String, en: String, de: String, ru: String },
    text:       { tr: String, en: String, de: String, ru: String },
    list:       { tr: String, en: String, de: String, ru: String },
    buttonText: { tr: String, en: String, de: String, ru: String },
    buttonLink: String
  },

  // 4) Burada artık doğrudan CuisineSchema kullanıyoruz
  cuisines: [CuisineSchema],

  clinaryReverseInfo: {
    image1:   String,
    image2:   String,
    subtitle: { tr: String, en: String, de: String, ru: String },
    title:    { tr: String, en: String, de: String, ru: String },
    text1:    { tr: String, en: String, de: String, ru: String },
    text2:    { tr: String, en: String, de: String, ru: String }
  },

  cuisines2: [
    {
      image:      String,
      title:      { tr: String, en: String, de: String, ru: String },
      description:{ tr: String, en: String, de: String, ru: String },
      text:       { tr: String, en: String, de: String, ru: String },
      link:       String,
      buttonText: { tr: String, en: String, de: String, ru: String }
    }
  ],

  discoverBackground: {
    image:      String,
    subtitle:   { tr: String, en: String, de: String, ru: String },
    title:      { tr: String, en: String, de: String, ru: String },
    text:       { tr: String, en: String, de: String, ru: String },
    buttonText: { tr: String, en: String, de: String, ru: String },
    link:       String
  }
});

module.exports = mongoose.models.RestaurantPage ||
                 mongoose.model("RestaurantPage", RestaurantPageSchema);
