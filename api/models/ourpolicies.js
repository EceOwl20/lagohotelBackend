// models/OurPoliciesPage.js
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

const ParagraphSchema = new mongoose.Schema(
  {
    text: { type: LangMapSchema, default: () => ({}) },
  },
  { _id: false }
);

const InfoBlockSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },          // "/uploads/..." veya tam URL
    isImageLeft: { type: Boolean, default: false }, // Görsel solda mı?
    span: { type: LangMapSchema, default: () => ({}) },
    title: { type: LangMapSchema, default: () => ({}) },
    text: { type: LangMapSchema, default: () => ({}) },
    text2: { type: LangMapSchema, default: () => ({}) },
    showLink: { type: Boolean, default: false }, // ihtiyaç olursa
    link: { type: String, default: "" },         // ihtiyaç olursa
  },
  { _id: false }
);

const TrainingSchema = new mongoose.Schema(
  {
    label: { type: LangMapSchema, default: () => ({}) }, // “Yangın Eğitimi” vb. çok dilli
    href: { type: String, default: "" },                 // /documents/xxx.pptx
  },
  { _id: false }
);

const OurPoliciesPageSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, index: true, required: true }, // "ourpolicies"
    banner: {
      image: { type: String, default: "" },
      subtitle: { type: LangMapSchema, default: () => ({}) },
      title: { type: LangMapSchema, default: () => ({}) },
    },
    sustainabilityPolicy: {
      paragraphs: { type: [ParagraphSchema], default: [] }, // Sürdürülebilirlik metin paragrafları
    },
    infoBlocks: { type: [InfoBlockSchema], default: [] },   // Çevre/İSG/Çocuk vb. tüm InfoSection’lar
    trainings: { type: [TrainingSchema], default: [] },     // Eğitim linkleri
  },
  { timestamps: true }
);

module.exports = mongoose.model("OurPoliciesPage", OurPoliciesPageSchema);