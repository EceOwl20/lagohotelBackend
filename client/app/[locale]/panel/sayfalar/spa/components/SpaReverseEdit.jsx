"use client";
import { useState } from "react";

export default function SpaReverseEdit({ data, setData, langs, blockName }) {
  const value = data[blockName] || {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState(false);

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
      const imageUrl = result.imageUrl || result.path;
      setData({
        ...data,
        [blockName]: {
          ...value,
          img: imageUrl,
        },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleBooleanChange = (field) => (e) => {
    setData({
      ...data,
      [blockName]: {
        ...value,
        [field]: e.target.checked,
      },
    });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Spa/Fitness Reverse Alanı</h4>

      {/* Görsel dosya yükleme */}
      <label className="block font-semibold mb-1">Görsel</label>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="border p-2 rounded"
        />
        {uploading && <span className="text-blue-600">Yükleniyor…</span>}
        {value.img && (
          <img
            src={value.img.startsWith("/") ? `${apiUrl}${value.img}` : value.img}
            alt="Preview"
            className="h-20 w-32 object-cover rounded border"
          />
        )}
      </div>

      {/* Çok dilli alt başlık, başlık, açıklama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {langs.map((lang) => (
          <div key={lang}>
            <label className="font-semibold">Alt Başlık ({lang.toUpperCase()})</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-1"
              value={value.subtitle?.[lang] || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  [blockName]: {
                    ...value,
                    subtitle: { ...(value.subtitle || {}), [lang]: e.target.value },
                  },
                })
              }
            />

            <label className="font-semibold">Başlık ({lang.toUpperCase()})</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-1"
              value={value.title?.[lang] || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  [blockName]: {
                    ...value,
                    title: { ...(value.title || {}), [lang]: e.target.value },
                  },
                })
              }
            />

            <label className="font-semibold">Açıklama ({lang.toUpperCase()})</label>
            <textarea
              className="w-full border rounded p-2"
              value={value.text?.[lang] || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  [blockName]: {
                    ...value,
                    text: { ...(value.text || {}), [lang]: e.target.value },
                  },
                })
              }
            />

            <label className="font-semibold">Buton Metni ({lang.toUpperCase()})</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={value.buttonText?.[lang] || ""}
              onChange={(e) =>
                setData({
                  ...data,
                   [blockName]: {
                    ...value,
                    buttonText: { ...value.buttonText, [lang]: e.target.value },
                  },
                })
              }
            />
            
          </div>
        ))}
      </div>

      {/* Yeni eklenen boolean alanlar */}
      <div className="flex items-center gap-6 mt-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!value.isImageLeft}
            onChange={handleBooleanChange("isImageLeft")}
          />
          Resmi Solda Göster
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!value.showLink}
            onChange={handleBooleanChange("showLink")}
          />
          Link Göster
        </label>
      </div>
    </div>
  );
}
