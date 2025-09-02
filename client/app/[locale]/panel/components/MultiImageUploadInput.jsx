"use client";

import { useEffect, useRef, useState } from "react";

export default function MultiImageUploadInput({
  value = [],          // string[]
  onChange,            // (newArray) => void
  label = "Resimler",
  className = "",
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const toSrc = (p) =>
    !p
      ? ""
      : p.startsWith("http")
      ? p
      : `${apiUrl}${p.startsWith("/") ? "" : "/"}${p}`;

  // Bilgisayardan yükleme
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

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

  // Upload klasöründen list
  useEffect(() => {
    if (!showModal) return;
    (async () => {
      try {
        setModalLoading(true);
        const r = await fetch(`${apiUrl}/api/upload/list`);
        const files = await r.json();
        setExistingImages(Array.isArray(files) ? files : []);
      } catch (e) {
        console.error(e);
      } finally {
        setModalLoading(false);
      }
    })();
  }, [showModal, apiUrl]);

  const handleSelectExisting = (imgPath) => {
    const p = imgPath.startsWith("/uploads/") ? imgPath : `/uploads/${imgPath}`;
    if (!(value || []).includes(p)) {
      onChange([...(value || []), p]);
    }
  };

  const handleRemove = (imgPath) => {
    onChange((value || []).filter((v) => v !== imgPath));
  };

  return (
    <div className={`rounded-2xl border bg-white overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h4 className="text-sm font-semibold">{label}</h4>
        <div className="flex gap-2">
          <label className="inline-flex items-center px-3 py-1.5 rounded-md bg-black text-white text-sm cursor-pointer hover:bg-black/90">
            Bilgisayardan Seç
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-3 py-1.5 rounded-md border text-sm hover:bg-black/5"
          >
            Galeriden Seç
          </button>
        </div>
      </div>

      {/* İçerik */}
      <div className="p-4">
        {uploading && (
          <div className="mb-3 text-sm text-blue-700">Yükleniyor…</div>
        )}

        {/* Grid preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {(value || []).map((img, i) => (
            <div
              key={`${img}-${i}`}
              className="group relative rounded-lg overflow-hidden ring-1 ring-black/10"
            >
              <img
                src={toSrc(img)}
                alt={`Seçilen ${i + 1}`}
                className="w-full h-28 object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 px-2 py-0.5 rounded bg-red-600 text-white text-xs opacity-90 hover:opacity-100"
                onClick={() => handleRemove(img)}
                title="Kaldır"
              >
                ×
              </button>
              <div className="absolute inset-x-1 bottom-1 rounded bg-white/90 text-[10px] px-1 py-0.5 truncate opacity-0 group-hover:opacity-100">
                {img}
              </div>
            </div>
          ))}

          {(value || []).length === 0 && (
            <div className="col-span-full text-sm text-gray-500">
              Henüz görsel yok. “Bilgisayardan Seç” veya “Galeriden Seç” ile ekleyin.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h3 className="text-base font-semibold">Mevcut Görseller</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-2xl leading-none px-1 text-gray-700 hover:text-black"
                aria-label="Kapat"
              >
                &times;
              </button>
            </div>

            <div className="p-4">
              {modalLoading ? (
                <div className="h-32 grid place-items-center text-gray-500">
                  Yükleniyor…
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {existingImages.map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handleSelectExisting(img)}
                      className="group relative rounded-lg overflow-hidden ring-1 ring-black/10 hover:ring-blue-500"
                      title="Ekle"
                    >
                      <img
                        src={`${apiUrl}/uploads/${img}`}
                        alt="Seç"
                        className="w-full h-28 object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 m-1 px-2 py-0.5 rounded bg-white/90 text-xs opacity-0 group-hover:opacity-100 transition">
                        Ekle
                      </span>
                    </button>
                  ))}
                  {existingImages.length === 0 && (
                    <div className="col-span-full text-sm text-gray-500">
                      Gösterilecek görsel yok.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}