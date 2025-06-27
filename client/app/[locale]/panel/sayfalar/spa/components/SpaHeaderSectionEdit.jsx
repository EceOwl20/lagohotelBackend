"use client";
import { useState } from "react";

// images: dizi halinde, ekle-sil
export default function SpaHeaderSectionEdit({ data, setData, langs }) {
  const value = data.spaHeaderSection || {};

  // Görsel upload işlemini burada yazabilirsin
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Örneğin bir upload işlemi yap, gelen url'i ekle:
    // const uploadedUrl = await uploadImage(file);
    // setData({ ...data, spaHeaderSection: { ...value, images: [...(value.images || []), uploadedUrl] } })
  };

  const handleRemoveImage = (idx) => {
    setData({
      ...data,
      spaHeaderSection: {
        ...value,
        images: (value.images || []).filter((_, i) => i !== idx),
      },
    });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Spa Header Section</h4>
      {/* Diller */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {langs.map((lang) => (
          <div key={lang}>
            <label className="font-semibold">Alt Başlık ({lang.toUpperCase()})</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-1"
              value={value.subtitle?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  spaHeaderSection: {
                    ...value,
                    subtitle: { ...value.subtitle, [lang]: e.target.value },
                  },
                })
              }
            />
            <label className="font-semibold">Başlık ({lang.toUpperCase()})</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-1"
              value={value.title?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  spaHeaderSection: {
                    ...value,
                    title: { ...value.title, [lang]: e.target.value },
                  },
                })
              }
            />
            <label className="font-semibold">Açıklama ({lang.toUpperCase()})</label>
            <textarea
              className="w-full border rounded p-2"
              value={value.text?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  spaHeaderSection: {
                    ...value,
                    text: { ...value.text, [lang]: e.target.value },
                  },
                })
              }
            />
          </div>
        ))}
      </div>
      <div>
        <label className="font-semibold">Galeri Görselleri</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleAddImage}
          className="block my-2"
        />
        <div className="flex gap-2 flex-wrap">
          {(value.images || []).map((img, idx) => (
            <div key={idx} className="relative w-[120px] h-[80px]">
              <img src={img} className="w-full h-full object-cover rounded" />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                onClick={() => handleRemoveImage(idx)}
                type="button"
              >Sil</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
