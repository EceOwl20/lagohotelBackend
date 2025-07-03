const mongoose = require("mongoose");

const MultiLangString = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

const FeatureItemSchema = new mongoose.Schema({
  text: MultiLangString,
  icon: { type: String, default: "" }, // svg adı veya font icon class (örn: "PoolSvg2" ya da "BiArea")
});

const RoomFeaturesSchema = new mongoose.Schema({
  span: MultiLangString,
  header: MultiLangString,
  text: MultiLangString,
  header2: MultiLangString,
  header3: MultiLangString,
  text2: MultiLangString,
  iconsTexts: [MultiLangString], // 3 adet, sırayla Pool, Bed, BabyCrib vs.
  pool: { type: Boolean, default: false },
  items: [FeatureItemSchema],   // Özellikler dizisi, ikon ve metin
  reservation: {
    title: MultiLangString,
    text: MultiLangString,
    checkin: MultiLangString,
    checkout: MultiLangString,
    adult: MultiLangString,
    kids: MultiLangString,
    booknow: MultiLangString,
    contact: MultiLangString,
    phone: { type: String, default: "" },
  }
});

module.exports = mongoose.model("RoomFeatures", RoomFeaturesSchema);
