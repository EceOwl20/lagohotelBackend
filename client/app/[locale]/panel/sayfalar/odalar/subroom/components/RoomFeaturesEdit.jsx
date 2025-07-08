"use client";
import React from "react";

const langs = ["tr", "en", "de", "ru"];
const iconOptions = [
  "PoolSvg2","AreaSvg","DresserSvg","SmokingSvg","FridgeSvg",
  "SafeboxSvg","HairdryerSvg","HandsoapSvg","TeaCoffeeSvg",
  "LedTvSvg","BalconySvg","ShowerSvg"
];

export default function RoomFeaturesEdit({ data, setData }) {
  const raw = data.features || {};

  // normalize
  const features = {
    span:    raw.span    || langs.reduce((o,l)=>(o[l]="",o),{}),
    header:  raw.header  || langs.reduce((o,l)=>(o[l]="",o),{}),
    text:    raw.text    || langs.reduce((o,l)=>(o[l]="",o),{}),
    header2: raw.header2 || langs.reduce((o,l)=>(o[l]="",o),{}),
    header3: raw.header3 || langs.reduce((o,l)=>(o[l]="",o),{}),
    text2:   raw.text2   || langs.reduce((o,l)=>(o[l]="",o),{}),

    // 👇 iconsTexts şimdi schema'ya uygun: { text: {tr,en,de,ru} } objeleri
    iconsTexts: Array.isArray(raw.iconsTexts) && raw.iconsTexts.length === 3
      ? raw.iconsTexts.map(it => ({
          text: langs.reduce((o,l)=>(o[l]=it.text?.[l]||"",o),{})
        }))
      : Array.from({length:3},()=>({
          text: langs.reduce((o,l)=>(o[l]="",o),{})
        })),

    pool: !!raw.pool,

    // 👇 items: { text:{…}, icon:string }
    items: Array.isArray(raw.items) && raw.items.length === 12
      ? raw.items.map((it,i)=>({
          text: langs.reduce((o,l)=>(o[l]=it.text?.[l]||"",o),{}),
          icon: iconOptions.includes(it.icon) ? it.icon : iconOptions[i]
        }))
      : Array.from({length:12},(_,i)=>({
          text: langs.reduce((o,l)=>(o[l]="",o),{}),
          icon: iconOptions[i] || ""
        }))
  };

  // helper setters
  const setFeatures = newFields =>
    setData(prev => ({ ...prev, features: { ...features, ...newFields } }));

  // güncelleyiciler
  const updateLang = (field, lang, val) =>
    setFeatures({ [field]: { ...features[field], [lang]: val } });

  const togglePool = () =>
    setFeatures({ pool: !features.pool });

  const updateIconText = (idx, lang, val) =>
    setFeatures({
      iconsTexts: features.iconsTexts.map((it,i)=> i===idx
        ? { text: { ...it.text, [lang]: val } }
        : it
      )
    });

  const updateItemText = (idx, lang, val) =>
    setFeatures({
      items: features.items.map((it,i)=>
        i===idx
          ? { ...it, text: { ...it.text, [lang]: val } }
          : it
      )
    });

  const updateItemIcon = (idx, icon) =>
    setFeatures({
      items: features.items.map((it,i)=>
        i===idx
          ? { ...it, icon }
          : it
      )
    });

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">Oda Özellikleri</h3>

      {/* span, header, text vs */}
      {["span","header","text","header2","header3","text2"].map(field => (
        <div key={field} className="mb-4">
          <label className="font-semibold block mb-1">{field}</label>
          <div className="grid grid-cols-4 gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2 rounded w-full"
                placeholder={`${field} (${lang})`}
                value={features[field][lang] || ""}
                onChange={e => updateLang(field, lang, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* ikon açıklamaları */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">İkon Açıklamaları</label>
        {features.iconsTexts.map((it, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-2 mb-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2 rounded w-full"
                placeholder={`İkon ${idx+1} (${lang})`}
                value={it.text[lang] || ""}
                onChange={e => updateIconText(idx, lang, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* pool checkbox */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="pool"
          checked={features.pool}
          onChange={togglePool}
        />
        <label htmlFor="pool">Havuzlu Oda</label>
      </div>

      {/* items */}
      <h4 className="font-semibold mb-2">Odanın Tüm Özellikleri</h4>
      {features.items.map((it, idx) => (
        <div key={idx} className="mb-3 flex gap-2 items-center">
          <div className="w-6 text-gray-600">#{idx+1}</div>
          {langs.map(lang => (
            <input
              key={lang}
              className="border p-2 rounded w-1/5"
              placeholder={`Metin (${lang})`}
              value={it.text[lang] || ""}
              onChange={e => updateItemText(idx, lang, e.target.value)}
            />
          ))}
          <select
            className="border p-2 rounded"
            value={it.icon}
            onChange={e => updateItemIcon(idx, e.target.value)}
          >
            <option value="">İkon Seç</option>
            {iconOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
