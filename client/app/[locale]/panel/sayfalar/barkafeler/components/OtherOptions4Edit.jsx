"use client";
import { useState } from "react";
const langs = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "İngilizce" },
  { key: "de", label: "Almanca" },
  { key: "ru", label: "Rusça" }
];

export default function OtherOptions4Edit({ data, setData, blockName }) {
  const arr = data[blockName] || [];
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
      setData({ ...data, [blockName]: updated });
    }
    setUploading(v => ({ ...v, [idx]: false }));
  };

  const handleChange = (idx, field, lang, value) => {
    const updated = [...arr];
    updated[idx][field] = { ...(updated[idx][field] || {}), [lang]: value };
    setData({ ...data, [blockName]: updated });
  };

  const addCuisine = () =>
    setData({ ...data, [blockName]: [...arr, { img: "", title: {}, description: {}, text: {}, buttonText: {}, link: "" }] });
  const removeCuisine = (idx) =>
    setData({ ...data, [blockName]: arr.filter((_, i) => i !== idx) });

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">{blockName === "otherOptions" ? "Diğer Bar&Cafe Alanı" : "Diğer Bar&Cafe Alanı 2"}</h3>
      <button type="button" className="mb-3 px-4 py-1 bg-green-600 text-white rounded" onClick={addCuisine}>+ Alan Ekle</button>
      {arr.map((item, idx) => (
        <div key={idx} className="border rounded p-3 mb-4 bg-gray-50">
          <button type="button" className="mb-2 px-3 py-1 bg-red-500 text-white rounded" onClick={() => removeCuisine(idx)}>Sil</button>
          <label className="block font-semibold mb-2">Görsel</label>
          <div className="flex items-center gap-4 mb-2">
            {item.img && (
              <img src={`http://localhost:5001${item.img}`} alt="" className="w-[90px] h-[60px] object-cover rounded" />
            )}
            <input type="file" accept="image/*" onChange={e => uploadImage(e, idx)} disabled={uploading[idx]} />
            {uploading[idx] && <span className="text-blue-500">Yükleniyor...</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {langs.map(({ key, label }) => (
              <div key={key} className="bg-white rounded p-2">
                <label className="text-xs block">{label} Başlık</label>
                <input type="text" value={item.title?.[key] || ""} onChange={e => handleChange(idx, "title", key, e.target.value)} className="border rounded p-2 w-full mb-1" />
                <label className="text-xs block">{label} Alt Başlık</label>
                <input type="text" value={item.description?.[key] || ""} onChange={e => handleChange(idx, "description", key, e.target.value)} className="border rounded p-2 w-full mb-1" />
                <label className="text-xs block">{label} Açıklama</label>
                <textarea value={item.text?.[key] || ""} onChange={e => handleChange(idx, "text", key, e.target.value)} className="border rounded p-2 w-full mb-1" />
                <label className="text-xs block">{label} Buton Metni</label>
                <input type="text" value={item.buttonText?.[key] || ""} onChange={e => handleChange(idx, "buttonText", key, e.target.value)} className="border rounded p-2 w-full mb-1" />
              </div>
            ))}
          </div>
          <label className="block mt-2">Link</label>
          <input type="text" value={item.link || ""} onChange={e => {
            const updated = [...arr];
            updated[idx].link = e.target.value;
            setData({ ...data, [blockName]: updated });
          }} className="w-full border p-2 rounded" />
        </div>
      ))}
    </div>
  );
}
