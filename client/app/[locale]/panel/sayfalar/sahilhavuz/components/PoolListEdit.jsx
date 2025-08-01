"use client";
import { useState } from "react";

export default function PoolListEdit({ data, setData, langs }) {
  const section = data.poolListSection || { subtitle: {}, title: {}, text: {} };
  const arr = data.poolList || [];
  const [uploading, setUploading] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // poolListSection çokdilli alan güncelleme
  const handleSectionChange = (field, lang, value) => {
    const updatedSection = {
      ...section,
      [field]: { ...(section[field] || {}), [lang]: value },
    };
    setData({ ...data, poolListSection: updatedSection });
  };

  // havuz resmi/hover yükleme
  const uploadImage = async (e, idx, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((v) => ({ ...v, [`${idx}-${type}`]: true }));
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
    const result = await res.json();
    if (res.ok && result.imageUrl) {
      const updated = [...arr];
      updated[idx][type] = result.imageUrl;
      setData({ ...data, poolList: updated });
    }
    setUploading((v) => ({ ...v, [`${idx}-${type}`]: false }));
  };

  // havuz metin alanları güncelleme
  const handleChange = (idx, field, lang, value) => {
    const updated = [...arr];
    updated[idx][field] = { ...(updated[idx][field] || {}), [lang]: value };
    setData({ ...data, poolList: updated });
  };

  const addPool = () =>
    setData({
      ...data,
      poolList: [...arr, { image: "", hoverImage: "", subtitle: {}, title: {}, description: {} }],
    });
  const removePool = (idx) =>
    setData({ ...data, poolList: arr.filter((_, i) => i !== idx) });

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-4">Havuz Listesi Bölümü</h3>

      {/* Genel poolListSection */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Liste Başlık & Açıklama</h4>
        {["subtitle", "title", "text"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {langs.map(({ key, label }) => (
                <div key={key} className="flex flex-col">
                  <span className="text-xs text-gray-600 mb-1">{label}</span>
                  {field === "text" ? (
                    <textarea
                      rows={2}
                      className="border p-2 rounded"
                      value={section[field]?.[key] || ""}
                      onChange={(e) => handleSectionChange(field, key, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="border p-2 rounded"
                      value={section[field]?.[key] || ""}
                      onChange={(e) => handleSectionChange(field, key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-lg mb-2">Havuz Kartları</h3>
      <button
        type="button"
        className="mb-3 px-4 py-1 bg-green-600 text-white rounded"
        onClick={addPool}
      >
        + Havuz Ekle
      </button>

      {arr.map((item, idx) => (
        <div key={idx} className="border rounded p-3 mb-4 bg-gray-50">
          <div className="flex justify-between mb-2">
            <strong>Havuz #{idx + 1}</strong>
            <button
              type="button"
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => removePool(idx)}
            >
              Sil
            </button>
          </div>

          {/* Görsel */}
          <label className="block font-semibold mb-1">Görsel</label>
          <div className="flex items-center gap-4 mb-2">
            {item.image && (
              <img
                src={`${apiUrl}${item.image}`}
                alt=""
                className="w-[90px] h-[60px] object-cover rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e, idx, "image")}
              disabled={uploading[`${idx}-image`]}
            />
            {uploading[`${idx}-image`] && <span className="text-blue-500">Yükleniyor...</span>}
          </div>

          {/* Hover Görsel */}
          <label className="block font-semibold mb-1">Hover Görsel</label>
          <div className="flex items-center gap-4 mb-4">
            {item.hoverImage && (
              <img
                src={`${apiUrl}${item.hoverImage}`}
                alt=""
                className="w-[90px] h-[60px] object-cover rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e, idx, "hoverImage")}
              disabled={uploading[`${idx}-hoverImage`]}
            />
            {uploading[`${idx}-hoverImage`] && <span className="text-blue-500">Yükleniyor...</span>}
          </div>

          {/* Çokdilli metinler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {langs.map(({ key, label }) => (
              <div key={key} className="bg-white rounded p-2">
                <label className="text-xs block mb-1">{label} Alt Başlık</label>
                <input
                  type="text"
                  className="w-full border p-1 rounded mb-1"
                  value={item.subtitle?.[key] || ""}
                  onChange={(e) => handleChange(idx, "subtitle", key, e.target.value)}
                />
                <label className="text-xs block mb-1">{label} Başlık</label>
                <input
                  type="text"
                  className="w-full border p-1 rounded mb-1"
                  value={item.title?.[key] || ""}
                  onChange={(e) => handleChange(idx, "title", key, e.target.value)}
                />
                <label className="text-xs block mb-1">{label} Açıklama</label>
                <textarea
                  rows={2}
                  className="w-full border p-1 rounded"
                  value={item.description?.[key] || ""}
                  onChange={(e) => handleChange(idx, "description", key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
