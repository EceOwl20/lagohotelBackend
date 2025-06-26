"use client";
import { useState } from "react";

const dilAdlari = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function ClinaryReverseInfoEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState({ img1: false, img2: false });

  // Sol görsel upload
  const handleImageUpload = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [key]: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setData({
        ...data,
        clinaryReverseInfo: {
          ...data.clinaryReverseInfo,
          [key]: result.imageUrl,
        }
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(prev => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Clinary Reverse Info</h3>
      <div className="flex gap-6 flex-wrap">
        {/* Sol Görsel */}
        <div className="flex flex-col items-start gap-2 mb-2">
          <label className="font-semibold">Sol Görsel Yükle</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e, "image1")}
            disabled={uploading.img1}
            className="block"
          />
          {uploading.img1 && <span className="text-blue-500">Yükleniyor...</span>}
          {data.clinaryReverseInfo?.image1 && (
            <img
              src={`http://localhost:5001${data.clinaryReverseInfo.image1}`}
              alt="Sol Görsel"
              className="w-28 h-20 object-cover border rounded"
            />
          )}
          <input
            type="text"
            value={data.clinaryReverseInfo?.image1 || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        {/* Sağ Görsel */}
        <div className="flex flex-col items-start gap-2 mb-2">
          <label className="font-semibold">Sağ Görsel Yükle</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e, "image2")}
            disabled={uploading.img2}
            className="block"
          />
          {uploading.img2 && <span className="text-blue-500">Yükleniyor...</span>}
          {data.clinaryReverseInfo?.image2 && (
            <img
              src={`http://localhost:5001${data.clinaryReverseInfo.image2}`}
              alt="Sağ Görsel"
              className="w-28 h-20 object-cover border rounded"
            />
          )}
          <input
            type="text"
            value={data.clinaryReverseInfo?.image2 || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {langs.map(lang => (
          <div key={lang} className="flex flex-col border rounded-md p-3 bg-gray-50">
            <span className="text-xs font-semibold text-gray-600 mb-2">{dilAdlari[lang]}</span>
            <label className="text-xs mb-1">Alt Başlık</label>
            <input
              type="text"
              value={data.clinaryReverseInfo?.subtitle?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  clinaryReverseInfo: {
                    ...data.clinaryReverseInfo,
                    subtitle: { ...data.clinaryReverseInfo?.subtitle, [lang]: e.target.value }
                  }
                })
              }
              className="w-full border p-2 rounded mb-1"
            />
            <label className="text-xs mb-1">Başlık</label>
            <input
              type="text"
              value={data.clinaryReverseInfo?.title?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  clinaryReverseInfo: {
                    ...data.clinaryReverseInfo,
                    title: { ...data.clinaryReverseInfo?.title, [lang]: e.target.value }
                  }
                })
              }
              className="w-full border p-2 rounded mb-1"
            />
            <label className="text-xs mb-1">Açıklama 1</label>
            <textarea
              value={data.clinaryReverseInfo?.text1?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  clinaryReverseInfo: {
                    ...data.clinaryReverseInfo,
                    text1: { ...data.clinaryReverseInfo?.text1, [lang]: e.target.value }
                  }
                })
              }
              className="w-full border p-2 rounded mb-1"
              rows={2}
            />
            <label className="text-xs mb-1">Açıklama 2</label>
            <textarea
              value={data.clinaryReverseInfo?.text2?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  clinaryReverseInfo: {
                    ...data.clinaryReverseInfo,
                    text2: { ...data.clinaryReverseInfo?.text2, [lang]: e.target.value }
                  }
                })
              }
              className="w-full border p-2 rounded"
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
