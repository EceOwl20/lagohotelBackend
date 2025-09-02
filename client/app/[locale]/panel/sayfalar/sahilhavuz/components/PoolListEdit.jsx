// app/[locale]/panel/sayfalar/sahilhavuz/components/PoolListEdit.jsx
"use client";
import { useState } from "react";

export default function PoolListEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const section = data?.poolListSection || {}; // { subtitle: {}, title: {}, text: {} }
  const items = Array.isArray(data?.poolList) ? data.poolList : [];

  const [uploading, setUploading] = useState({}); // { "0-image": true, "1-hoverImage": true }

  /* -------- helpers (functional updates) -------- */
  const setSectionField = (field, value) =>
    setData(prev => ({
      ...prev,
      poolListSection: {
        ...(prev?.poolListSection || {}),
        [field]: {
          ...((prev?.poolListSection && prev.poolListSection[field]) || {}),
          [activeLang]: value,
        },
      },
    }));

  const setItems = (updater) =>
    setData(prev => ({
      ...prev,
      poolList: typeof updater === "function" ? updater(prev?.poolList || []) : updater,
    }));

  const addPool = () =>
    setItems(arr => [
      ...arr,
      { image: "", hoverImage: "", subtitle: {}, title: {}, description: {} },
    ]);

  const removePool = (idx) =>
    setItems(arr => arr.filter((_, i) => i !== idx));

  const setItemField = (idx, field, value) =>
    setItems(arr => {
      const next = [...arr];
      const cur = next[idx] || {};
      next[idx] = {
        ...cur,
        [field]: { ...(cur[field] || {}), [activeLang]: value },
      };
      return next;
    });

  const setItemImage = (idx, key, value) =>
    setItems(arr => {
      const next = [...arr];
      next[idx] = { ...(next[idx] || {}), [key]: value };
      return next;
    });

  const uploadImage = async (idx, key, file) => {
    if (!file) return;
    const ukey = `${idx}-${key}`;
    setUploading(u => ({ ...u, [ukey]: true }));
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Yükleme başarısız");
      const url = json.imageUrl || json.path;
      if (url) setItemImage(idx, key, url);
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading(u => ({ ...u, [ukey]: false }));
    }
  };

  const toSrc = (p) => (p ? (p.startsWith("/") ? `${apiUrl}${p}` : p) : "");

  /* -------------------- UI -------------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🏖️ Havuz Listesi</h2>
      </div>

      <div className="p-4 space-y-8">
        {/* Üst bölüm (liste başlık & açıklama) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-3">Liste Başlık & Açıklama</h3>

          {/* Alt Başlık */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Alt Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={section?.subtitle?.[activeLang] || ""}
              onChange={(e) => setSectionField("subtitle", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          {/* Başlık */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={section?.title?.[activeLang] || ""}
              onChange={(e) => setSectionField("title", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Açıklama ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={3}
              value={section?.text?.[activeLang] || ""}
              onChange={(e) => setSectionField("text", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        {/* Havuz kartları */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Havuz Kartları</h3>
          <button
            type="button"
            onClick={addPool}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
          >
            + Havuz Ekle
          </button>
        </div>

        {items.map((item, idx) => {
          const imgSrc = toSrc(item.image);
          const hoverSrc = toSrc(item.hoverImage);

          return (
            <div key={idx} className="rounded-xl ring-1 ring-black/5 overflow-hidden">
              {/* kart header */}
              <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
                <div className="font-medium">Havuz #{idx + 1}</div>
                <button
                  type="button"
                  onClick={() => removePool(idx)}
                  className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Sil
                </button>
              </div>

              {/* kart body */}
              <div className="p-4 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
                {/* Sol: Görseller */}
                <div className="space-y-6">
                  {/* Ana Görsel */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">Görsel</label>
                    <div className="aspect-[3/2] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
                      {imgSrc ? (
                        <img src={imgSrc} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-gray-400 text-sm">
                          Görsel yok
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
                          disabled={!!uploading[`${idx}-image`]}
                          onChange={(e) => uploadImage(idx, "image", e.target.files?.[0] || null)}
                        />
                      </label>
                      <button
                        type="button"
                        className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                        onClick={() => setItemImage(idx, "image", "")}
                      >
                        Kaldır
                      </button>
                      {uploading[`${idx}-image`] && (
                        <span className="text-sm text-blue-600">Yükleniyor…</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.image || ""}
                      onChange={(e) => setItemImage(idx, "image", e.target.value)}
                      placeholder="/uploads/... veya tam URL"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>

                  {/* Hover Görsel */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">Hover Görsel</label>
                    <div className="aspect-[3/2] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
                      {hoverSrc ? (
                        <img src={hoverSrc} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-gray-400 text-sm">
                          Görsel yok
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
                          disabled={!!uploading[`${idx}-hoverImage`]}
                          onChange={(e) => uploadImage(idx, "hoverImage", e.target.files?.[0] || null)}
                        />
                      </label>
                      <button
                        type="button"
                        className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                        onClick={() => setItemImage(idx, "hoverImage", "")}
                      >
                        Kaldır
                      </button>
                      {uploading[`${idx}-hoverImage`] && (
                        <span className="text-sm text-blue-600">Yükleniyor…</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.hoverImage || ""}
                      onChange={(e) => setItemImage(idx, "hoverImage", e.target.value)}
                      placeholder="/uploads/... veya tam URL"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Sağ: Aktif dil metinleri */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Alt Başlık ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={item?.subtitle?.[activeLang] || ""}
                      onChange={(e) => setItemField(idx, "subtitle", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

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
                      Açıklama ({activeLang.toUpperCase()})
                    </label>
                    <textarea
                      rows={4}
                      value={item?.description?.[activeLang] || ""}
                      onChange={(e) => setItemField(idx, "description", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
