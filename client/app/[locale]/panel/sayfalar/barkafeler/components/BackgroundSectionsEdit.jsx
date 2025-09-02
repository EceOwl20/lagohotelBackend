// components/BackgroundSectionEdit.jsx
"use client";
import { useState } from "react";

export default function BackgroundSectionEdit({
  data,
  setData,
  activeLang = "tr", // üst sayfadan gelen dil
}) {
  const sections = data.backgroundSections || [];
  const [uploading, setUploading] = useState({}); // {0:true}
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ——— helpers (functional setState) ———
  const addSection = () =>
    setData((prev) => {
      const arr = prev.backgroundSections || [];
      const empty = {
        image: "",
        subtitle: {},
        title: {},
        texts: {},       // { tr: ["satır1", ...], ... }
        buttonText: {},
        link: "",
      };
      return { ...prev, backgroundSections: [...arr, empty] };
    });

  const removeSection = (idx) =>
    setData((prev) => {
      const arr = prev.backgroundSections || [];
      return { ...prev, backgroundSections: arr.filter((_, i) => i !== idx) };
    });

  const setField = (idx, field, lang, value) =>
    setData((prev) => {
      const arr = prev.backgroundSections || [];
      const updated = [...arr];
      const cur = updated[idx] || {};
      updated[idx] = {
        ...cur,
        [field]: { ...(cur[field] || {}), [lang]: value },
      };
      return { ...prev, backgroundSections: updated };
    });

  const setTexts = (idx, lang, raw) => {
    const lines = raw.split("\n").map((s) => s.trim()).filter(Boolean);
    setData((prev) => {
      const arr = prev.backgroundSections || [];
      const updated = [...arr];
      const cur = updated[idx] || {};
      updated[idx] = {
        ...cur,
        texts: { ...(cur.texts || {}), [lang]: lines },
      };
      return { ...prev, backgroundSections: updated };
    });
  };

  const setLink = (idx, value) =>
    setData((prev) => {
      const arr = prev.backgroundSections || [];
      const updated = [...arr];
      updated[idx] = { ...(updated[idx] || {}), link: value };
      return { ...prev, backgroundSections: updated };
    });

  const setImageUrl = (idx, value) =>
    setData((prev) => {
      const arr = prev.backgroundSections || [];
      const updated = [...arr];
      updated[idx] = { ...(updated[idx] || {}), image: value };
      return { ...prev, backgroundSections: updated };
    });

  const uploadImage = async (file, idx) => {
    if (!file) return;
    setUploading((u) => ({ ...u, [idx]: true }));
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Yükleme başarısız");
      setImageUrl(idx, json.imageUrl || json.path);
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading((u) => ({ ...u, [idx]: false }));
    }
  };

  // ——— UI ———
  return (
    <section className="space-y-4">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[22px] font-semibold">🎞️ Background Sections</h3>
        <span className="text-sm text-gray-500">
          Aktif dil: <strong>{activeLang.toUpperCase()}</strong>
        </span>
      </div>

      <button
        type="button"
        onClick={addSection}
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
      >
        + Bölüm Ekle
      </button>

      {/* cards */}
      {sections.map((item, idx) => {
        const imgSrc = item.image
          ? item.image.startsWith("/") ? `${apiUrl}${item.image}` : item.image
          : "";

        return (
          <div
            key={idx}
            className="rounded-xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden"
          >
            {/* card header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
              <div className="font-medium">Bölüm #{idx + 1}</div>
              <button
                type="button"
                onClick={() => removeSection(idx)}
                className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Sil
              </button>
            </div>

            {/* card body */}
            <div className="p-4 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6">
              {/* left: image */}
              <div className="space-y-3">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
                  {imgSrc ? (
                    <img src={imgSrc} alt="bg" className="h-full w-full object-cover" />
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
                      onChange={(e) => uploadImage(e.target.files?.[0], idx)}
                      className="hidden"
                      disabled={!!uploading[idx]}
                    />
                  </label>
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                    onClick={() => setImageUrl(idx, "")}
                  >
                    Kaldır
                  </button>
                  {uploading[idx] && (
                    <span className="text-sm text-blue-600">Yükleniyor…</span>
                  )}
                </div>

                <input
                  type="text"
                  value={item.image || ""}
                  onChange={(e) => setImageUrl(idx, e.target.value)}
                  placeholder="/uploads/... veya tam URL"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              {/* right: only active language fields */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Alt Başlık ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={item.subtitle?.[activeLang] || ""}
                    onChange={(e) => setField(idx, "subtitle", activeLang, e.target.value)}
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
                    onChange={(e) => setField(idx, "title", activeLang, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Açıklamalar ({activeLang.toUpperCase()}) — her satır bir madde
                  </label>
                  <textarea
                    rows={4}
                    value={(item.texts?.[activeLang] || []).join("\n")}
                    onChange={(e) => setTexts(idx, activeLang, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                  {(item.texts?.[activeLang] || []).length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm list-disc pl-5 text-gray-600">
                      {(item.texts?.[activeLang] || []).map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Buton Metni ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={item.buttonText?.[activeLang] || ""}
                    onChange={(e) => setField(idx, "buttonText", activeLang, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Buton Linki</label>
                  <input
                    type="text"
                    value={item.link || ""}
                    onChange={(e) => setLink(idx, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
