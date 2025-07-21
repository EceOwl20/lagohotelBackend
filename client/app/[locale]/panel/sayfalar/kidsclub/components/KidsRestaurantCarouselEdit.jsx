"use client";
import { useState } from "react";

export default function KidsRestaurantCarouselEdit({ data, setData, langs }) {
  const val = data.kidsRestaurantCarousel || {};
  const [uploading, setUploading] = useState({}); // { 0: bool, 1: bool, ... }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Liste maddeleri (aynı kaldı)...
  const listLength = (val.list?.tr || []).length;
  const handleListItemChange = (idx, lang, value) => {
    const updated = {};
    langs.forEach(l => {
      updated[l] = [...(val.list?.[l] || Array(listLength).fill(""))];
      if (l === lang) updated[l][idx] = value;
    });
    setData({
      ...data,
      kidsRestaurantCarousel: { ...val, list: updated },
    });
  };
  const addListItem = () => {
    const updated = {};
    langs.forEach(l => {
      updated[l] = [...(val.list?.[l] || []), ""];
    });
    setData({
      ...data,
      kidsRestaurantCarousel: { ...val, list: updated },
    });
  };
  const removeListItem = idx => {
    const updated = {};
    langs.forEach(l => {
      updated[l] = (val.list?.[l] || []).filter((_, i) => i !== idx);
    });
    setData({
      ...data,
      kidsRestaurantCarousel: { ...val, list: updated },
    });
  };

  // Genel subtitle/title/text
  const handleGeneralChange = (field, lang, value) => {
    setData({
      ...data,
      kidsRestaurantCarousel: {
        ...val,
        [field]: { ...(val[field]||{}), [lang]: value },
      },
    });
  };

  // ————— Görsel yükleme bölümü —————
  const uploadImage = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [idx]: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const url = result.imageUrl || result.path;
      const imgs = [...(val.images || [])];
      imgs[idx] = url;
      setData({
        ...data,
        kidsRestaurantCarousel: { ...val, images: imgs },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(prev => ({ ...prev, [idx]: false }));
    }
  };

  const removeImage = idx => {
    setData({
      ...data,
      kidsRestaurantCarousel: {
        ...val,
        images: (val.images || []).filter((_, i) => i !== idx),
      },
    });
  };

  const addImage = () => {
    setData({
      ...data,
      kidsRestaurantCarousel: {
        ...val,
        images: [...(val.images || []), ""],
      },
    });
  };

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <h3 className="font-bold text-xl mb-4">Kids Restaurant Carousel</h3>

      {/* Subtitle, Title, Text */}
      {["subtitle", "title", "text"].map(field => (
        <div key={field} className="mb-4">
          <label className="block font-semibold mb-1">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="flex flex-wrap gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                placeholder={lang.toUpperCase()}
                className="border p-2 rounded w-[180px]"
                value={val[field]?.[lang] || ""}
                onChange={e => handleGeneralChange(field, lang, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Liste maddeleri */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Liste Maddeleri</label>
        {Array.from({ length: listLength }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2 bg-white p-2 rounded">
            <span className="w-6 text-center font-medium">{idx + 1}.</span>
            {langs.map(lang => (
              <input
                key={lang}
                placeholder={lang.toUpperCase()}
                className="border p-2 rounded w-full"
                value={val.list?.[lang]?.[idx] || ""}
                onChange={e => handleListItemChange(idx, lang, e.target.value)}
              />
            ))}
            <button
              type="button"
              className="text-red-600 hover:underline"
              onClick={() => removeListItem(idx)}
            >
              Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={addListItem}
        >
          + Madde Ekle
        </button>
      </div>

      {/* Görseller */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Görseller</h4>
        {(val.images || []).map((img, idx) => (
          <div key={idx} className="flex items-center gap-4 mb-3">
            <input
              type="file"
              accept="image/*"
              disabled={uploading[idx]}
              onChange={e => uploadImage(idx, e)}
            />
            {uploading[idx] && <span className="text-blue-600">Yükleniyor…</span>}
            {img && (
              <img
                src={img.startsWith("/") ? `${apiUrl}${img}` : img}
                alt={`slide-${idx}`}
                className="w-20 h-12 object-cover rounded border"
              />
            )}
            <button
              type="button"
              className="text-red-600 hover:underline"
              onClick={() => removeImage(idx)}
            >
              Sil
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={addImage}
        >
          + Görsel Ekle
        </button>
      </div>
    </section>
  );
}
