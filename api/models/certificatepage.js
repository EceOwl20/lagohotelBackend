const mongoose = require("mongoose");

const LangString = new mongoose.Schema(
  { tr: {type:String, default:""}, en:{type:String, default:""}, de:{type:String, default:""}, ru:{type:String, default:""} },
  { _id:false }
);

const BannerSchema = new mongoose.Schema(
  {
    image: { type:String, default:"" },
    span: { type:LangString, default:() => ({}) },
    header: { type:LangString, default:() => ({}) },
    opacity: { type:Boolean, default:false }
  },
  { _id:false }
);

const Section1Schema = new mongoose.Schema(
  {
    image: { type:String, default:"" },
    subtitle: { type:LangString, default:() => ({}) },
    title: { type:LangString, default:() => ({}) },
    text: { type:LangString, default:() => ({}) }
  },
  { _id:false }
);

const CertificatesSchema = new mongoose.Schema(
  {
    images: { type:[String], default:[] }
  },
  { _id:false }
);

const CertificatePageSchema = new mongoose.Schema(
  {
    slug: { type:String, required:true, unique:true }, // <— eklendi
    banner: { type:BannerSchema, default:() => ({}) },
    section1: { type:Section1Schema, default:() => ({}) },
    certificates: { type:CertificatesSchema, default:() => ({}) }
  },
  { timestamps:true, collection:"certificatepage" }
);

module.exports =
  mongoose.models.CertificatePage ||
  mongoose.model("CertificatePage", CertificatePageSchema);
