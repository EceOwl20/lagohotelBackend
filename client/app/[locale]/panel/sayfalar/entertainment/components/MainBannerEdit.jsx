"use client";
import { useState, useRef } from "react";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function MainBannerEdit({ data, setData }) {
  const value = data.mainBanner || {};
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
      <ImageUploadInput
        value={value.image}
        onChange={(url) =>
          setData({
            ...data,
            mainBanner: {
              ...value,
              image: url,
            },
          })
        }
        label="Banner Görsel"
      />
    </div>
  );
}
