"use client";
import { useRef } from "react";

export default function Connect1Edit({ data, setData, langs }) {
  const value = data.connect1 || {};

  // Dosya yükle ve URL döndür
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    // Upload endpoint (örnek: /api/upload)
    const res = await fetch("http://localhost:5001/api/upload", {
      method: "POST",
      body: formData,
    });
    const { url } = await res.json();
    setData({ ...data, connect1: { ...value, image: url } });
  };

  const handleLang = (field, lang, val) => {
    setData({
      ...data,
      connect1: {
        ...value,
        [field]: { ...value[field], [lang]: val },
      },
    });
  };
  return (
    <div className="mb-8 p-4 rounded bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Bölüm 1 (Genel Bilgiler)</h3>
      <label>Arka Plan Görseli</label>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded"
        />
        {value.image && (
          <img src={value.image} alt="görsel" className="h-12 rounded border" />
        )}
      </div>
      {langs.map(lang => (
        <div key={lang}>
          <label>Alt Başlık ({lang})</label>
          <input type="text" value={value.subtitle?.[lang] || ""} onChange={e => handleLang("subtitle", lang, e.target.value)} className="w-full border p-2 mb-1 rounded"/>
          <label>Başlık ({lang})</label>
          <input type="text" value={value.title?.[lang] || ""} onChange={e => handleLang("title", lang, e.target.value)} className="w-full border p-2 mb-1 rounded"/>
          <label>Açıklama ({lang})</label>
          <textarea value={value.text?.[lang] || ""} onChange={e => handleLang("text", lang, e.target.value)} className="w-full border p-2 mb-1 rounded"/>
          <label>Adres ({lang})</label>
          <input type="text" value={value.address?.[lang] || ""} onChange={e => handleLang("address", lang, e.target.value)} className="w-full border p-2 mb-1 rounded"/>
        </div>
      ))}
      <label>Telefonlar (virgülle ayırınız)</label>
      <input type="text" value={value.phones?.join(", ") || ""} onChange={e => setData({ ...data, connect1: { ...value, phones: e.target.value.split(",").map(x => x.trim()) } })} className="w-full border p-2 mb-1 rounded"/>
      <label>Email(ler) (virgülle ayırınız)</label>
      <input type="text" value={value.emails?.join(", ") || ""} onChange={e => setData({ ...data, connect1: { ...value, emails: e.target.value.split(",").map(x => x.trim()) } })} className="w-full border p-2 mb-1 rounded"/>
    </div>
  );
}
