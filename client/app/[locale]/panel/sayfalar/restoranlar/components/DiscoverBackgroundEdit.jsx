"use client";
import { useState } from "react";

const dilAdlari = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function DiscoverBackgroundEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Görsel upload fonksiyonu
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setData({
        ...data,
        discoverBackground: { ...data.discoverBackground, image: result.imageUrl },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Discover Background</h3>
      {/* Arka Plan Görseli Upload */}
      <div className="mb-3">
        <label className="font-semibold">Arka Plan Görseli</label>
        <div className="flex items-center gap-4 mb-2">
          {data.discoverBackground?.image && (
            <img
              src={`${apiUrl}${data.discoverBackground.image}`}
              alt="Arka Plan"
              className="w-[140px] h-[90px] object-cover rounded"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block"
          />
          {uploading && <span className="text-blue-500 ml-2">Yükleniyor...</span>}
        </div>
        <input
          type="text"
          value={data.discoverBackground?.image || ""}
          readOnly
          className="w-full border p-2 rounded mb-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Diller için bloklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {langs.map(lang => (
          <div key={lang} className="flex flex-col border rounded-md p-3 bg-gray-50">
            <span className="text-xs font-semibold text-gray-600 mb-2">{dilAdlari[lang]}</span>
            <label className="text-xs mb-1">Alt Başlık</label>
            <input
              type="text"
              value={data.discoverBackground?.subtitle?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  discoverBackground: {
                    ...data.discoverBackground,
                    subtitle: { ...data.discoverBackground?.subtitle, [lang]: e.target.value }
                  }
                })
              }
              className="w-full border p-2 rounded mb-1"
            />
            <label className="text-xs mb-1">Başlık</label>
            <input
              type="text"
              value={data.discoverBackground?.title?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  discoverBackground: {
                    ...data.discoverBackground,
                    title: { ...data.discoverBackground?.title, [lang]: e.target.value }
                  }
                })
              }
              className="w-full border p-2 rounded mb-1"
            />
            <label className="text-xs mb-1">Açıklama</label>
            <textarea
              value={data.discoverBackground?.text?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  discoverBackground: {
                    ...data.discoverBackground,
                    text: { ...data.discoverBackground?.text, [lang]: e.target.value }
                  }
                })
              }
              className="w-full border p-2 rounded mb-1"
              rows={2}
            />
            <label className="text-xs mb-1">Buton Metni</label>
            <input
              type="text"
              value={data.discoverBackground?.buttonText?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  discoverBackground: {
                    ...data.discoverBackground,
                    buttonText: { ...data.discoverBackground?.buttonText, [lang]: e.target.value }
                  }
                })
              }
              className="w-full border p-2 rounded mb-1"
            />
          </div>
        ))}
      </div>
      <label className="block mt-4">Buton Linki</label>
      <input
        type="text"
        value={data.discoverBackground?.link || ""}
        onChange={e => setData({
          ...data,
          discoverBackground: { ...data.discoverBackground, link: e.target.value }
        })}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}
