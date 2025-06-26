"use client";
import { useState } from "react";

const dilAdlari = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function ClinaryInfoEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState({ image1: false, image2: false });

  // Görsel upload fonksiyonu
  const handleImageUpload = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, [key]: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setData((prev) => ({
        ...prev,
        clinaryInfo: { ...prev.clinaryInfo, [key]: result.imageUrl },
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-2xl mb-2">Clinary Info Section</h3>
      <div className="rounded-md bg-gray-100 p-6">

        {/* Sol Görsel */}
        <label className="font-semibold text-[18px] block">Sol Görsel</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "image1")}
          className="w-full mt-2 mb-1"
        />
        {uploading.image1 && (
          <span className="text-blue-600 text-xs mb-2 block">Yükleniyor...</span>
        )}
        {data.clinaryInfo?.image1 && (
          <img
            src={`http://localhost:5001${data.clinaryInfo.image1}`}
            alt="Sol görsel"
            className="h-24 mb-2 mt-1 border rounded object-cover"
          />
        )}

        {/* Sağ Görsel */}
        <label className="font-semibold text-[18px] block mt-4">Sağ Görsel</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "image2")}
          className="w-full mt-2 mb-1"
        />
        {uploading.image2 && (
          <span className="text-blue-600 text-xs mb-2 block">Yükleniyor...</span>
        )}
        {data.clinaryInfo?.image2 && (
          <img
            src={`http://localhost:5001${data.clinaryInfo.image2}`}
            alt="Sağ görsel"
            className="h-24 mb-2 mt-1 border rounded object-cover"
          />
        )}

        {/* Alt Başlık */}
        <div className="mb-6 mt-5">
          <label className="block font-semibold mb-2 text-[18px]">Alt Başlıklar</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {langs.map((lang) => (
              <div key={lang} className="flex flex-col">
                <label className="text-xs mb-1 text-gray-600">
                  {dilAdlari[lang] || lang.toUpperCase()}
                </label>
                <input
                  type="text"
                  placeholder={`Alt Başlık (${lang.toUpperCase()})`}
                  value={data.clinaryInfo?.subtitle?.[lang] || ""}
                  onChange={e =>
                    setData({
                      ...data,
                      clinaryInfo: {
                        ...data.clinaryInfo,
                        subtitle: { ...data.clinaryInfo?.subtitle, [lang]: e.target.value },
                      },
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Başlık */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-[18px]">Başlıklar</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {langs.map((lang) => (
              <div key={lang} className="flex flex-col">
                <label className="text-xs mb-1 text-gray-600">
                  {dilAdlari[lang] || lang.toUpperCase()}
                </label>
                <input
                  type="text"
                  placeholder={`Başlık (${lang.toUpperCase()})`}
                  value={data.clinaryInfo?.title?.[lang] || ""}
                  onChange={e =>
                    setData({
                      ...data,
                      clinaryInfo: {
                        ...data.clinaryInfo,
                        title: { ...data.clinaryInfo?.title, [lang]: e.target.value },
                      },
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Açıklamalar */}
        <div>
          <label className="block font-semibold mb-2 text-[18px]">Açıklamalar (her satır ayrı)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {langs.map((lang) => (
              <div key={lang} className="flex flex-col">
                <label className="text-xs mb-1 text-gray-600">
                  {dilAdlari[lang] || lang.toUpperCase()}
                </label>
                <textarea
                  rows={3}
                  placeholder={`Açıklama (${lang.toUpperCase()})`}
                  value={data.clinaryInfo?.texts?.[lang]?.join("\n") || ""}
                  onChange={e =>
                    setData({
                      ...data,
                      clinaryInfo: {
                        ...data.clinaryInfo,
                        texts: {
                          ...data.clinaryInfo?.texts,
                          [lang]: e.target.value.split("\n"),
                        },
                      },
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
