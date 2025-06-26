// models/BeachPools.js

const defaultLangs = ['tr', 'en', 'de', 'ru'];

function emptyPool() {
  return {
    image: "",
    hoverImage: "",
    subtitle: defaultLangs.reduce((obj, l) => ({ ...obj, [l]: "" }), {}),
    title:    defaultLangs.reduce((obj, l) => ({ ...obj, [l]: "" }), {}),
    description: defaultLangs.reduce((obj, l) => ({ ...obj, [l]: "" }), {}),
  };
}

module.exports = {
  collection: "beachpools",
  schema: {
   mainBanner: {
  desktop: {
    girlImage:   "/upload/girl.webp",
    textImage:   "/upload/beachtext.webp",
    waveImage:   "/upload/wave.webp",
    subtitle:    { tr: String, en: String, de: String, ru: String },
    title:       { tr: String, en: String, de: String, ru: String },
    text:        { tr: String, en: String, de: String, ru: String },
    buttonText:  { tr: String, en: String, de: String, ru: String }
  },
  mobile: {
    bgImage:     "/upload/beachmobile.png",
    subtitle:    {tr: String, en: String, de: String, ru: String },
    mobileTitle: { tr: String, en: String, de: String, ru: String },
    text:        { tr: String, en: String, de: String, ru: String }
  }
},
    clinaryInfo: {
      image1: String,
      image2: String,
      subtitle: { tr: String, en: String, de: String, ru: String },
      title:    { tr: String, en: String, de: String, ru: String },
      texts:    { tr: [String], en: [String], de: [String], ru: [String] },
    },
    imageBackground: {
      image: String,
      subtitle: { tr: String, en: String, de: String, ru: String },
      title:    { tr: String, en: String, de: String, ru: String },
      text1:    { tr: String, en: String, de: String, ru: String },
      text2:    { tr: String, en: String, de: String, ru: String },
      icon1Text: { tr: String, en: String, de: String, ru: String },
      icon2Text: { tr: String, en: String, de: String, ru: String }
    },
    carousel: [
      {
        image: String,
        title: { tr: String, en: String, de: String, ru: String },
        span:  { tr: String, en: String, de: String, ru: String }
      }
    ],
    poolSection: {
      subtitle: { tr: String, en: String, de: String, ru: String },
      title:    { tr: String, en: String, de: String, ru: String },
      text:     { tr: String, en: String, de: String, ru: String },
      video:    String // mp4 url
    },
    poolList: [
      {
        image: String,
        hoverImage: String,
        subtitle: { tr: String, en: String, de: String, ru: String },
        title:    { tr: String, en: String, de: String, ru: String },
        description: { tr: String, en: String, de: String, ru: String }
      }
    ]
  },
  empty: () => ({
    mainBanner: {
      image: "",
      subtitle: {}, title: {}, text: {}, buttonText: {}
    },
    clinaryInfo: {
      image1: "", image2: "",
      subtitle: {}, title: {}, texts: {}
    },
    imageBackground: {
      image: "",
      subtitle: {}, title: {}, text1: {}, text2: {},
      icon1Text: {}, icon2Text: {}
    },
    carousel: [],
    poolSection: { subtitle: {}, title: {}, text: {}, video: "" },
    poolList: []
  })
};
