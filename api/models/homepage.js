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
    discoverMoreLink: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
    discoverMoreText: {
      tr: String,
      en: String,
      de: String,
      ru: String
    },
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
  subtitle: {
    tr: String,
    en: String,
    de: String,
    ru: String,
  },
  title: {
    tr: String,
    en: String,
    de: String,
    ru: String,
  },
  items: [
    {
      title: {
        tr: String,
        en: String,
        de: String,
        ru: String,
      },
      description: {
        tr: String,
        en: String,
        de: String,
        ru: String,
      },
      icon: String, // Örn: "Beach", "Pool" - burada string olacak
      link: String,
      // buttonText istersen buraya da eklenebilir
    }
  ],
  buttonText: {
    tr: String,
    en: String,
    de: String,
    ru: String,
  },
  buttonLink: {
    tr: String,
    en: String,
    de: String,
    ru: String,
  }
},


  contact: {
  subtitle: { tr: String, en: String, de: String, ru: String },
  title: { tr: String, en: String, de: String, ru: String },
  addressHtml: { tr: String, en: String, de: String, ru: String },
  buttonText: { tr: String, en: String, de: String, ru: String },

  // Eklenen alanlar
  phoneLabel:   { tr: String, en: String, de: String, ru: String },
  emailLabel:   { tr: String, en: String, de: String, ru: String },
  callcenterLabel: { tr: String, en: String, de: String, ru: String },

  // Karşılık gelen bilgiler tekil (her dilde aynı)
  phone: String,
  email: String,
  callcenter: String,

  // Sosyal medya (tekil string, çok dilli değil)
  instagram: String,
  facebook: String,
  youtube: String,
   backgroundImage: String,
  galleryImage: String
},

  banner: {
    subtitle: { tr: String, en: String, de: String, ru: String },
    title: { tr: String, en: String, de: String, ru: String },
    text: { tr: String, en: String, de: String, ru: String },
    discoverMoreText: { tr: String, en: String, de: String, ru: String },
    discoverMoreLink: { tr: String, en: String, de: String, ru: String },
    backgroundImage: String
  }
});

module.exports = mongoose.model("HomePage", homepageSchema);