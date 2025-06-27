"use client";
import { useState } from "react";

export default function MassageCarouselEdit({ data, setData, langs }) {
  const value = data.massageCarousel || {};

  // Massage images ve başlıklarını ekle/sil
  const handleAddMassage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Yükleme sonrası url ile ekleme:
    // setData({ ...data, massageCarousel: { ...value, images: [...(value.images || []), uploadedUrl], headers: [...(value.headers || []), {}] } })
  };

  const handleRemoveMassage = (idx) => {
    setData({
      ...data,
      massageCarousel: {
        ...value,
        images: (value.images || []).filter((_, i) => i !== idx),
        headers: (value.headers || []).filter((_, i) => i !== idx),
      },
    });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Massage Carousel</h4>
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
                  massageCarousel: {
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
                  massageCarousel: {
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
                  massageCarousel: {
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
        <label className="font-semibold">Masaj Kartları</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleAddMassage}
          className="block my-2"
        />
        <div className="flex flex-wrap gap-2">
          {(value.images || []).map((img, idx) => (
            <div key={idx} className="relative w-[120px] h-[80px] border rounded">
              <img src={img} className="w-full h-full object-cover rounded" />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                onClick={() => handleRemoveMassage(idx)}
                type="button"
              >Sil</button>
              <div className="mt-1">
                {langs.map((lang) => (
                  <input
                    key={lang}
                    type="text"
                    placeholder={`Başlık (${lang.toUpperCase()})`}
                    className="w-full border p-1 rounded mb-1 text-xs"
                    value={value.headers?.[idx]?.[lang] || ""}
                    onChange={e => {
                      const headers = [...(value.headers || [])];
                      headers[idx] = { ...(headers[idx] || {}), [lang]: e.target.value };
                      setData({
                        ...data,
                        massageCarousel: { ...value, headers }
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
