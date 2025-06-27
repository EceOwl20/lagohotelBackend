"use client";
import { useState } from "react";

// Panelden upload istiyorsan file input + loading ekleyebilirsin.

export default function SpaInfoSectionEdit({ data, setData, langs }) {
  const spaInfo = data.spaInfoSection || {};

  // img1
  const handleImage1 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Upload işlemi burada (örnek upload: /api/upload ile)
    // Upload sonrası spaInfo.img1 = "upload_url" şeklinde kaydet
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Spa Info Section</h4>
      <label>Sol Görsel</label>
      <input
        type="text"
        value={spaInfo.img1 || ""}
        onChange={e => setData({ ...data, spaInfoSection: { ...spaInfo, img1: e.target.value }})}
        className="w-full border p-2 rounded mb-2"
      />
      <label>Sağ Görsel</label>
      <input
        type="text"
        value={spaInfo.img2 || ""}
        onChange={e => setData({ ...data, spaInfoSection: { ...spaInfo, img2: e.target.value }})}
        className="w-full border p-2 rounded mb-2"
      />
      {/* Tüm metin alanları çoklu dilli */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1,2,3].map((num) => (
          langs.map(lang => (
            <div key={lang+num}>
              <label>{`Metin${num} (${lang.toUpperCase()})`}</label>
              <textarea
                value={spaInfo[`texts${num}`]?.[lang] || ""}
                onChange={e => setData({
                  ...data,
                  spaInfoSection: {
                    ...spaInfo,
                    [`texts${num}`]: {
                      ...(spaInfo[`texts${num}`] || {}),
                      [lang]: e.target.value,
                    }
                  }
                })}
                className="w-full border p-2 rounded mb-2"
              />
            </div>
          ))
        ))}
      </div>
    </div>
  );
}
