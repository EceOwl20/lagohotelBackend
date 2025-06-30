const mongoose = require('mongoose');

const defaultLangs = ['tr', 'en', 'de', 'ru'];

const RoomContentSchema = new mongoose.Schema({
  // Çoklu dilde alanlar için örnek yapı
  subtitle: { tr: String, en: String, de: String, ru: String },
  title: { tr: String, en: String, de: String, ru: String },
  texts: [{ tr: String, en: String, de: String, ru: String }],
  image: String, // Ana banner görseli (dosya yolu)
});

const RoomFeatureSchema = new mongoose.Schema({
  subtitle: { tr: String, en: String, de: String, ru: String },
  title: { tr: String, en: String, de: String, ru: String },
  text: { tr: String, en: String, de: String, ru: String },
  header2: { tr: String, en: String, de: String, ru: String },
  header3: { tr: String, en: String, de: String, ru: String },
  text2: { tr: String, en: String, de: String, ru: String },
  iconsTexts: [{ tr: String, en: String, de: String, ru: String }],
  pool: Boolean,
});

const BackgroundSectionSchema = new mongoose.Schema({
  subtitle: { tr: String, en: String, de: String, ru: String },
  title: { tr: String, en: String, de: String, ru: String },
  texts: [{ tr: String, en: String, de: String, ru: String }],
  img: String,
  link: String,
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
