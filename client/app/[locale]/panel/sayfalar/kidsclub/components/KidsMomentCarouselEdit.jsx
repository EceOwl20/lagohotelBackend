"use client";
import { useState } from "react";

export default function KidsMomentCarouselEdit({ data, setData, langs }) {
  const val = data.kidsMomentCarousel || {};
  const [uploading, setUploading] = useState({}); // { 0: bool, 1: bool, ... }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Başlık güncelle
  const handleHeaderChange = (lang, value) => {
    setData({
      ...data,
      kidsMomentCarousel: {
        ...val,
        header: { ...(val.header || {}), [lang]: value }
      }
    });
  };

  // Görsel yükleme
  const handleImageUpload = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [idx]: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const url = result.imageUrl || result.path;
      const imgs = [...(val.images || [])];
      imgs[idx] = url;
      setData({
        ...data,
        kidsMomentCarousel: { ...val, images: imgs }
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(prev => ({ ...prev, [idx]: false }));
    }
  };

  // Görsel silme
  const handleRemoveImage = idx => {
    setData({
      ...data,
      kidsMomentCarousel: {
        ...val,
        images: (val.images || []).filter((_, i) => i !== idx)
      }
    });
  };

  // Yeni görsel placeholder ekle
  const handleAddImage = () => {
    setData({
      ...data,
      kidsMomentCarousel: {
        ...val,
        images: [...(val.images || []), ""]
      }
    });
  };

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <h3 className="font-bold text-xl mb-4">Kids Moment Carousel</h3>

      {/* Başlık */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Başlık</label>
        <div className="flex gap-2">
          {langs.map(lang => (
            <input
              key={lang}
              placeholder={lang.toUpperCase()}
              className="border p-2 rounded w-full"
              value={val.header?.[lang] || ""}
              onChange={e => handleHeaderChange(lang, e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Görseller */}
      <h4 className="font-semibold mb-2">Görseller</h4>
      {(val.images || []).map((img, idx) => (
        <div key={idx} className="flex items-center gap-4 mb-3">
          <input
            type="file"
            accept="image/*"
            disabled={uploading[idx]}
            onChange={e => handleImageUpload(idx, e)}
            className="border p-2 rounded"
          />
          {uploading[idx] && <span className="text-blue-600">Yükleniyor…</span>}
          {img && (
            <img
              src={img.startsWith("/") ? `${apiUrl}${img}` : img}
              alt={`moment-${idx}`}
              className="w-24 h-16 object-cover rounded border"
            />
          )}
          <button
            type="button"
            className="text-red-600 hover:underline"
            onClick={() => handleRemoveImage(idx)}
          >
            Sil
          </button>
        </div>
      ))}
      <button
        type="button"
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleAddImage}
      >
        + Görsel Ekle
      </button>
    </section>
  );
}
