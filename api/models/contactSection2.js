const mongoose = require("mongoose");

const MultiLangString = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

const ContactSection2Schema = new mongoose.Schema({
  subtitle: MultiLangString,
  title: MultiLangString,
  address: MultiLangString,
  phone: MultiLangString,
  callcenter: MultiLangString,
  email: MultiLangString,
  buttonText: MultiLangString,
  social: {
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    youtube: { type: String, default: "" },
    meta: { type: String, default: "" }
  },
  image: { type: String, default: "" },   
});

module.exports = mongoose.model("ContactSection2", ContactSection2Schema);
