// models/SuperiorRoom.js
const mongoose = require("mongoose");

const superiorRoomSchema = new mongoose.Schema({
slug: { type: String, default: "superiorroom" },

// SubRoomBanner
subRoomBanner: {
img: String,
span: { tr: String, en: String, de: String, ru: String },
header: { tr: String, en: String, de: String, ru: String },
texts: [{ tr: String, en: String, de: String, ru: String }],
baby: Boolean
},

// Carousel
carouselImages: [String],

// RoomFeatures
roomFeatures: {
span: { tr: String, en: String, de: String, ru: String },
header: { tr: String, en: String, de: String, ru: String },
text: { tr: String, en: String, de: String, ru: String },
header2: { tr: String, en: String, de: String, ru: String },
header3: { tr: String, en: String, de: String, ru: String },
text2: { tr: String, en: String, de: String, ru: String },
iconsTexts: [{ tr: String, en: String, de: String, ru: String }],
pool: Boolean
},

// ParallaxSection (reuse existing)
roomsParallaxSection: {
backgroundImage: String,
subtitle: { tr: String, en: String, de: String, ru: String },
title: { tr: String, en: String, de: String, ru: String },
feature1: { tr: String, en: String, de: String, ru: String },
desc1: { tr: String, en: String, de: String, ru: String },
feature2: { tr: String, en: String, de: String, ru: String },
desc2: { tr: String, en: String, de: String, ru: String },
text: { tr: String, en: String, de: String, ru: String },
feature3: { tr: String, en: String, de: String, ru: String },
desc3: { tr: String, en: String, de: String, ru: String },
feature4: { tr: String, en: String, de: String, ru: String },
desc4: { tr: String, en: String, de: String, ru: String }
},

// RoomTour sections
roomTours: [{
span: { tr: String, en: String, de: String, ru: String },
header: { tr: String, en: String, de: String, ru: String },
text: { tr: String, en: String, de: String, ru: String },
link: String
}] 
});

module.exports =  mongoose.model("SuperiorRoom", superiorRoomSchema);

