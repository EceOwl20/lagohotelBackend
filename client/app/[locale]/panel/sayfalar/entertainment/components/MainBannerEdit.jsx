"use client";
import { useRef } from "react";

export default function MainBannerEdit({ data, setData }) {
  const value = data.mainBanner || {};
  const fileInputRef = useRef();

  // (Opsiyonel: Upload fonksiyonu eklenebilir)
  // const handleUpload = async (e) => { ... }

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Main Banner Görseli</h4>
      <label>Arka Plan Görseli URL</label>
      <input
        type="text"
        value={value.image || ""}
        onChange={e => setData({ ...data, mainBanner: { ...value, image: e.target.value } })}
        className="w-full border p-2 rounded mb-2"
        placeholder="https://..."
      />
      {value.image && (
        <img
          src={value.image}
          alt="Banner Önizleme"
          className="w-full max-w-xs rounded shadow mb-2"
        />
      )}

      {/* 
      // Eğer dosya yükleme istenirse: 
      <input type="file" ref={fileInputRef} onChange={handleUpload} className="block mt-2" /> 
      */}
    </div>
  );
}
