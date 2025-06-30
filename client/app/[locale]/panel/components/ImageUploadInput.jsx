"use client";
import { useRef } from "react";

export default function ImageUploadInput({ value, onChange }) {
  const fileInputRef = useRef();

  // Seçili dosyayı API'ye yükle ve URL döndür
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.url) onChange(data.url); // 👈 URL'i parent'a geçir!
  };

  return (
    <div className="flex flex-col gap-2 mb-2">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
      />
      {value && (
        <img
          src={value}
          alt="Yüklenen görsel"
          className="max-h-32 object-contain"
        />
      )}
    </div>
  );
}
