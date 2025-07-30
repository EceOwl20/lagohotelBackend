// components/SpecialBannerEdit.jsx
"use client";
import { useState } from "react";

export default function SpecialBannerEdit({ data, setData, langs }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState(false);

  // Görsel upload işlemi
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${apiUrl}/api/upload`, {
      method: "POST",
      body: formData,
    });
    const { imageUrl } = await res.json();
    if (res.ok && imageUrl) {
      setData({
        ...data,
        banner: {
          ...data.banner,
          image: imageUrl,
        },
      });
    }
    setUploading(false);
  };

  // Çok dilli alan güncelleme
  const handleLangChange = (field, lang, value) => {
    setData({
      ...data,
      banner: {
        ...data.banner,
        [field]: {
          ...(data.banner?.[field] || {}),
          [lang]: value,
        },
      },
    });
  };

  const banner = data.banner || {};

  return (
    <section className="border border-gray-300 rounded-md p-4 bg-slate-50">
      <h2 className="text-[22px] font-semibold mb-4">Special Banner Düzenle</h2>

      {/* Görsel Upload */}
      <label className="block mb-4 font-semibold">
        Banner Görsel
        <input
          type="file"
          accept="image/*"
          className="mt-1 w-full"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
        {banner.image && (
          <img
            src={
              banner.image.startsWith("/")
                ? `${apiUrl}${banner.image}`
                : banner.image
            }
            alt="Banner Önizleme"
            className="mt-2 h-32 object-cover border"
          />
        )}
      </label>

      {/* Alt Başlıklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map((lang) => (
          <label key={lang} className="block font-semibold">
            Alt Başlık ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={banner.subtitle?.[lang] ?? ""}
              onChange={(e) =>
                handleLangChange("subtitle", lang, e.target.value)
              }
            />
          </label>
        ))}
      </div>

      {/* Başlıklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map((lang) => (
          <label key={lang} className="block font-semibold">
            Başlık ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={banner.title?.[lang] ?? ""}
              onChange={(e) =>
                handleLangChange("title", lang, e.target.value)
              }
            />
          </label>
        ))}
      </div>

      {/* Açıklama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map((lang) => (
          <label key={lang} className="block font-semibold">
            Açıklama ({lang.toUpperCase()})
            <textarea
              className="mt-1 w-full border rounded p-2"
              rows={3}
              value={banner.text?.[lang] ?? ""}
              onChange={(e) =>
                handleLangChange("text", lang, e.target.value)
              }
            />
          </label>
        ))}
      </div>

      {/* Buton Metinleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {langs.map((lang) => (
          <label key={lang} className="block font-semibold">
            Buton Metni ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={banner.buttonText?.[lang] ?? ""}
              onChange={(e) =>
                handleLangChange("buttonText", lang, e.target.value)
              }
            />
          </label>
        ))}
      </div>
    </section>
  );
}
