// components/OtherOptions4Edit.jsx
"use client";
import React, { useState } from "react";

const LANGS = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "İngilizce" },
  { key: "de", label: "Almanca" },
  { key: "ru", label: "Rusça" },
];

export default function OtherOptions4Edit({ data, setData, blockName, activeLang = "tr" }) {
  const items = data[blockName] || [];
  const [uploading, setUploading] = useState({});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // --- factories/helpers ---
  const makeEmptySub = () => ({ image: "", link: "", title: {}, subtitle: {}, text: {} });
  const ensure4Subs = (arr) => {
    const base = Array.isArray(arr) ? [...arr] : [];
    while (base.length < 4) base.push(makeEmptySub());
    return base.slice(0, 4);
  };

  const addItem = () =>
    setData(prev => {
      const arr = prev[blockName] || [];
      const empty = { title: {}, subtitle: {}, text: {}, cuisine: ensure4Subs([]) };
      return { ...prev, [blockName]: [...arr, empty] };
    });

  const removeItem = (idx) =>
    setData(prev => {
      const arr = prev[blockName] || [];
      return { ...prev, [blockName]: arr.filter((_, i) => i !== idx) };
    });

  const setMainField = (idx, field, lang, value) =>
    setData(prev => {
      const arr = prev[blockName] || [];
      const upd = [...arr];
      const cur = upd[idx] || {};
      upd[idx] = { ...cur, [field]: { ...(cur[field] || {}), [lang]: value } };
      return { ...prev, [blockName]: upd };
    });

  const mutateSub = (idx, subIdx, patch) =>
    setData(prev => {
      const arr = prev[blockName] || [];
      const upd = [...arr];
      const cur = upd[idx] || {};
      const subs = ensure4Subs(cur.cuisine);
      subs[subIdx] = { ...(subs[subIdx] || makeEmptySub()), ...patch(subs[subIdx] || {}) };
      upd[idx] = { ...cur, cuisine: subs };
      return { ...prev, [blockName]: upd };
    });

  const setSubField = (idx, subIdx, field, lang, value) =>
    mutateSub(idx, subIdx, sub => ({ [field]: { ...(sub[field] || {}), [lang]: value } }));

  const setSubLink = (idx, subIdx, value) => mutateSub(idx, subIdx, () => ({ link: value }));
  const setSubImageUrl = (idx, subIdx, value) => mutateSub(idx, subIdx, () => ({ image: value }));

  const handleSubImageUpload = async (e, idx, subIdx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const k = `${idx}-${subIdx}`;
    setUploading(u => ({ ...u, [k]: true }));
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setSubImageUrl(idx, subIdx, result.imageUrl || result.path);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(u => ({ ...u, [k]: false }));
    }
  };

  // --- UI ---
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[22px] font-semibold">
          {blockName?.replace(/([A-Z])/g, " $1") || "Other Options"}
        </h3>
        <span className="text-sm text-gray-500">
          Aktif dil: <strong>{activeLang.toUpperCase()}</strong>
        </span>
      </div>

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
      >
        + Ekle
      </button>

      {items.map((item, idx) => {
        const subs = ensure4Subs(item.cuisine);
        return (
          <div key={idx} className="rounded-xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
              <div className="font-medium">Öğe #{idx + 1}</div>
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Sil
              </button>
            </div>

            <div className="p-4 grid grid-cols-1 gap-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Alt Başlık ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={item.subtitle?.[activeLang] || ""}
                    onChange={e => setMainField(idx, "subtitle", activeLang, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Başlık ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={item.title?.[activeLang] || ""}
                    onChange={e => setMainField(idx, "title", activeLang, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Kısa Açıklama ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={item.text?.[activeLang] || ""}
                    onChange={e => setMainField(idx, "text", activeLang, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="mt-2">
                <h4 className="font-semibold mb-3">Alt Öğeler (4 adet)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subs.map((sub, subIdx) => {
                    const k = `${idx}-${subIdx}`;
                    const img = sub.image ? (sub.image.startsWith("/") ? `${apiUrl}${sub.image}` : sub.image) : "";
                    return (
                      <div key={subIdx} className="rounded-lg ring-1 ring-black/10 p-3 bg-gray-50">
                        <strong className="block mb-2">Alt #{subIdx + 1}</strong>

                        <div className="grid grid-cols-[140px,1fr] gap-3">
                          <div className="aspect-[7/5] overflow-hidden rounded-md ring-1 ring-black/10 bg-white">
                            {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : (
                              <div className="w-full h-full grid place-items-center text-gray-400 text-xs">Görsel yok</div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <label className="inline-flex items-center px-3 py-1.5 rounded-md bg-black text-white text-sm cursor-pointer hover:bg-black/90">
                                Dosya Seç
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={e => handleSubImageUpload(e, idx, subIdx)}
                                  className="hidden"
                                  disabled={!!uploading[k]}
                                />
                              </label>
                              <button
                                type="button"
                                className="px-3 py-1.5 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                                onClick={() => setSubImageUrl(idx, subIdx, "")}
                              >
                                Kaldır
                              </button>
                              {uploading[k] && <span className="text-sm text-blue-600">Yükleniyor…</span>}
                            </div>
                            <input
                              type="text"
                              value={sub.image || ""}
                              onChange={e => setSubImageUrl(idx, subIdx, e.target.value)}
                              placeholder="/uploads/... veya tam URL"
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Alt Başlık ({activeLang.toUpperCase()})
                            </label>
                            <input
                              type="text"
                              value={sub.subtitle?.[activeLang] || ""}
                              onChange={e => setSubField(idx, subIdx, "subtitle", activeLang, e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Başlık ({activeLang.toUpperCase()})
                            </label>
                            <input
                              type="text"
                              value={sub.title?.[activeLang] || ""}
                              onChange={e => setSubField(idx, subIdx, "title", activeLang, e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Açıklama ({activeLang.toUpperCase()})
                            </label>
                            <textarea
                              rows={2}
                              value={sub.text?.[activeLang] || ""}
                              onChange={e => setSubField(idx, subIdx, "text", activeLang, e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Link</label>
                            <input
                              type="text"
                              value={sub.link || ""}
                              onChange={e => setSubLink(idx, subIdx, e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
