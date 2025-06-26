"use client";
import { useState } from "react";
const langs = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "İngilizce" },
  { key: "de", label: "Almanca" },
  { key: "ru", label: "Rusça" }
];
export default function BackgroundSectionEdit({ data, setData }) {
  const arr = data.backgroundSections || [];
  const [uploading, setUploading] = useState([]);

  const uploadImage = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(v => ({ ...v, [idx]: true }));
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const result = await res.json();
    if (res.ok && result.imageUrl) {
      const updated = [...arr];
      updated[idx].img = result.imageUrl;
      setData({ ...data, backgroundSections: updated });
    }
    setUploading(v => ({ ...v, [idx]: false }));
  };

  const handleChange = (idx, field, lang, value) => {
    const updated = [...arr];
    updated[idx][field] = { ...(updated[idx][field] || {}), [lang]: value };
    setData({ ...data, backgroundSections: updated });
  };

  const handleTexts = (idx, lang, value) => {
    const updated = [...arr];
    updated[idx].texts = { ...(updated[idx].texts || {}), [lang]: value.split("\n") };
    setData({ ...data, backgroundSections: updated });
  };

  const addBg = () =>
    setData({ ...data, backgroundSections: [...arr, { img: "", subtitle: {}, title: {}, texts: {}, link: "", buttonText: {} }] });
  const removeBg = (idx) =>
    setData({ ...data, backgroundSections: arr.filter((_, i) => i !== idx) });

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Background Sections</h3>
      <button type="button" className="mb-3 px-4 py-1 bg-green-600 text-white rounded" onClick={addBg}>+ Bölüm Ekle</button>
      {arr.map((item, idx) => (
        <div key={idx} className="border rounded p-3 mb-4 bg-gray-50">
          <button type="button" className="mb-2 px-3 py-1 bg-red-500 text-white rounded" onClick={() => removeBg(idx)}>Sil</button>
          {/* Görsel */}
          <label className="block font-semibold mb-2">Arka Plan Görseli</label>
          <div className="flex items-center gap-4 mb-2">
            {item.img && (
              <img src={`http://localhost:5001${item.img}`} alt="bg" className="w-[120px] h-[80px] object-cover rounded" />
            )}
            <input type="file" accept="image/*" onChange={e => uploadImage(e, idx)} disabled={uploading[idx]} />
            {uploading[idx] && <span className="text-blue-500">Yükleniyor...</span>}
          </div>
          {/* Subtitle - başlık - texts */}
          <label className="font-semibold mt-2 mb-1 block">Alt Başlık</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {langs.map(({ key, label }) => (
              <input
                key={key}
                placeholder={label}
                value={item.subtitle?.[key] || ""}
                onChange={e => handleChange(idx, "subtitle", key, e.target.value)}
                className="border rounded p-2 w-[180px]"
              />
            ))}
          </div>
          <label className="font-semibold mt-2 mb-1 block">Başlık</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {langs.map(({ key, label }) => (
              <input
                key={key}
                placeholder={label}
                value={item.title?.[key] || ""}
                onChange={e => handleChange(idx, "title", key, e.target.value)}
                className="border rounded p-2 w-[180px]"
              />
            ))}
          </div>
          <label className="font-semibold mt-2 mb-1 block">Açıklamalar (her satır ayrı)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {langs.map(({ key, label }) => (
              <textarea
                key={key}
                placeholder={label}
                value={item.texts?.[key]?.join("\n") || ""}
                onChange={e => handleTexts(idx, key, e.target.value)}
                className="border rounded p-2 w-[180px] min-h-[64px]"
              />
            ))}
          </div>
          <label className="font-semibold mt-2 mb-1 block">Buton Metni</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {langs.map(({ key, label }) => (
              <input
                key={key}
                placeholder={label}
                value={item.buttonText?.[key] || ""}
                onChange={e => handleChange(idx, "buttonText", key, e.target.value)}
                className="border rounded p-2 w-[180px]"
              />
            ))}
          </div>
          <label className="block">Buton Linki</label>
          <input
            type="text"
            value={item.link || ""}
            onChange={e => {
              const updated = [...arr];
              updated[idx].link = e.target.value;
              setData({ ...data, backgroundSections: updated });
            }}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
    </div>
  );
}
