"use client";

import { useRef, useState, useEffect } from "react";

export default function ImageUploadInput({
  value,
  onChange,
  label = "Resim Yükle",
  className = "",
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      onChange(result.imageUrl);
    } catch (err) {
      alert("Resim yüklenemedi!\n" + err.message);
    }
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openModal = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/upload/list`);
      const files = await res.json();
      setExistingImages(files);
      setShowModal(true);
    } catch (err) {
      alert("Mevcut görseller alınamadı.");
    }
  };

  const handleSelectExisting = (imgPath) => {
    onChange(`/uploads/${imgPath}`);
    setShowModal(false);
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

      <button
        type="button"
        onClick={openModal}
        className="mt-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm w-fit"
      >
        Resimlerden Seç
      </button>

      {loading && <span className="text-blue-500 text-sm">Yükleniyor...</span>}

      {value && (
        <img
          src={
            value.startsWith("http")
              ? value
              : `${apiUrl}${value.startsWith("/") ? "" : "/"}${value}`
          }
          alt="Yüklenen görsel"
          className="w-32 h-24 object-cover rounded shadow"
        />
      )}

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="relative bg-white rounded-lg p-4 max-w-[600px] w-full max-h-[80vh] overflow-auto">
      
      {/* Çıkış Butonu */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-black"
        aria-label="Kapat"
      >
        &times;
      </button>

      <h3 className="text-lg font-semibold mb-4">Mevcut Görseller</h3>

      <div className="grid grid-cols-3 gap-4">
        {existingImages.map((img, i) => (
          <img
            key={i}
            src={`${apiUrl}/uploads/${img}`}
            alt="Seç"
            onClick={() => handleSelectExisting(img)}
            className="cursor-pointer w-full h-32 object-cover rounded border hover:border-blue-500"
          />
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  );
}
