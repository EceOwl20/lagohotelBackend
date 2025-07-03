const mongoose = require("mongoose");

const MultiLangString = {
  tr: { type: String, default: "" },
  en: { type: String, default: "" },
  de: { type: String, default: "" },
  ru: { type: String, default: "" }
};

const RoomOptionSchema = new mongoose.Schema({
  img: { type: String, default: "" }, // /uploads/xxx.webp
  title: MultiLangString,
  description: MultiLangString,
  size: MultiLangString,
  capacity: MultiLangString,
  text: MultiLangString,
  link: { type: String, default: "" }
});

const OtherOptionsSchema = new mongoose.Schema({
  span: MultiLangString,
  title: MultiLangString,
  buttonText: MultiLangString,
  rooms: [RoomOptionSchema]
});

module.exports = mongoose.model("OtherOptions", OtherOptionsSchema);
