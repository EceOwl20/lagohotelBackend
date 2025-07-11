"use client";
import { useState, useRef } from "react";

export default function MainBannerEdit({ data, setData }) {
  const value = data.mainBanner || {};
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // e.g. "http://localhost:5001"

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");

      // backend muhtemelen { imageUrl: "/uploads/..." } döndürüyor
      const path = result.imageUrl || result.path;
      setData({
        ...data,
        mainBanner: { ...value, image: path },
      });
    } catch (err) {
      alert("Resim yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
      // reset file input
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Main Banner Görseli</h4>

      {/* 1) URL girişi */}
      <label className="block font-semibold mb-1">Görsel URL</label>
      <input
        type="text"
        placeholder="https://... veya /uploads/..."
        value={value.image || ""}
        onChange={e =>
          setData({ ...data, mainBanner: { ...value, image: e.target.value } })
        }
        className="w-full border p-2 rounded mb-4"
      />

      {/* 2) Dosya yükleme */}
      <label className="block font-semibold mb-1">Veya Bilgisayardan Seç</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={handleUpload}
        className="block mb-4"
      />
      {uploading && <p className="text-sm text-gray-500 mb-4">Yükleniyor…</p>}

      {/* Önizleme */}
      {value.image && (
        <div>
          <p className="font-semibold mb-1">Önizleme:</p>
          <img
            src={value.image.startsWith("/") ? `${apiUrl}${value.image}` : value.image}
            alt="Banner Önizleme"
            className="w-full max-w-sm rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
