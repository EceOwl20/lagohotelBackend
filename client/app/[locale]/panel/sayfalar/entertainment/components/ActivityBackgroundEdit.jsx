"use client";
import React, { useState } from "react";

export default function ActivityBackgroundEdit({ data, setData, langs }) {
  const value = data.activityBackground || {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState(false);

  // Birden fazla dosya seçip upload edebilmek için multiple
  const handleAddImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await fetch(`${apiUrl}/api/upload`, {
          method: "POST",
          body: formData
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
        // backend result.imageUrl veya result.path
        const url = result.imageUrl || result.path;
        if (url) uploadedUrls.push(url);
      } catch (err) {
        console.error("Galerie upload hatası:", err);
      }
    }

    setData({
      ...data,
      activityBackground: {
        ...value,
        images: [...(value.images || []), ...uploadedUrls]
      }
    });
    setUploading(false);
    // input'u temizle ki aynı dosyayı tekrar seçebil
    e.target.value = "";
  };

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

      <label className="block font-semibold mt-4 mb-2">Galeri Görselleri</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleAddImages}
        disabled={uploading}
        className="block mb-3"
      />
      {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}

      <div className="flex gap-2 flex-wrap">
        {(value.images || []).map((img, idx) => {
          const src = img.startsWith("/") ? `${apiUrl}${img}` : img;
          return (
            <div key={idx} className="relative w-[120px] h-[80px]">
              <img
                src={src}
                alt={`Galeri ${idx + 1}`}
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
              >
                Sil
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
