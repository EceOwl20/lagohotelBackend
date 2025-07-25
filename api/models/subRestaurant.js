// models/Subrestaurant.js
const mongoose = require("mongoose");
const MultiLangString = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

const SubrestaurantSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  mainBanner: {
    image: { type: String, default: "" },
    subtitle: MultiLangString,
    title: MultiLangString,
    text: MultiLangString,
  },
  infoSection: {
    subtitle: MultiLangString,
    title: MultiLangString,
    text1: MultiLangString,
    text2: MultiLangString,
    image1: { type: String, default: "" },
    image2: { type: String, default: "" }
  },
  carousel: [{ type: String, default: "" }],


    otheroptions: {
    title: MultiLangString,
    subtitle: MultiLangString,
    text: MultiLangString,
  restaurants: [
    {
      title: MultiLangString,
      description: MultiLangString,
      text: MultiLangString,
      buttonText: MultiLangString,
      link: String,
      image: String,
    }
  ],
  },

  cuisines: [
    {
      image: { type: String, default: "" },
      title: MultiLangString,
      description: MultiLangString,
      text: MultiLangString,
      link: { type: String, default: "" },
      buttonText: MultiLangString,
    }
  ],

  
  background: {
    subtitle: MultiLangString,
    title: MultiLangString,
    text: MultiLangString,
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    buttonText: MultiLangString,
  },
});

module.exports = mongoose.model("Subrestaurant", SubrestaurantSchema);
