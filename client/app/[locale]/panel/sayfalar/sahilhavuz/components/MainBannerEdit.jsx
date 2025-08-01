"use client";
import { useState } from "react";

// Diller
const langList = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "İngilizce" },
  { key: "de", label: "Almanca" },
  { key: "ru", label: "Rusça" },
];

export default function MainBannerEdit({ data, setData }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [uploading, setUploading] = useState({});
  // Upload helper
  const handleImageUpload = async (e, field, device = "desktop") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [field]: true }));
    const formData = new FormData();
    formData.append("image", file);
   const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
    const result = await res.json();
    if (res.ok && result.imageUrl) {
      setData({
        ...data,
        mainBanner: {
          ...data.mainBanner,
          [device]: {
            ...((data.mainBanner && data.mainBanner[device]) || {}),
            [field]: result.imageUrl,
          },
        },
      });
    }
    setUploading(prev => ({ ...prev, [field]: false }));
  };

  // Diller için inputları tek blokta göster
  const renderLangInputs = (label, key, multiline = false, device = "desktop") => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <div className="flex flex-wrap gap-2">
        {langList.map(({ key: lang, label: langLabel }) =>
          multiline ? (
            <textarea
              key={lang}
              placeholder={`${label} (${langLabel})`}
              value={data.mainBanner?.[device]?.[key]?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  mainBanner: {
                    ...data.mainBanner,
                    [device]: {
                      ...((data.mainBanner && data.mainBanner[device]) || {}),
                      [key]: {
                        ...(data.mainBanner?.[device]?.[key] || {}),
                        [lang]: e.target.value,
                      },
                    },
                  },
                })
              }
              rows={2}
              className="w-[190px] border p-2 rounded mb-1"
            />
          ) : (
            <input
              key={lang}
              type="text"
              placeholder={`${label} (${langLabel})`}
              value={data.mainBanner?.[device]?.[key]?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  mainBanner: {
                    ...data.mainBanner,
                    [device]: {
                      ...((data.mainBanner && data.mainBanner[device]) || {}),
                      [key]: {
                        ...(data.mainBanner?.[device]?.[key] || {}),
                        [lang]: e.target.value,
                      },
                    },
                  },
                })
              }
              className="w-[190px] border p-2 rounded mb-1"
            />
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="mb-8 border rounded bg-gray-100 p-6">
      <h3 className="font-bold text-2xl mb-3">Ana Banner (Desktop)</h3>
      {/* Kız Görseli */}
      <label className="block font-semibold">Kız Görseli (background)</label>
      <div className="flex items-center gap-4 mb-2">
        {data.mainBanner?.desktop?.girlImage && (
          <img
            src={`${apiUrl}${data.mainBanner.desktop.girlImage}`}
            alt="Girl"
            className="w-[120px] h-[80px] object-cover rounded"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImageUpload(e, "girlImage", "desktop")}
          disabled={uploading.girlImage}
        />
        {uploading.girlImage && <span className="text-blue-500">Yükleniyor...</span>}
      </div>

      {/* Yazı Görseli */}
      <label className="block font-semibold">Yazı Görseli (Beach & Pools)</label>
      <div className="flex items-center gap-4 mb-2">
        {data.mainBanner?.desktop?.textImage && (
          <img
            src={`${apiUrl}${data.mainBanner.desktop.textImage}`}
            alt="Yazı"
            className="w-[120px] h-[80px] object-contain rounded"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImageUpload(e, "textImage", "desktop")}
          disabled={uploading.textImage}
        />
        {uploading.textImage && <span className="text-blue-500">Yükleniyor...</span>}
      </div>

      {/* Dalga Görseli */}
      <label className="block font-semibold">Dalga Görseli</label>
      <div className="flex items-center gap-4 mb-2">
        {data.mainBanner?.desktop?.waveImage && (
          <img
            src={`${apiUrl}${data.mainBanner.desktop.waveImage}`}
            alt="Dalga"
            className="w-[120px] h-[80px] object-contain rounded"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImageUpload(e, "waveImage", "desktop")}
          disabled={uploading.waveImage}
        />
        {uploading.waveImage && <span className="text-blue-500">Yükleniyor...</span>}
      </div>

      {/* Yazılar - diller */}
      {renderLangInputs("Alt Başlık", "subtitle", false, "desktop")}
      {renderLangInputs("Başlık", "title", false, "desktop")}
      {renderLangInputs("Açıklama", "text", true, "desktop")}
      {renderLangInputs("Buton Metni", "buttonText", false, "desktop")}

      {/* MOBİL */}
      <h3 className="font-bold text-2xl mb-3 mt-6">Ana Banner (Mobil)</h3>
      {/* Mobil arka plan görseli */}
      <label className="block font-semibold">Mobil Arka Plan Görseli</label>
      <div className="flex items-center gap-4 mb-2">
        {data.mainBanner?.mobile?.bgImage && (
          <img
            src={`${apiUrl}${data.mainBanner.mobile.bgImage}`}
            alt="Mobile BG"
            className="w-[120px] h-[80px] object-cover rounded"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImageUpload(e, "bgImage", "mobile")}
          disabled={uploading.bgImage}
        />
        {uploading.bgImage && <span className="text-blue-500">Yükleniyor...</span>}
      </div>
      {/* Mobil yazılar */}
      {renderLangInputs("Alt Başlık", "subtitle", false, "mobile")}
      {renderLangInputs("Başlık (MobileTitle)", "mobileTitle", false, "mobile")}
      {renderLangInputs("Açıklama", "text", true, "mobile")}
    </div>
  );
}
