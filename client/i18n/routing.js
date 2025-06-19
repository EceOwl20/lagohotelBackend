import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['tr', 'en','de', 'ru'],
 
  // Used when no locale matches
  defaultLocale: 'tr',
  localeDetection: true,
  localePrefix : "always",
  pathnames : {
    "/": {
      tr: "/",
      en: "/",
      de: "/",
    ru: "/",
    },

    "/contact": {
      en: "/contact",
      de: "/kontakt",
      tr: "/iletisim",
      ru: "/kontakti",
    },

    "/beachpools": {
      en: "/beach-pool",
      de: "/strand-pool",
      tr: "/plaj-havuz",
      ru: "/plaj-basseyn",
    },

    "/rooms": {
    en: "/rooms",
    de: "/zimmer",
    tr: "/odalar",
    ru: "/nomera",
  },

  "/rooms/superiorroom": {
    en: "/rooms/superiorroom",
    de: "/zimmer/superiorzimmer",
    tr: "/odalar/superioroda",
    ru: "/nomera/Номерsuperior",
  },


  }})