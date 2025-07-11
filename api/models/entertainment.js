const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  image: String,
  title: { tr: String, en: String, de: String, ru: String },
  category: { tr: String, en: String, de: String, ru: String },
  description: { tr: String, en: String, de: String, ru: String },
  link: String,
});

const entertainmentSchema = new mongoose.Schema({
  mainBanner: {
    image: String,
  },
  activitiesSection: {
    subtitle: { tr: String, en: String, de: String, ru: String },
    title: { tr: String, en: String, de: String, ru: String },
    text: { tr: String, en: String, de: String, ru: String },
    image1: String,
    image2: String,
    info1: {
      title: { tr: String, en: String, de: String, ru: String },
      text: { tr: String, en: String, de: String, ru: String }
    },
    info2: {
      title: { tr: String, en: String, de: String, ru: String },
      text: { tr: String, en: String, de: String, ru: String }
    }
  },

  entertainmentTypes: {
     subtitle: { tr: String, en: String, de: String, ru: String },
    title: { tr: String, en: String, de: String, ru: String },
    text: { tr: String, en: String, de: String, ru: String },
    activities: [activitySchema],
  },
  
  activityBackground: {
    subtitle: { tr: String, en: String, de: String, ru: String },
    title: { tr: String, en: String, de: String, ru: String },
    text: { tr: String, en: String, de: String, ru: String },
    span: { tr: String, en: String, de: String, ru: String },
    images: [String]
  }
});

module.exports = mongoose.models.EntertainmentPage || mongoose.model("EntertainmentPage", entertainmentSchema);
