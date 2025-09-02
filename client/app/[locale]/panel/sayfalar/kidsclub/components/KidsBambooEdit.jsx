// app/[locale]/panel/sayfalar/kidsclub/components/KidsBambooEdit.jsx
"use client";
import { useState } from "react";

export default function KidsBambooEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const section = data?.kidsBamboo || {};
  const clubs = Array.isArray(section.clubData) ? section.clubData : [];

  const [uploading, setUploading] = useState({ section: false }); // {section:true, "0":true}

  /* ---------------- utils ---------------- */
  const toSrc = (p) => (p ? (p.startsWith("/") ? `${apiUrl}${p}` : p) : "");

  const setSection = (updater) =>
    setData((prev) => ({
      ...prev,
      kidsBamboo:
        typeof updater === "function" ? updater(prev?.kidsBamboo || {}) : updater,
    }));

  const setClubs = (updater) =>
    setSection((s) => ({
      ...s,
      clubData: typeof updater === "function" ? updater(s?.clubData || []) : updater,
    }));

  /* ----------- image uploads ----------- */
  const uploadSectionImage = async (file) => {
    if (!file) return;
    setUploading((u) => ({ ...u, section: true }));
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Yükleme başarısız");
      const url = json.imageUrl || json.path;
      if (url) setSection((s) => ({ ...s, image: url }));
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading((u) => ({ ...u, section: false }));
    }
  };

  const uploadClubImage = async (idx, file) => {
    if (!file) return;
    setUploading((u) => ({ ...u, [idx]: true }));
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Yükleme başarısız");
      const url = json.imageUrl || json.path;
      if (url)
        setClubs((arr) => {
          const next = [...arr];
          next[idx] = { ...(next[idx] || {}), image: url };
          return next;
        });
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading((u) => ({ ...u, [idx]: false }));
    }
  };

  /* ----------- section fields (multilang) ----------- */
  const setSectionField = (field, value) =>
    setSection((s) => ({
      ...s,
      [field]: { ...(s?.[field] || {}), [activeLang]: value },
    }));

  /* ----------- clubs (array) ----------- */
  const addClub = () =>
    setClubs((arr) => [...arr, { image: "", ageGroup: {}, title: {}, description: {} }]);

  const removeClub = (idx) =>
    setClubs((arr) => arr.filter((_, i) => i !== idx));

  const setClubField = (idx, field, value) =>
    setClubs((arr) => {
      const next = [...arr];
      const cur = next[idx] || {};
      next[idx] = {
        ...cur,
        [field]: { ...(cur[field] || {}), [activeLang]: value },
      };
      return next;
    });

  const setClubImage = (idx, value) =>
    setClubs((arr) => {
      const next = [...arr];
      next[idx] = { ...(next[idx] || {}), image: value };
      return next;
    });

  /* -------------------- UI -------------------- */
  const sectionImg = toSrc(section.image);

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🎋 Kids Bamboo</h2>
      </div>

      {/* body */}
      <div className="p-4 space-y-8">
        {/* Section image + fields */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          {/* left: section image */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Bölüm Görseli</label>
            <div className="aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
              {sectionImg ? (
                <img src={sectionImg} alt="Section" className="h-full w-full object-cover" />
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
                  disabled={!!uploading.section}
                  onChange={(e) => uploadSectionImage(e.target.files?.[0] || null)}
                />
              </label>
              <button
                type="button"
                className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                onClick={() => setSection((s) => ({ ...s, image: "" }))}
              >
                Kaldır
              </button>
              {uploading.section && (
                <span className="text-sm text-blue-600">Yükleniyor…</span>
              )}
            </div>
            <input
              type="text"
              value={section.image || ""}
              onChange={(e) => setSection((s) => ({ ...s, image: e.target.value }))}
              placeholder="/uploads/... veya tam URL"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {/* right: active language fields */}
          <div className="space-y-4">
            {/* Alt başlık, başlık, açıklama, span, not */}
            {[
              { key: "subtitle", label: "Alt Başlık" },
              { key: "title", label: "Başlık" },
              { key: "text", label: "Açıklama", multiline: true },
              { key: "span", label: "Vurgu (Span)" },
              { key: "note", label: "Not" },
            ].map(({ key, label, multiline }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">
                  {label} ({activeLang.toUpperCase()})
                </label>
                {multiline ? (
                  <textarea
                    rows={3}
                    value={section?.[key]?.[activeLang] || ""}
                    onChange={(e) => setSectionField(key, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                ) : (
                  <input
                    type="text"
                    value={section?.[key]?.[activeLang] || ""}
                    onChange={(e) => setSectionField(key, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Clubs header + add */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Kulüp Kartları</h3>
          <button
            type="button"
            onClick={addClub}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
          >
            + Kulüp Kartı Ekle
          </button>
        </div>

        {/* Club cards */}
        {clubs.map((club, idx) => {
          const img = toSrc(club.image);
          return (
            <div key={idx} className="rounded-xl ring-1 ring-black/5 overflow-hidden">
              {/* card header */}
              <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
                <div className="font-medium">Kulüp #{idx + 1}</div>
                <button
                  type="button"
                  onClick={() => removeClub(idx)}
                  className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Sil
                </button>
              </div>

              {/* card body */}
              <div className="p-4 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
                {/* left: image */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Görsel</label>
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
                    {img ? (
                      <img src={img} alt="" className="h-full w-full object-cover" />
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
                        disabled={!!uploading[idx]}
                        onChange={(e) => uploadClubImage(idx, e.target.files?.[0] || null)}
                      />
                    </label>
                    <button
                      type="button"
                      className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                      onClick={() => setClubImage(idx, "")}
                    >
                      Kaldır
                    </button>
                    {uploading[idx] && (
                      <span className="text-sm text-blue-600">Yükleniyor…</span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={club.image || ""}
                    onChange={(e) => setClubImage(idx, e.target.value)}
                    placeholder="/uploads/... veya tam URL"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>

                {/* right: fields for activeLang */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Yaş Grubu ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={club?.ageGroup?.[activeLang] || ""}
                      onChange={(e) => setClubField(idx, "ageGroup", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Başlık ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={club?.title?.[activeLang] || ""}
                      onChange={(e) => setClubField(idx, "title", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Açıklama ({activeLang.toUpperCase()})
                    </label>
                    <textarea
                      rows={3}
                      value={club?.description?.[activeLang] || ""}
                      onChange={(e) => setClubField(idx, "description", e.target.value)}
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
