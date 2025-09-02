"use client";

import { useRef, useState } from "react";

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
  const [modalLoading, setModalLoading] = useState(false);
  const fileInputRef = useRef(null);

  const toSrc = (p) =>
    !p
      ? ""
      : p.startsWith("http")
      ? p
      : `${apiUrl}${p.startsWith("/") ? "" : "/"}${p}`;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
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
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const openModal = async () => {
    try {
      setModalLoading(true);
      const res = await fetch(`${apiUrl}/api/upload/list`);
      const files = await res.json();
      setExistingImages(Array.isArray(files) ? files : []);
      setShowModal(true);
    } catch (err) {
      alert("Mevcut görseller alınamadı.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleSelectExisting = (imgPath) => {
    onChange(`/uploads/${imgPath}`);
    setShowModal(false);
  };

  const clearImage = () => onChange("");

  return (
    <div className={`rounded-2xl border bg-white overflow-hidden ${className}`}>
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h4 className="text-sm font-semibold">{label}</h4>
        <div className="flex gap-2">
          <label className="inline-flex items-center px-3 py-1.5 rounded-md bg-black text-white text-sm cursor-pointer hover:bg-black/90">
            Bilgisayardan Seç
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={openModal}
            className="px-3 py-1.5 rounded-md border text-sm hover:bg-black/5"
          >
            Galeriden Seç
          </button>
        </div>
      </div>

      {/* Preview alanı */}
      <div className="p-4">
        <div className="aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50 relative">
          {value ? (
            <>
              <img
                src={toSrc(value)}
                alt="Yüklenen görsel"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 px-2.5 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700"
              >
                Kaldır
              </button>
            </>
          ) : (
            <div className="h-full w-full grid place-items-center text-gray-400 text-sm">
              Görsel seçilmedi
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 grid place-items-center bg-white/70 text-sm text-blue-700">
              Yükleniyor…
            </div>
          )}
        </div>

        {/* Path input (readonly info) */}
        <div className="mt-3">
          <input
            type="text"
            readOnly
            value={value || ""}
            placeholder="Seçili görsel yolu burada görünür"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-gray-50"
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-auto">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {existingImages.map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handleSelectExisting(img)}
                      className="group relative rounded-lg overflow-hidden ring-1 ring-black/10 hover:ring-blue-500"
                      title="Seç"
                    >
                      <img
                        src={`${apiUrl}/uploads/${img}`}
                        alt="Seç"
                        className="w-full h-32 object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 m-1 px-2 py-0.5 rounded bg-white/90 text-xs opacity-0 group-hover:opacity-100 transition">
                        Seç
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