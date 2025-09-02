// app/[locale]/panel/sayfalar/sahilhavuz/components/CarouselEdit.jsx
"use client";
import { useState } from "react";

export default function CarouselEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const section = data?.carousel || {};
  const items = Array.isArray(section.carouselItem) ? section.carouselItem : [];
  const [uploading, setUploading] = useState({}); // { [idx]: boolean }

  // ---- helpers (functional updates) ----
  const setSectionField = (field, value) =>
    setData(prev => ({
      ...prev,
      carousel: {
        ...(prev?.carousel || {}),
        [field]: {
          ...((prev?.carousel && prev.carousel[field]) || {}),
          [activeLang]: value,
        },
      },
    }));

  const setItems = (updater) =>
    setData(prev => {
      const curr = Array.isArray(prev?.carousel?.carouselItem)
        ? prev.carousel.carouselItem
        : [];
      const next = typeof updater === "function" ? updater(curr) : updater;
      return { ...prev, carousel: { ...(prev?.carousel || {}), carouselItem: next } };
    });

  const addItem = () => setItems(arr => [...arr, { image: "", title: {}, span: {} }]);
  const removeItem = (idx) => setItems(arr => arr.filter((_, i) => i !== idx));

  const setItemField = (idx, field, value) =>
    setItems(arr => {
      const next = [...arr];
      const it = next[idx] || {};
      next[idx] = { ...it, [field]: { ...(it[field] || {}), [activeLang]: value } };
      return next;
    });

  const setItemImage = (idx, value) =>
    setItems(arr => {
      const next = [...arr];
      const it = next[idx] || {};
      next[idx] = { ...it, image: value };
      return next;
    });

  const uploadImage = async (idx, file) => {
    if (!file) return;
    setUploading(u => ({ ...u, [idx]: true }));
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Yükleme başarısız");
      const url = json.imageUrl || json.path;
      if (url) setItemImage(idx, url);
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading(u => ({ ...u, [idx]: false }));
    }
  };

  const val = (field) => section?.[field]?.[activeLang] || "";

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🎠 Carousel (Slider)</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Üst seviye alanlar (aktif dil) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Alt Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={val("subtitle")}
              onChange={(e) => setSectionField("subtitle", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={val("title")}
              onChange={(e) => setSectionField("title", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Açıklama ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={2}
              value={val("text")}
              onChange={(e) => setSectionField("text", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Slaytlar</h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
          >
            + Slide Ekle
          </button>
        </div>

        {/* Slayt listesi */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const src = item?.image
              ? item.image.startsWith("/") ? `${apiUrl}${item.image}` : item.image
              : "";
            return (
              <div key={idx} className="rounded-xl border overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b bg-slate-50">
                  <strong>Slide #{idx + 1}</strong>
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                  >
                    Sil
                  </button>
                </div>

                <div className="p-4 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                  {/* Sol: Görsel */}
                  <div className="space-y-3">
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
                      {src ? (
                        <img src={src} alt={`slide-${idx}`} className="h-full w-full object-cover" />
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
                          disabled={!!uploading[idx]}
                          onChange={(e) => uploadImage(idx, e.target.files?.[0] || null)}
                        />
                      </label>
                      <button
                        type="button"
                        className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                        onClick={() => setItemImage(idx, "")}
                      >
                        Kaldır
                      </button>
                      {uploading[idx] && <span className="text-sm text-blue-600">Yükleniyor…</span>}
                    </div>
                    <input
                      type="text"
                      value={item.image || ""}
                      onChange={(e) => setItemImage(idx, e.target.value)}
                      placeholder="/uploads/... veya tam URL"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>

                  {/* Sağ: Alanlar (aktif dil) */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Başlık ({activeLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={item?.title?.[activeLang] || ""}
                        onChange={(e) => setItemField(idx, "title", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Alt Başlık ({activeLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={item?.span?.[activeLang] || ""}
                        onChange={(e) => setItemField(idx, "span", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="rounded-xl border bg-slate-50 p-4 text-sm text-gray-600">
              Henüz slayt yok. “Slide Ekle” ile başlayın.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
