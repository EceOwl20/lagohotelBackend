"use client";
import { useMemo } from "react";

const langs = ["tr", "en", "de", "ru"];
const iconOptions = [
  "PoolSvg2", "AreaSvg", "DresserSvg", "SmokingSvg", "FridgeSvg",
  "SafeboxSvg", "HairdryerSvg", "HandsoapSvg", "TeaCoffeeSvg",
  "LedTvSvg", "BalconySvg", "ShowerSvg"
];

function makeEmptyItem(icon = "") {
  return { text: { tr: "", en: "", de: "", ru: "" }, icon };
}

export default function RoomFeaturesEdit({ data, setData }) {
  // Default state: veri eksikse eksikleri doldur
  const features = useMemo(() => {
    const raw = data.features || {};
    // iconsTexts 3 adet olmalı
    if (!Array.isArray(raw.iconsTexts) || raw.iconsTexts.length !== 3) {
      raw.iconsTexts = Array.from({ length: 3 }, (_, i) =>
        raw.iconsTexts?.[i] || { tr: "", en: "", de: "", ru: "" }
      );
    }
    // items 12 adet olmalı
    if (!Array.isArray(raw.items) || raw.items.length !== 12) {
      raw.items = [
        ...(raw.items || []).map((itm, i) => ({ ...makeEmptyItem(iconOptions[i] || ""), ...itm })),
        ...Array.from({ length: 12 - (raw.items?.length || 0) }, (_, i) => makeEmptyItem(iconOptions[(raw.items?.length || 0) + i] || ""))
      ];
    }
    // pool bool, diğer alanlar boş obje ise doldur
    return {
      subtitle: raw.subtitle || { tr: "", en: "", de: "", ru: "" },
      title: raw.title || { tr: "", en: "", de: "", ru: "" },
      text: raw.text || { tr: "", en: "", de: "", ru: "" },
      header2: raw.header2 || { tr: "", en: "", de: "", ru: "" },
      header3: raw.header3 || { tr: "", en: "", de: "", ru: "" },
      text2: raw.text2 || { tr: "", en: "", de: "", ru: "" },
      iconsTexts: raw.iconsTexts,
      pool: !!raw.pool,
      items: raw.items
    };
  }, [data.features]);

  // Her alan için güncelleme fonksiyonları:
  const handleChange = (field, value, lang) => {
    setData(prev => ({
      ...prev,
      features: {
        ...features,
        [field]: lang
          ? { ...features[field], [lang]: value }
          : value
      }
    }));
  };

  // iconsTexts için
  const handleIconTextChange = (idx, lang, value) => {
    setData(prev => ({
      ...prev,
      features: {
        ...features,
        iconsTexts: features.iconsTexts.map((icon, i) =>
          i === idx ? { ...icon, [lang]: value } : icon
        )
      }
    }));
  };

  // items için
  const handleItemChange = (idx, key, langOrValue, value) => {
    setData(prev => ({
      ...prev,
      features: {
        ...features,
        items: features.items.map((item, i) =>
          i === idx
            ? key === "text"
              ? { ...item, text: { ...item.text, [langOrValue]: value } }
              : { ...item, icon: langOrValue }
            : item
        )
      }
    }));
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">Oda Özellikleri</h3>
      {/* Ana başlıklar */}
      {["subtitle", "title", "text", "header2", "header3", "text2"].map(field => (
        <div key={field} className="mb-3">
          <label className="font-semibold block mb-1">{field}</label>
          <div className="grid grid-cols-2 gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2"
                placeholder={`${field} (${lang})`}
                value={features[field][lang] || ""}
                onChange={e => handleChange(field, e.target.value, lang)}
              />
            ))}
          </div>
        </div>
      ))}
      {/* iconsTexts */}
      <div className="mb-3">
        <label className="font-semibold block mb-1">İkon Açıklamaları</label>
        {features.iconsTexts.map((icon, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2 mb-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2"
                placeholder={`İkon ${idx + 1} (${lang})`}
                value={icon[lang] || ""}
                onChange={e => handleIconTextChange(idx, lang, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
      {/* pool */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={features.pool}
          id="pool"
          onChange={e => handleChange("pool", e.target.checked)}
        />
        <label htmlFor="pool">Havuzlu Oda</label>
      </div>

      {/* Ayraç */}
      <div className="my-8 flex flex-col items-center gap-3">
        <hr className="w-full border-lagoBrown border-t-2 my-2"/>
        <span className="text-lagoBrown text-lg font-semibold">ODANIN TÜM ÖZELLİKLERİ (Items)</span>
        <hr className="w-full border-lagoBrown border-t-2 my-2"/>
      </div>
      {/* items */}
      {features.items.map((item, idx) => (
        <div key={idx} className="mb-3 flex gap-2 items-center">
          <b className="w-10 text-gray-600">#{idx+1}</b>
          {langs.map(lang => (
            <input
              key={lang}
              className="border p-1 rounded w-1/5"
              placeholder={`Özellik metni (${lang})`}
              value={item.text?.[lang] || ""}
              onChange={e => handleItemChange(idx, "text", lang, e.target.value)}
            />
          ))}
          <select
            className="border p-1 rounded"
            value={item.icon || ""}
            onChange={e => handleItemChange(idx, "icon", e.target.value)}
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
