const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema({
  slug: { type: String, default: "homepage" },

  hero: {
    videoDesktop: String,
    videoMobile: String
  },

  section1: {
    subtitle: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    title: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    text: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    discoverMoreLink: String
  },

  slider: [
    {
      image: String,
      title: {
        tr: String,
        en: String,
        de: String,
        ru: String
      },
      link: {
        tr: String,
        en: String,
        de: String,
        ru: String
      }
    }
  ],

  animationSection: {
    subtitle: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    title: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    text: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    text2: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    buttonText: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    buttonLink: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    imageLeft: String,
    imageRight: String
  },

  accommodation: {
    subtitle: {
      tr: String, en: String, de: String, ru: String
    },
    title: {
      tr: String, en: String, de: String, ru: String
    },
    rooms: [
      {
        image: String,
        title: { tr: String, en: String, de: String, ru: String },
        description: { tr: String, en: String, de: String, ru: String },
        area: { tr: String, en: String, de: String, ru: String },
        view: { tr: String, en: String, de: String, ru: String },
        buttonText: { tr: String, en: String, de: String, ru: String, },
        link: String
      }
    ]
  },

  essentials: {
    subtitle: String,
    title: String,
    items: [
      {
        title: String,
        description: String,
        icon: String, // ikon adı ya da SVG adı
        link: String
      }
    ],
    buttonText: String,
    buttonLink: String
  },

  contact: {
    subtitle: String,
    title: String,
    addressHtml: String,
    buttonText: String,
    instagram: String,
    facebook: String,
    youtube: String,
    mapImages: [String]
  },

  banner: {
    subtitle: String,
    title: String,
    text: String,
    discoverMoreText: String,
    discoverMoreLink: String,
    backgroundImage: String
  }
});

module.exports = mongoose.model("HomePage", homepageSchema);