// models/Room.js
const mongoose = require("mongoose");

const langField = {
  tr: String,
  en: String,
  de: String,
  ru: String
};

const roomSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // "superiorroom" vs

  // SubRoomBanner
  subRoomBanner: {
    img: String,
    span: langField,
    header: langField,
    texts: [langField],
    baby: Boolean
  },

  // Carousel
  carouselImages: [String],

  // RoomFeatures
  roomFeatures: {
    span: langField,
    header: langField,
    text: langField,
    header2: langField,
    header3: langField,
    text2: langField,
    iconsTexts: [langField],
    pool: Boolean
  },

  // ParallaxSection
  roomsParallaxSection: {
    backgroundImage: String,
    subtitle: langField,
    title: langField,
    feature1: langField,
    desc1: langField,
    feature2: langField,
    desc2: langField,
    text: langField,
    feature3: langField,
    desc3: langField,
    feature4: langField,
    desc4: langField
  },

  // RoomTour sections
  roomTours: [
    {
      span: langField,
      header: langField,
      text: langField,
      link: String
    }
  ]
});

module.exports = mongoose.model("Room", roomSchema);
