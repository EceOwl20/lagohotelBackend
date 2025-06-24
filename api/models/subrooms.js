// models/Room.js
const mongoose = require('mongoose');
const localizedString = { tr: String, en: String, de: String, ru: String };

const roomSchema = new mongoose.Schema({
  slug:        { type: String, unique: true },
  // Banner
  banner: {
    img:         String,
    header:      localizedString,
    buttons: [{
      text:         localizedString,
      link:         String
    }]
  },
  // Info Section
  infoSection: {
    subtitle: localizedString,
    title:    localizedString,
    text:     localizedString,
    checkin:  localizedString,
    checkout: localizedString
  },
  // Sections (Array of repeatable sections)
  sections: [{
    img:        String,
    img2:       String,
    header:     localizedString,
    subtitle:   localizedString,
    m:          localizedString,
    view:       localizedString,
    buttonText: localizedString,
    link:       String
  }],
  // Parallax
  parallax: {
    backgroundImage: String,
    subtitle:        localizedString,
    title:           localizedString,
    features: [{
      title: localizedString,
      desc:  localizedString
    }]
  },
  // Tours
  tours: [{
    subtitle: localizedString,
    title:    localizedString,
    text:     localizedString,
    link:     String
  }]
});

module.exports = mongoose.models.Room || mongoose.model('Subroom', roomSchema);