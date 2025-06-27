// app/components/panel/ImageUploadInput.jsx
"use client";
import React from "react";

export default function ImageUploadInput({ value, onChange, label }) {
  const fileInput = React.useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Örnek: /api/upload endpoint’i ile upload edebilirsin veya sadece local olarak göster
    // Burada base64 örneği var:
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result); // base64 url
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-2">
      {label && <label className="block mb-1">{label}</label>}
      {value && (
        <img
          src={value}
          alt="Yüklenen görsel"
          className="w-24 h-24 object-cover mb-2 rounded"
        />
      )}
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="block"
      />
      <button
        type="button"
        className="mt-1 px-2 py-1 bg-gray-200 rounded"
        onClick={() => {
          onChange("");
          fileInput.current.value = "";
        }}
      >
        Temizle
      </button>
    </div>
  );
}
