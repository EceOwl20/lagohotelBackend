const mongoose = require('mongoose');

const defaultLangs = ['tr', 'en', 'de', 'ru'];

const RoomContentSchema = new mongoose.Schema({
  // Çoklu dilde alanlar için örnek yapı
  subtitle: { tr: String, en: String, de: String, ru: String },
  title: { tr: String, en: String, de: String, ru: String },
  texts: [{ tr: String, en: String, de: String, ru: String }],
  image: String, // Ana banner görseli (dosya yolu)
});

const FeatureItemSchema = new mongoose.Schema({
  text: defaultLangs,
  icon: { type: String, default: "" }, // svg adı veya font icon class (örn: "PoolSvg2" ya da "BiArea")
});

const RoomFeatureSchema = new mongoose.Schema({
  span: defaultLangs,
  header: defaultLangs,
  text: defaultLangs,
  header2: defaultLangs,
  header3: defaultLangs,
  text2: defaultLangs,
  iconsTexts: [defaultLangs], // 3 adet, sırayla Pool, Bed, BabyCrib vs.
  pool: { type: Boolean, default: false },
  items: [FeatureItemSchema],   // Özellikler dizisi, ikon ve metin
  reservation: {
    title: defaultLangs,
    text: defaultLangs,
    checkin: defaultLangs,
    checkout: defaultLangs,
    adult: defaultLangs,
    kids: defaultLangs,
    booknow: defaultLangs,
    contact: defaultLangs,
    phone: { type: String, default: "" },
  }
});

const BackgroundSectionSchema = new mongoose.Schema({
  subtitle: { tr: String, en: String, de: String, ru: String },
  title: { tr: String, en: String, de: String, ru: String },
  texts: [{ tr: String, en: String, de: String, ru: String }],
  image: { type: String, default: "" }, 
  link: { type: String, default: "" },
});

const RoomTourSchema = new mongoose.Schema({
  subtitle: { tr: String, en: String, de: String, ru: String },
  title: { tr: String, en: String, de: String, ru: String },
  text: { tr: String, en: String, de: String, ru: String },
  link: String,
});

const SubRoomSchema = new mongoose.Schema({
  slug: { type: String, unique: true }, // oda adı
  banner: RoomContentSchema,
  carousel: [String], // resim url dizisi
  features: RoomFeatureSchema,
  background: BackgroundSectionSchema,
  tours: [RoomTourSchema],
});

module.exports = mongoose.model('SubRoom', SubRoomSchema);
