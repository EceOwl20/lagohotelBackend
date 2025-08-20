
import React from "react";
import MultiImageUploadInput from "../../../components/MultiImageUploadInput";

export default function ActivityBackgroundEdit({ data, setData, langs }) {
  const value = data.activityBackground || {};

  const handleRemoveImage = (idx) => {
    setData({
      ...data,
      activityBackground: {
        ...value,
        images: (value.images || []).filter((_, i) => i !== idx)
      }
    });
  };

  const handleLangChange = (field, lang, val) => {
    setData({
      ...data,
      activityBackground: {
        ...value,
        [field]: { ...(value[field] || {}), [lang]: val }
      }
    });
  };

  const handleImagesChange = (images) => {
    setData({
      ...data,
      activityBackground: {
        ...value,
        images: images
      }
    });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Galeri & Arka Plan</h4>

      {langs.map(lang => (
        <div key={lang} className="mb-4">
          <label className="block font-semibold">Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={value.subtitle?.[lang] || ""}
            onChange={e => handleLangChange("subtitle", lang, e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block font-semibold">Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={value.title?.[lang] || ""}
            onChange={e => handleLangChange("title", lang, e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block font-semibold">Açıklama ({lang.toUpperCase()})</label>
          <textarea
            value={value.text?.[lang] || ""}
            onChange={e => handleLangChange("text", lang, e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block font-semibold">Ek Bilgi (span) ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={value.span?.[lang] || ""}
            onChange={e => handleLangChange("span", lang, e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      {/* Yeni Galeri Yükleme Bileşeni */}
      <div className="mt-6">
        <MultiImageUploadInput
          value={value.images || []}
          onChange={handleImagesChange}
          label="Galeri Görselleri"
        />
      </div>
    </div>
  );
}
