"use client";
import { useState } from "react";

export default function CarouselEdit({ data, setData, langs }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // bölüm verisi
  const section = data.carousel || {};
  const items = Array.isArray(section.carouselItem) ? section.carouselItem : [];

  const [uploading, setUploading] = useState({});

  // Üst seviye subtitle/title/text güncelleme
  const updateSectionField = (field, lang, value) => {
    const updated = {
      ...section,
      [field]: { ...(section[field] || {}), [lang]: value },
    };
    setData({ ...data, carousel: updated });
  };

  // carouselItem dizisini güncelle
  const updateItems = (newItems) => {
    setData({ ...data, carousel: { ...section, carouselItem: newItems } });
  };

  // Slide resmi yükleme
  const uploadImage = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((u) => ({ ...u, [idx]: true }));
    const form = new FormData();
    form.append("image", file);
    const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
    const result = await res.json();
    if (res.ok && result.imageUrl) {
      const updated = [...items];
      updated[idx].image = result.imageUrl;
      updateItems(updated);
    }
    setUploading((u) => ({ ...u, [idx]: false }));
  };

  // Slide içindeki çokdilli alan güncelleme (title veya span)
  const handleItemChange = (idx, field, lang, value) => {
    const updated = [...items];
    updated[idx][field] = { ...(updated[idx][field] || {}), [lang]: value };
    updateItems(updated);
  };

  // Yeni slide ekle / sil
  const addItem = () =>
    updateItems([...items, { image: "", title: {}, span: {} }]);
  const removeItem = (idx) =>
    updateItems(items.filter((_, i) => i !== idx));

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-4">Beach Carousel (Slider)</h3>

      {/* — Üst seviye çokdilli alanlar — */}
      {["subtitle", "title", "text"].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block font-semibold mb-1">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="flex flex-wrap gap-2">
            {langs.map(({ key, label }) => (
              field === "text" ? (
                <textarea
                  key={key}
                  rows={2}
                  placeholder={`${label}`}
                  value={section[field]?.[key] || ""}
                  onChange={(e) => updateSectionField(field, key, e.target.value)}
                  className="border p-2 rounded w-[180px]"
                />
              ) : (
                <input
                  key={key}
                  type="text"
                  placeholder={`${label}`}
                  value={section[field]?.[key] || ""}
                  onChange={(e) => updateSectionField(field, key, e.target.value)}
                  className="border p-2 rounded w-[180px]"
                />
              )
            ))}
          </div>
        </div>
      ))}

      {/* — Slide ekle/sil — */}
      <button
        type="button"
        className="mb-3 px-4 py-1 bg-green-600 text-white rounded"
        onClick={addItem}
      >
        + Slide Ekle
      </button>

      {/* — Mevcut slidelar — */}
      {items.map((item, idx) => (
        <div key={idx} className="border rounded p-4 mb-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <strong>Slide #{idx + 1}</strong>
            <button
              type="button"
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => removeItem(idx)}
            >
              Sil
            </button>
          </div>

          {/* Görsel yükleme */}
          <label className="block font-semibold mb-1">Görsel</label>
          <div className="flex items-center gap-4 mb-4">
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
              onChange={(e) => uploadImage(e, idx)}
              disabled={uploading[idx]}
              className="border p-1 rounded"
            />
            {uploading[idx] && <span className="text-blue-500">Yükleniyor...</span>}
          </div>

          {/* Title & Span */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {langs.map(({ key, label }) => (
              <div key={key} className="p-2 bg-white rounded border">
                <label className="text-xs block mb-1">{label} Başlık</label>
                <input
                  type="text"
                  value={item.title?.[key] || ""}
                  onChange={(e) => handleItemChange(idx, "title", key, e.target.value)}
                  className="w-full border p-1 rounded mb-2"
                />
                <label className="text-xs block mb-1">{label} Alt Başlık</label>
                <input
                  type="text"
                  value={item.span?.[key] || ""}
                  onChange={(e) => handleItemChange(idx, "span", key, e.target.value)}
                  className="w-full border p-1 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
