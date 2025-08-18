
const mongoose = require("mongoose");

const LangMapSchema = new mongoose.Schema(
  {
    tr: { type: String, default: "" },
    en: { type: String, default: "" },
    de: { type: String, default: "" },
    ru: { type: String, default: "" },
  },
  { _id: false }
);

const PlaceSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" }, // "/uploads/..." veya tam URL
    title: { type: LangMapSchema, default: () => ({}) },
    text: { type: LangMapSchema, default: () => ({}) },
    distance: { type: String, default: "" }, // "5 km" vb.
  },
  { _id: false }
);

const SustainabilitySchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, index: true, required: true }, 
    banner: {
      image: { type: String, default: "" },
      subtitle: { type: LangMapSchema, default: () => ({}) },
      title: { type: LangMapSchema, default: () => ({}) },
    },
    documentUrl: { type: String, default: "" },
    places: { type: [PlaceSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sustainability", SustainabilitySchema);