const mongoose = require('mongoose');

const defaultLangs = ['tr', 'en', 'de', 'ru'];

const RoomContentSchema = new mongoose.Schema({
  // Çoklu dilde alanlar için örnek yapı
  subtitle: { tr: String, en: String, de: String, ru: String },
  title: { tr: String, en: String, de: String, ru: String },
  texts: [{ tr: String, en: String, de: String, ru: String }],
  image: String, // Ana banner görseli (dosya yolu)
    baby:     { type: Boolean, default: false }  // 🌟 Buraya eklendi
});

const FeatureItemSchema = new mongoose.Schema({
  text: { tr: String, en: String, de: String, ru: String },
  icon: { type: String, default: "" }, // svg adı veya font icon class (örn: "PoolSvg2" ya da "BiArea")
});

const FeatureIconTextSchema = new mongoose.Schema({
  text: { tr: String, en: String, de: String, ru: String },
 
});

const RoomFeatureSchema = new mongoose.Schema({
  span: { tr: String, en: String, de: String, ru: String },
  header: { tr: String, en: String, de: String, ru: String },
  text: { tr: String, en: String, de: String, ru: String },
  header2: { tr: String, en: String, de: String, ru: String },
  header3: { tr: String, en: String, de: String, ru: String },
  text2: { tr: String, en: String, de: String, ru: String },
  iconsTexts: [FeatureIconTextSchema], // 3 adet, sırayla Pool, Bed, BabyCrib vs.
  pool: { type: Boolean, default: false },
  items: [FeatureItemSchema],   // Özellikler dizisi, ikon ve metin
  reservation: {
    title: { tr: String, en: String, de: String, ru: String },
    text: { tr: String, en: String, de: String, ru: String },
    checkin: { tr: String, en: String, de: String, ru: String },
    checkout: { tr: String, en: String, de: String, ru: String },
    adult: { tr: String, en: String, de: String, ru: String },
    kids: { tr: String, en: String, de: String, ru: String },
    booknow: { tr: String, en: String, de: String, ru: String },
    contact: { tr: String, en: String, de: String, ru: String },
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
