// components/BarCarouselEdit.jsx
"use client";
import { useState } from "react";

export default function BarCarouselEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState(false);

  const bar = data.barCarousel || {};
  const images = Array.isArray(bar.images) ? bar.images : [];
  const lists  = Array.isArray(bar.lists)  ? bar.lists  : [];

  // ---- helpers ----
  const setLangField = (field, val) =>
    setData(prev => ({
      ...prev,
      barCarousel: {
        ...(prev.barCarousel || {}),
        [field]: { ...(prev.barCarousel?.[field] || {}), [activeLang]: val },
      },
    }));

  const addList = () =>
    setData(prev => ({
      ...prev,
      barCarousel: {
        ...(prev.barCarousel || {}),
        lists: [...(prev.barCarousel?.lists || []), { [activeLang]: "" }],
      },
    }));

  const removeList = (idx) =>
    setData(prev => ({
      ...prev,
      barCarousel: {
        ...(prev.barCarousel || {}),
        lists: (prev.barCarousel?.lists || []).filter((_, i) => i !== idx),
      },
    }));

  const handleListChange = (idx, val) =>
    setData(prev => {
      const cur = prev.barCarousel?.lists || [];
      const upd = cur.map((it, i) => (i === idx ? { ...it, [activeLang]: val } : it));
      return { ...prev, barCarousel: { ...(prev.barCarousel || {}), lists: upd } };
    });

  const setGlobalLink = (val) =>
    setData(prev => ({
      ...prev,
      barCarousel: { ...(prev.barCarousel || {}), link: val },
    }));

  // ---- images ----
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("image", file);
        const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: fd });
        const json = await res.json();
        if (res.ok && (json.imageUrl || json.path)) uploaded.push(json.imageUrl || json.path);
      }
      if (uploaded.length) {
        setData(prev => ({
          ...prev,
          barCarousel: {
            ...(prev.barCarousel || {}),
            images: [...(prev.barCarousel?.images || []), ...uploaded],
          },
        }));
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImg = (idx) =>
    setData(prev => ({
      ...prev,
      barCarousel: {
        ...(prev.barCarousel || {}),
        images: (prev.barCarousel?.images || []).filter((_, i) => i !== idx),
      },
    }));

  return (
    <section className="rounded-xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h3 className="text-[22px] font-semibold">Bar Carousel</h3>
        <span className="text-sm text-gray-500">
          Aktif dil: <strong>{activeLang.toUpperCase()}</strong>
        </span>
      </div>

      <div className="p-4 space-y-6">
        {/* IMAGES */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Resimler</label>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center px-3 py-2 rounded-lg bg-black text-white text-sm cursor-pointer hover:bg-black/90">
              Dosya Seç (çoklu)
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {uploading && <span className="text-sm text-blue-600">Yükleniyor…</span>}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, idx) => {
              const src = img?.startsWith("/") ? `${apiUrl}${img}` : img;
              return (
                <div key={idx} className="relative group rounded-md overflow-hidden ring-1 ring-black/10 bg-white">
                  <img src={src} alt="" className="w-full h-28 object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImg(idx)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition
                               px-2 py-1 text-xs rounded bg-red-600 text-white"
                  >
                    Kaldır
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* FIELDS (activeLang) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Alt Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={bar.subtitle?.[activeLang] || ""}
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
              value={bar.title?.[activeLang] || ""}
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
              value={bar.text?.[activeLang] || ""}
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
              value={bar.buttonText?.[activeLang] || ""}
              onChange={(e) => setLangField("buttonText", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        {/* LISTS */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Liste Maddeleri</h4>
            <button
              type="button"
              onClick={addList}
              className="inline-flex items-center gap-1 rounded-lg bg-green-600 text-white px-3 py-1.5 text-sm hover:bg-green-700"
            >
              + Madde Ekle
            </button>
          </div>

          {lists.map((item, idx) => (
            <div key={idx} className="rounded-lg bg-gray-50 p-3 ring-1 ring-black/10 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Madde #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeList(idx)}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Sil
                </button>
              </div>
              <label className="block text-sm font-medium mb-1">
                Metin ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={item?.[activeLang] || ""}
                onChange={(e) => handleListChange(idx, e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          ))}
        </div>

        {/* GLOBAL LINK */}
        <div>
          <label className="block text-sm font-medium mb-1">Ortak Link</label>
          <input
            type="text"
            value={bar.link || ""}
            onChange={(e) => setGlobalLink(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://..."
          />
        </div>
      </div>
    </section>
  );
}
