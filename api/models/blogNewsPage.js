const mongoose = require("mongoose");

const LangString = new mongoose.Schema(
  { tr: String, en: String, de: String, ru: String },
  { _id: false }
);

const BannerSchema = new mongoose.Schema(
  {
    image: String,
    subtitle: LangString,
    title: LangString
  },
  { _id: false }
);

const SectionSchema = new mongoose.Schema(
  {
    leftImg: String,
    rightImg: String,
    subtitle: LangString,
    title: LangString,
    text: LangString,
    secsubtitle1: LangString,
    sectitle1: LangString,
    sectext1: LangString,
    secsubtitle2: LangString,
    sectitle2: LangString,
    sectext2: LangString
  },
  { _id: false }
);

const NewsItemSchema = new mongoose.Schema(
  {
    image: String,
    subtitle: LangString,
    title: LangString,
    description: LangString,
    link: String
  },
  { _id: false }
);

const BlogNewsPageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    banner: BannerSchema,
    section: SectionSchema,
    newsItems: [NewsItemSchema],
    buttonText: LangString
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.BlogNewsPage ||
  mongoose.model("BlogNewsPage", BlogNewsPageSchema);
