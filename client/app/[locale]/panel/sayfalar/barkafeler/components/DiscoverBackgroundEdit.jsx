// components/DiscoverBackgroundEdit.jsx
"use client";
import { useState } from "react";

export default function DiscoverBackgroundEdit({
  data,
  setData,
  activeLang = "tr",
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState(false);

  const db = data.discoverBackground || {};

  // aktif dilde alan güncelle
  const setLangField = (field, val) =>
    setData((prev) => ({
      ...prev,
      discoverBackground: {
        ...(prev.discoverBackground || {}),
        [field]: {
          ...(prev.discoverBackground?.[field] || {}),
          [activeLang]: val,
        },
      },
    }));

  // global link
  const setLink = (val) =>
    setData((prev) => ({
      ...prev,
      discoverBackground: { ...(prev.discoverBackground || {}), link: val },
    }));

  // görsel yükle
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Yükleme başarısız");

      setData((prev) => ({
        ...prev,
        discoverBackground: {
          ...(prev.discoverBackground || {}),
          image: json.imageUrl || json.path,
        },
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = () =>
    setData((prev) => ({
      ...prev,
      discoverBackground: { ...(prev.discoverBackground || {}), image: "" },
    }));

  const imgSrc =
    db.image ? (db.image.startsWith("/") ? `${apiUrl}${db.image}` : db.image) : "";

  return (
    <section className="rounded-xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h3 className="text-[22px] font-semibold">Discover Background</h3>
        <span className="text-sm text-gray-500">
          Aktif dil: <strong>{activeLang.toUpperCase()}</strong>
        </span>
      </div>

      <div className="p-4 space-y-6">
        {/* Görsel alanı */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Arka Plan Görseli</label>

          <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-4">
            <div className="rounded-lg ring-1 ring-black/10 p-2 bg-gray-50">
              {imgSrc ? (
                <div className="relative">
                  <img
                    src={imgSrc}
                    alt="Background"
                    className="w-full h-36 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Kaldır
                  </button>
                </div>
              ) : (
                <div className="h-36 rounded-md border-2 border-dashed border-gray-300 grid place-items-center text-gray-500 text-sm">
                  Görsel yok
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="inline-flex items-center px-3 py-2 rounded-lg bg-black text-white text-sm cursor-pointer hover:bg-black/90">
                Dosya Seç
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                readOnly
                value={db.image || ""}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 cursor-not-allowed"
                placeholder="/uploads/…"
              />
              {uploading && (
                <span className="text-sm text-blue-600 whitespace-nowrap">
                  Yükleniyor…
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Metin alanları (aktif dil) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Alt Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={db.subtitle?.[activeLang] || ""}
              onChange={(e) => setLangField("subtitle", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={db.title?.[activeLang] || ""}
              onChange={(e) => setLangField("title", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Açıklama ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={3}
              value={db.text?.[activeLang] || ""}
              onChange={(e) => setLangField("text", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Buton Metni ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={db.buttonText?.[activeLang] || ""}
              onChange={(e) => setLangField("buttonText", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        {/* Global link */}
        <div>
          <label className="block text-sm font-medium mb-1">Buton Linki</label>
          <input
            type="text"
            value={db.link || ""}
            onChange={(e) => setLink(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://…"
          />
        </div>
      </div>
    </section>
  );
}
