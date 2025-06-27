const mongoose = require("mongoose");

const connectPageSchema = new mongoose.Schema({
  connect1: {
    image: String,
    subtitle: { tr: String, en: String, de: String, ru: String },
    title:    { tr: String, en: String, de: String, ru: String },
    text:     { tr: String, en: String, de: String, ru: String },
    phones:   [String],
    emails:   [String],
    address:  { tr: String, en: String, de: String, ru: String },
  },
  connect2: {
    image: String,
    formTitle:   { tr: String, en: String, de: String, ru: String },
    formText:    { tr: String, en: String, de: String, ru: String },
    policyText:  { tr: String, en: String, de: String, ru: String },
  },
  connect3: {
    addressHeader: { tr: String, en: String, de: String, ru: String },
    addressText:   { tr: String, en: String, de: String, ru: String },
    mapEmbedUrl:   String
  },
});

module.exports = mongoose.models.ConnectPage || mongoose.model("ConnectPage", connectPageSchema);
