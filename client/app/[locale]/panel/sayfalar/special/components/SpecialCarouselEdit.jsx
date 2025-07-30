"use client";
import React, { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SpecialCarouselEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState({});
  const carousel = data.carousel || { title: {}, images: [] };

  // Title alanı değiştir
  const handleTitleChange = (lang, value) => {
    setData((prev) => ({
      ...prev,
      carousel: {
        ...carousel,
        title: {
          ...carousel.title,
          [lang]: value,
        },
      },
    }));
  };

  // Images dizisi değiştir
  const handleImageChange = (index, value) => {
    const newImages = [...(carousel.images || [])];
    newImages[index] = value;
    setData((prev) => ({
      ...prev,
      carousel: {
        ...carousel,
        images: newImages,
      },
    }));
  };

  const addImage = () => {
    setData((prev) => ({
      ...prev,
      carousel: {
        ...carousel,
        images: [...(carousel.images || []), ""],
      },
    }));
  };

  const removeImage = (index) => {
    const newImages = [...(carousel.images || [])];
    newImages.splice(index, 1);
    setData((prev) => ({
      ...prev,
      carousel: {
        ...carousel,
        images: newImages,
      },
    }));
  };

  const handleImageUpload = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((u) => ({ ...u, [idx]: true }));

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Yükleme başarısız");

      const path = json.path || json.imageUrl;
      handleImageChange(idx, path);
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading((u) => ({ ...u, [idx]: false }));
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-bold text-2xl mb-4">Special Carousel</h3>

      {/* Carousel title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map((lang) => (
          <div key={lang}>
            <h4 className="font-semibold mb-1">Title ({lang})</h4>
            <input
              type="text"
              className="border rounded w-full p-2 mb-2"
              value={carousel.title?.[lang] || ""}
              onChange={(e) => handleTitleChange(lang, e.target.value)}
            />
          </div>
        ))}
      </div>

      <hr className="my-6" />

      {/* Images */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-xl">Images</h4>
        <button
          className="px-4 py-2 rounded bg-green-600 text-white"
          onClick={addImage}
        >
          + Resim Ekle
        </button>
      </div>

      {(carousel.images || []).map((image, index) => (
        <div key={index} className="border p-4 mb-4 rounded">
          <div className="flex justify-between items-center mb-4">
            <span>Image {index + 1}</span>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => removeImage(index)}
            >
              Sil
            </button>
          </div>
          <input
            type="text"
            className="border rounded w-full p-2 mb-2"
            placeholder="Image URL"
            value={image || ""}
            onChange={(e) => handleImageChange(index, e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="mt-2"
            onChange={(e) => handleImageUpload(e, index)}
          />
          {uploading[index] && <p className="text-blue-600 text-sm">Yükleniyor...</p>}
          {image && (
            <img
              src={image}
              alt={`Carousel ${index}`}
              className="mt-2 max-h-32 border rounded"
            />
          )}
        </div>
      ))}
    </div>
  );
}
