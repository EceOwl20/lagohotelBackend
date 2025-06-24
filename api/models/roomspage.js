const mongoose = require("mongoose");

const roomsPageSchema = new mongoose.Schema({
  slug: { type: String, default: "rooms" },

  // ----------------------
  // RoomsBanner bileşeni
  // ----------------------
  roomsBanner: {
    header:       { tr: String, en: String, de: String, ru: String },
    buttonText1:  { tr: String, en: String, de: String, ru: String },
    buttonText2:  { tr: String, en: String, de: String, ru: String },
    buttonText3:  { tr: String, en: String, de: String, ru: String },
    buttonText4:  { tr: String, en: String, de: String, ru: String },
    buttonText5:  { tr: String, en: String, de: String, ru: String },
    buttonText6:  { tr: String, en: String, de: String, ru: String },
    buttonText7:  { tr: String, en: String, de: String, ru: String },
    bannerImage:  String  // örn: "/images/roomsBanner.png"
  },

  // --------------------------
  // RoomsInfoSection bileşeni
  // --------------------------
  roomsInfoSection: {
    subtitle: { tr: String, en: String, de: String, ru: String },
    title:    { tr: String, en: String, de: String, ru: String },
    text:     { tr: String, en: String, de: String, ru: String },
    checkin:  { tr: String, en: String, de: String, ru: String },
    checkout: { tr: String, en: String, de: String, ru: String }
  },

  // ----------------------------------------
  // Bölümler: Superior, Family, SwimUp, …, 7.
  // ----------------------------------------
  roomSection1: {
    title:      { tr: String, en: String, de: String, ru: String },
    subtitle:   { tr: String, en: String, de: String, ru: String },
    m:          { tr: String, en: String, de: String, ru: String },
    view:       { tr: String, en: String, de: String, ru: String },
    buttonText: { tr: String, en: String, de: String, ru: String },
    img:        String,
    img2:       String
  },
  roomSection2: {
    title:      { tr: String, en: String, de: String, ru: String },
    subtitle:   { tr: String, en: String, de: String, ru: String },
    m:          { tr: String, en: String, de: String, ru: String },
    view:       { tr: String, en: String, de: String, ru: String },
    buttonText: { tr: String, en: String, de: String, ru: String },
    img:        String,
    img2:       String
  },
  roomSection3: { /* aynı yapı */ },
  roomSection4: { /* … */ },
  roomSection5: { /* … */ },
  roomSection6: { /* … */ },
  roomSection7: { /* … */ },

  // ------------------------------------------
  // RoomsParallaxSection bileşeni için ek bölüm
  // ------------------------------------------
  roomsParallaxSection: {
    backgroundImage: String, // örn: "/images/oda.png"
    subtitle: { tr: String, en: String, de: String, ru: String },
    title:    { tr: String, en: String, de: String, ru: String },
    feature1: { tr: String, en: String, de: String, ru: String },
    desc1:    { tr: String, en: String, de: String, ru: String },
    feature2: { tr: String, en: String, de: String, ru: String },
    desc2:    { tr: String, en: String, de: String, ru: String },
    text:     { tr: String, en: String, de: String, ru: String },
    feature3: { tr: String, en: String, de: String, ru: String },
    desc3:    { tr: String, en: String, de: String, ru: String },
    feature4: { tr: String, en: String, de: String, ru: String },
    desc4:    { tr: String, en: String, de: String, ru: String }
  }
});

module.exports = mongoose.models.RoomsPage || mongoose.model("Rooms", roomsPageSchema); 