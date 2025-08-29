// models/CookiePage.js
const mongoose = require("mongoose");

const MultiLangSchema = new mongoose.Schema(
  { tr:{type:String,default:""}, en:{type:String,default:""}, de:{type:String,default:""}, ru:{type:String,default:""} },
  { _id:false }
);

const BarTextsSchema = new mongoose.Schema(
  {
    cookie: { type: MultiLangSchema, default: () => ({}) },
    cookieText: { type: MultiLangSchema, default: () => ({}) },
    read: { type: MultiLangSchema, default: () => ({}) },
    about: { type: MultiLangSchema, default: () => ({}) },
    deny: { type: MultiLangSchema, default: () => ({}) },
    accept: { type: MultiLangSchema, default: () => ({}) },
    manage: { type: MultiLangSchema, default: () => ({}) },
  },
  { _id:false }
);

const TabSchema = new mongoose.Schema(
  {
    key: { type:String, default:"" },
    title: { type: MultiLangSchema, default: () => ({}) },
    content: { type: MultiLangSchema, default: () => ({}) },
  },
  { _id:false }
);

const ToggleSchema = new mongoose.Schema(
  {
    key: { type:String, default:"" },
    title: { type: MultiLangSchema, default: () => ({}) },
    description: { type: MultiLangSchema, default: () => ({}) },
  },
  { _id:false }
);

const CookiePageSchema = new mongoose.Schema(
  {
    slug: { type:String, default:"cookies", unique:true },
    barTexts: { type: BarTextsSchema, default: () => ({}) },
    tabs: { type: [TabSchema], default: [] },
    toggles: { type: [ToggleSchema], default: [] },
  },
  { timestamps:true }
);

// 🔧 Doğru export (tek satır)
module.exports =
  mongoose.models.CookiePage || mongoose.model("CookiePage", CookiePageSchema);