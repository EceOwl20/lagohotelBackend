"use client";
import { useState } from "react";
export default function CarouselEdit({ data, setData, langs }) {
  const arr = data.carousel || [];
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
      updated[idx].image = result.imageUrl;
      setData({ ...data, carousel: updated });
    }
    setUploading(v => ({ ...v, [idx]: false }));
  };

  const handleChange = (idx, field, lang, value) => {
    const updated = [...arr];
    updated[idx][field] = { ...(updated[idx][field] || {}), [lang]: value };
    setData({ ...data, carousel: updated });
  };

  const addItem = () =>
    setData({ ...data, carousel: [...arr, { image: "", title: {}, span: {} }] });
  const removeItem = (idx) =>
    setData({ ...data, carousel: arr.filter((_, i) => i !== idx) });

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Beach Carousel (Slider)</h3>
      <button type="button" className="mb-3 px-4 py-1 bg-green-600 text-white rounded" onClick={addItem}>+ Slide Ekle</button>
      {arr.map((item, idx) => (
        <div key={idx} className="border rounded p-3 mb-4 bg-gray-50">
          <button type="button" className="mb-2 px-3 py-1 bg-red-500 text-white rounded" onClick={() => removeItem(idx)}>Sil</button>
          <label className="block font-semibold mb-2">Görsel</label>
          <div className="flex items-center gap-4 mb-2">
            {item.image && (
              <img src={`http://localhost:5001${item.image}`} alt="" className="w-[90px] h-[60px] object-cover rounded" />
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
                <input type="text" value={item.span?.[key] || ""} onChange={e => handleChange(idx, "span", key, e.target.value)} className="border rounded p-2 w-full mb-1" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
