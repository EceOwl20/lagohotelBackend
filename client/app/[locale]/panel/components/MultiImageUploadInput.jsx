"use client";

import { useEffect, useRef, useState } from "react";

export default function MultiImageUploadInput({
  value = [],        // Array of image paths
  onChange,          // Callback to update parent with new array
  label = "Resimler", 
  className = ""
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [existingImages, setExistingImages] = useState([]);

  // Bilgisayardan yükleme
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const newImages = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(`${apiUrl}/api/upload`, {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        if (res.ok && result.imageUrl) {
          newImages.push(result.imageUrl);
        }
      } catch (err) {
        console.error("Yükleme hatası:", err);
      }
    }

    setUploading(false);
    if (newImages.length > 0) {
      onChange([...(value || []), ...newImages]);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Upload klasöründen seçilecek görselleri çek
  useEffect(() => {
    if (showModal) {
      fetch(`${apiUrl}/api/upload/list`)
        .then((r) => r.json())
        .then((files) => setExistingImages(files))
        .catch(console.error);
    }
  }, [showModal]);

  const handleSelectExisting = (imgPath) => {
    if (!value.includes(imgPath)) {
      onChange([...(value || []), imgPath]);
    }
  };

  const handleRemove = (imgPath) => {
    onChange((value || []).filter((v) => v !== imgPath));
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="font-medium">{label}</label>
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="block"
        />
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
        >
          Galeriden Seç
        </button>
      </div>

      {uploading && <span className="text-blue-500 text-sm">Yükleniyor...</span>}

      {/* Yüklenen veya seçilen resimler */}
      <div className="flex flex-wrap gap-2 mt-2">
        {(value || []).map((img, i) => (
          <div key={i} className="relative">
            <img
              src={img.startsWith("http") ? img : `${apiUrl}${img.startsWith("/") ? "" : "/"}${img}`}
              alt={`Seçilen ${i}`}
              className="w-24 h-20 object-cover rounded shadow"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-bl px-1"
              onClick={() => handleRemove(img)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg p-4 max-w-[600px] w-full max-h-[80vh] overflow-auto">
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
                  onClick={() => handleSelectExisting(`/uploads/${img}`)}
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
