// app/[locale]/panel/sayfalar/sahilhavuz/components/ImageBackgroundEdit.jsx
"use client";
import { useState } from "react";

export default function ImageBackgroundEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState(false);

  const section = data?.imageBackground || {};
  const imgSrc = section.image
    ? (section.image.startsWith("/") ? `${apiUrl}${section.image}` : section.image)
    : "";

  const setImage = (value) =>
    setData((prev) => ({
      ...prev,
      imageBackground: { ...(prev?.imageBackground || {}), image: value },
    }));

  const uploadImage = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Yükleme başarısız");
      const url = json.imageUrl || json.path;
      if (url) setImage(url);
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  };

  const setField = (field, value) =>
    setData((prev) => ({
      ...prev,
      imageBackground: {
        ...(prev?.imageBackground || {}),
        [field]: {
          ...((prev?.imageBackground && prev.imageBackground[field]) || {}),
          [activeLang]: value,
        },
      },
    }));

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🏝️ Beach Arka Plan Bölümü</h2>
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
        {/* Sol: Görsel alanı */}
        <div className="space-y-4">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
            {imgSrc ? (
              <img src={imgSrc} alt="Arka plan" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full grid place-items-center text-gray-400 text-sm">
                Önizleme yok
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center px-3 py-2 rounded-md bg-black text-white text-sm cursor-pointer hover:bg-black/90">
              Dosya Seç
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => uploadImage(e.target.files?.[0] || null)}
              />
            </label>
            <button
              type="button"
              className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
              onClick={() => setImage("")}
            >
              Kaldır
            </button>
            {uploading && <span className="text-sm text-blue-600">Yükleniyor…</span>}
          </div>

          <input
            type="text"
            value={section.image || ""}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/uploads/... veya tam URL"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {/* Sağ: Aktif dile göre metin alanları */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Alt Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={section?.subtitle?.[activeLang] || ""}
              onChange={(e) => setField("subtitle", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={section?.title?.[activeLang] || ""}
              onChange={(e) => setField("title", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Açıklama 1 ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={section?.text1?.[activeLang] || ""}
                onChange={(e) => setField("text1", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Açıklama 2 ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={section?.text2?.[activeLang] || ""}
                onChange={(e) => setField("text2", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                İkon 1 Metin ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={section?.icon1Text?.[activeLang] || ""}
                onChange={(e) => setField("icon1Text", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                İkon 2 Metin ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={section?.icon2Text?.[activeLang] || ""}
                onChange={(e) => setField("icon2Text", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
