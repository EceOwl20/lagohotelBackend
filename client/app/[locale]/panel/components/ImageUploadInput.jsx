"use client";

import { useRef, useState } from "react";

export default function ImageUploadInput({
  value,         // Şu anki resim yolu (ör: "/uploads/xyz.png")
  onChange,      // Resim yüklenince çağrılacak fonksiyon (yeni url ile)
  label = "Resim Yükle", // Label opsiyonel
  className = "",
}) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    // DİKKAT: API'nin beklediği isim "image" olmalı!
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      // Geriye "/uploads/..." gibi bir url dönmeli
      onChange(result.imageUrl); // veya result.url, backend'e göre
    } catch (err) {
      alert("Resim yüklenemedi!\n" + err.message);
    }
    setLoading(false);
    // Temizle
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={"flex flex-col gap-2 " + className}>
      <label className="font-medium">{label}</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
        className="block"
      />
      {loading && <span className="text-blue-500 text-sm">Yükleniyor...</span>}
      {value && (
        <img
          src={
            value.startsWith("http") // Eğer tam url ise direkt kullan
              ? value
              : `http://localhost:5001${value.startsWith("/") ? "" : "/"}${value}`
          }
          alt="Yüklenen görsel"
          className="w-32 h-24 object-cover rounded shadow mb-2"
        />
      )}
    </div>
  );
}
