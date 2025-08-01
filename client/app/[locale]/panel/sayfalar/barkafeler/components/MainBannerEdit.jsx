"use client";
import { useState } from "react";

const langs = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "İngilizce" },
  { key: "de", label: "Almanca" },
  { key: "ru", label: "Rusça" }
];

export default function MainBannerEdit({ data, setData }) {
  const [uploading, setUploading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ;

const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");

      setData({
        ...data,
        mainBanner: { ...data.mainBanner, image: result.imageUrl },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };


  const handleLangChange = (field, lang, value) => {
    setData(prev => ({
      ...prev,
      mainBanner: {
        ...prev.mainBanner,
        [field]: {
          ...(prev.mainBanner?.[field] || {}),
          [lang]: value
        }
      }
    }));
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-[28px] mb-2">Ana Banner</h3>
      <div className="rounded-md bg-gray-100 p-6">
        {/* Görsel Upload */}
        <label className="font-semibold">Banner Görseli</label>
        <div className="flex items-center gap-4 mb-2">
          {data.mainBanner?.image && (
            <img
              src={`${apiUrl}${data.mainBanner.image}`}
              alt="Banner"
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
          value={data.mainBanner?.image || ""}
          readOnly
          className="w-full border p-2 rounded mb-4 bg-gray-100 cursor-not-allowed"
        />

        {/* Alt Başlık */}
        <label className="font-semibold mt-2 mb-1 block">Alt Başlık</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {langs.map(({ key, label }) => (
            <input
              key={key}
              placeholder={label}
              value={data.mainBanner?.subtitle?.[key] || ""}
              onChange={e => handleLangChange("subtitle", key, e.target.value)}
              className="border rounded p-2 w-[180px]"
            />
          ))}
        </div>

        {/* Başlık */}
        <label className="font-semibold mt-2 mb-1 block">Başlık</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {langs.map(({ key, label }) => (
            <input
              key={key}
              placeholder={label}
              value={data.mainBanner?.title?.[key] || ""}
              onChange={e => handleLangChange("title", key, e.target.value)}
              className="border rounded p-2 w-[180px]"
            />
          ))}
        </div>

        {/* Açıklama */}
        <label className="font-semibold mt-2 mb-1 block">Açıklama</label>
        <div className="flex flex-wrap gap-2">
          {langs.map(({ key, label }) => (
            <textarea
              key={key}
              placeholder={label}
              value={data.mainBanner?.text?.[key] || ""}
              onChange={e => handleLangChange("text", key, e.target.value)}
              className="border rounded p-2 w-[180px] min-h-[64px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
