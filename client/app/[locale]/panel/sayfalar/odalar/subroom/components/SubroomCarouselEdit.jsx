"use client";
import { useState } from "react";

export default function SubroomCarouselEdit({ data, setData }) {
  const [uploading, setUploading] = useState({});

const items = Array.isArray(data.carousel) ? data.carousel : [];


  // Resim yükleme fonksiyonu (her index için ayrı)
  const handleImageUpload = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [idx]: true }));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (!res.ok || !result.imageUrl) {
        throw new Error(result.error || "Yükleme başarısız");
      }

      // En güncel state'i fonksiyonel olarak güncelle!
      setData(prevRoom => {
        const currentCarousel = prevRoom.carousel || [];
        const newCarousel = [...currentCarousel];
        while (newCarousel.length <= idx) newCarousel.push("");
        newCarousel[idx] = result.imageUrl;
        return { ...prevRoom, carousel: newCarousel };
      });

    } catch (err) {
      alert("Resim yüklenemedi: " + (err.message || ""));
    } finally {
      setUploading(prev => ({ ...prev, [idx]: false }));
    }
  };

  const handleAdd = () => {
    setData(prevRoom => ({
      ...prevRoom,
      carousel: [...(prevRoom.carousel || []), ""],
    }));
  };

  const handleDelete = idx => {
    setData(prevRoom => ({
      ...prevRoom,
      carousel: (prevRoom.carousel || []).filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">
        Carousel Resimleri ({items.length} adet)
      </h3>
      {items.length === 0 && (
        <p className="text-gray-500 mb-4">
          Henüz carousel resmi yok. Yeni resim ekleyin.
        </p>
      )}

      {items.map((url, idx) => (
        <div key={idx} className="flex gap-3 items-center mb-3 p-3 border rounded">
          <div className="flex-1">
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Resim {idx + 1}</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageUpload(e, idx)}
                disabled={uploading[idx]}
                className="mb-2"
              />
              {uploading[idx] && (
                <p className="text-blue-600 text-sm">Yükleniyor...</p>
              )}
            </div>
            {url && (
              <div>
                <img
                  src={`http://localhost:5001${url}`}
                  alt={`carousel-${idx}`}
                  className="w-32 h-20 object-cover rounded border"
                />
                <p className="text-xs text-gray-500 mt-1">URL: {url}</p>
              </div>
            )}
            {!url && !uploading[idx] && (
              <p className="text-gray-400 text-sm">Resim seçilmedi</p>
            )}
          </div>
          <button
            onClick={() => handleDelete(idx)}
            className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-300 rounded"
            type="button"
          >
            Sil
          </button>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        type="button"
      >
        + Yeni Resim Ekle
      </button>
    </div>
  );
}
