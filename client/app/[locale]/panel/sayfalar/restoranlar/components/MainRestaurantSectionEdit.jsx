"use client";
import { useEffect, useMemo, useState } from "react";

const DIL_ADLARI = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function MainRestaurantSectionEdit({
  data,
  setData,
  langs = ["tr", "en", "de", "ru"],
  activeLang: controlledLang, // üst seviyeden gelirse senkronlar
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activeLang, setActiveLang] = useState(controlledLang || langs[0] || "tr");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (controlledLang) setActiveLang(controlledLang);
  }, [controlledLang]);

  const mrs = data?.mainRestaurantSection || {};
  const listItems =
    Array.isArray(mrs.list) && mrs.list.length
      ? mrs.list.map((t) => (t && typeof t === "object" ? t : { tr: "", en: "", de: "", ru: "" }))
      : [{ tr: "", en: "", de: "", ru: "" }];

  /* ----------------- Helpers: multilang fields ----------------- */
  const setLangField = (key, value) =>
    setData((prev) => ({
      ...prev,
      mainRestaurantSection: {
        ...(prev.mainRestaurantSection || {}),
        [key]: { ...(prev.mainRestaurantSection?.[key] || {}), [activeLang]: value },
      },
    }));

  const copyActiveToOthers = () =>
    setData((prev) => {
      const next = { ...(prev.mainRestaurantSection || {}) };
      ["subtitle", "title", "text", "buttonText"].forEach((k) => {
        const base = { ...(next[k] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => (base[lng] = val));
        next[k] = base;
      });
      // list maddeleri
      const arr = (next.list && next.list.length ? next.list : listItems).map((row) => {
        const r = { ...(row || {}) };
        const val = r[activeLang] || "";
        langs.forEach((lng) => (r[lng] = val));
        return r;
      });
      next.list = arr;
      return { ...prev, mainRestaurantSection: next };
    });

  const clearActive = () =>
    setData((prev) => {
      const next = { ...(prev.mainRestaurantSection || {}) };
      ["subtitle", "title", "text", "buttonText"].forEach((k) => {
        next[k] = { ...(next[k] || {}), [activeLang]: "" };
      });
      const arr = (next.list && next.list.length ? next.list : listItems).map((row) => ({
        ...(row || {}),
        [activeLang]: "",
      }));
      next.list = arr;
      return { ...prev, mainRestaurantSection: next };
    });

  /* ----------------- Image ----------------- */
  const resolveSrc = (p) => (!p ? "" : p.startsWith("/") ? `${apiUrl}${p}` : p);
  const bgImage = useMemo(() => resolveSrc(mrs.image), [mrs.image, apiUrl]);

  const setImageUrl = (url) =>
    setData((prev) => ({
      ...prev,
      mainRestaurantSection: { ...(prev.mainRestaurantSection || {}), image: url },
    }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setImageUrl(result.imageUrl || result.path || result.url);
    } catch (err) {
      alert("Yükleme hatası: " + (err?.message || "Bilinmeyen hata"));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  /* ----------------- List rows ----------------- */
  const handleAddListItem = () =>
    setData((prev) => ({
      ...prev,
      mainRestaurantSection: {
        ...(prev.mainRestaurantSection || {}),
        list: [...listItems, { tr: "", en: "", de: "", ru: "" }],
      },
    }));

  const handleRemoveListItem = (idx) =>
    setData((prev) => ({
      ...prev,
      mainRestaurantSection: {
        ...(prev.mainRestaurantSection || {}),
        list: listItems.filter((_, i) => i !== idx),
      },
    }));

  const handleListChange = (idx, value) =>
    setData((prev) => {
      const arr = listItems.map((row, i) => (i === idx ? { ...(row || {}), [activeLang]: value } : row));
      return { ...prev, mainRestaurantSection: { ...(prev.mainRestaurantSection || {}), list: arr } };
    });

  const copyRowActiveToOthers = (idx) =>
    setData((prev) => {
      const arr = (prev.mainRestaurantSection?.list && prev.mainRestaurantSection.list.length
        ? prev.mainRestaurantSection.list
        : listItems
      ).map((row, i) => {
        if (i !== idx) return row;
        const r = { ...(row || {}) };
        const val = r[activeLang] || "";
        const out = { ...r };
        langs.forEach((lng) => (out[lng] = val));
        return out;
      });
      return { ...prev, mainRestaurantSection: { ...(prev.mainRestaurantSection || {}), list: arr } };
    });

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="font-bold text-xl">🏨 Main Restaurant Section</h3>
        <div className="flex items-center gap-2">
          {/* Lokal dil sekmeleri (üstten kontrol edilmiyorsa) */}
          {!controlledLang && (
            <div className="flex rounded-lg border overflow-hidden">
              {langs.map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setActiveLang(lng)}
                  className={`px-3 py-1.5 text-sm transition ${
                    activeLang === lng ? "bg-black text-white" : "hover:bg-gray-50"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={copyActiveToOthers}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dildeki tüm metinleri diğer dillere kopyala"
          >
            ⇆ Tümünü Kopyala
          </button>
          <button
            type="button"
            onClick={clearActive}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dildeki tüm metinleri temizle"
          >
            🧹 Temizle
          </button>
        </div>
      </div>

      {/* Grid: Sol (Formlar) | Sağ (Önizleme) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol */}
        <div className="space-y-6">
          {/* Görsel kartı */}
          <div className="bg-gray-50 border rounded-2xl p-4">
            <h4 className="font-semibold mb-3">Arka Plan Görseli</h4>
            <div className="relative h-48 rounded-lg border overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {bgImage ? (
                <img src={bgImage} alt="Arka Plan" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400">Görsel yok</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/10 pointer-events-none" />
              <label className="absolute inset-x-0 bottom-0 p-2 flex justify-end">
                <span className="rounded-md bg-black/60 text-white text-xs px-3 py-1.5 backdrop-blur cursor-pointer hover:bg-black/70">
                  {uploading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Yükleniyor…
                    </span>
                  ) : (
                    "Görseli Değiştir"
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </span>
              </label>
            </div>
            <input
              type="text"
              value={mrs.image || ""}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/uploads/… veya https://…"
              className="mt-3 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
            />
          </div>

          {/* Metinler */}
          <div className="bg-white border rounded-2xl p-4">
            <h4 className="font-semibold mb-3">Metinler ({activeLang.toUpperCase()})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Alt Başlık"
                value={mrs?.subtitle?.[activeLang] || ""}
                onChange={(v) => setLangField("subtitle", v)}
                placeholder="Kısa vurgu…"
                countRight
              />
              <Field
                label="Başlık"
                value={mrs?.title?.[activeLang] || ""}
                onChange={(v) => setLangField("title", v)}
                placeholder="Ana Restoran"
                countRight
              />
            </div>
            <Field
              label="Açıklama"
              textarea
              rows={4}
              value={mrs?.text?.[activeLang] || ""}
              onChange={(v) => setLangField("text", v)}
              placeholder="Bölüm açıklaması…"
            />
          </div>

          {/* Liste maddeleri */}
          <div className="bg-gray-50 border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Liste Maddeleri ({activeLang.toUpperCase()})</h4>
              <button
                type="button"
                onClick={handleAddListItem}
                className="rounded-md bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5"
              >
                + Madde
              </button>
            </div>

            <div className="space-y-3">
              {listItems.map((row, idx) => (
                <div key={idx} className="rounded-xl bg-white border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Madde #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyRowActiveToOthers(idx)}
                        className="text-xs rounded-md border px-2 py-1 hover:bg-gray-50"
                        title="Bu maddenin aktif dilini tüm dillere kopyala"
                      >
                        ⇆ Kopyala
                      </button>
                      {listItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveListItem(idx)}
                          className="text-xs rounded-md border px-2 py-1 hover:bg-red-50 text-red-600"
                        >
                          Sil
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={row?.[activeLang] || ""}
                    onChange={(e) => handleListChange(idx, e.target.value)}
                    placeholder={`Madde ${idx + 1} (${DIL_ADLARI[activeLang]})`}
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buton */}
          <div className="bg-white border rounded-2xl p-4">
            <h4 className="font-semibold mb-3">Buton ({activeLang.toUpperCase()})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Buton Metni"
                value={mrs?.buttonText?.[activeLang] || ""}
                onChange={(v) => setLangField("buttonText", v)}
                placeholder="Keşfet"
                countRight
              />
              <Field
                label="Buton Linki"
                value={mrs?.buttonLink || ""}
                onChange={(v) =>
                  setData((prev) => ({
                    ...prev,
                    mainRestaurantSection: { ...(prev.mainRestaurantSection || {}), buttonLink: v },
                  }))
                }
                placeholder="/restaurants/ana-restoran"
              />
            </div>
          </div>
        </div>

        {/* Sağ: Önizleme */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="relative h-[460px] bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {bgImage ? <img src={bgImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" /> : null}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 text-white">
              <p className="text-sm uppercase tracking-wide text-white/80">
                {mrs?.subtitle?.[activeLang] || "Alt Başlık"}
              </p>
              <h3 className="mt-1 text-3xl md:text-4xl font-extrabold drop-shadow">
                {mrs?.title?.[activeLang] || "Ana Restoran"}
              </h3>
              {mrs?.text?.[activeLang] && (
                <p className="mt-3 max-w-2xl text-white/90">{mrs.text[activeLang]}</p>
              )}

              {/* Liste */}
              <ul className="mt-4 space-y-2 text-white/90">
                {(listItems.length ? listItems : [{ [activeLang]: "" }]).map((t, i) => {
                  const line = t?.[activeLang] || "";
                  if (!line.trim()) return null;
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-white/90" />
                      <span>{line}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Buton */}
              <div className="mt-6">
                <a
                  href={mrs?.buttonLink || "#"}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/15 backdrop-blur px-4 py-2 text-sm hover:bg-white/25 transition"
                  onClick={(e) => e.preventDefault()}
                  title="Önizleme"
                >
                  {mrs?.buttonText?.[activeLang] || "Keşfet"}
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 01-.023 1.391l-4 4a1 1 0 01-1.414-1.414L14.586 9H4a1 1 0 110-2h10.586l-2.293-2.293a1 1 0 010-1.414z" />
                  </svg>
                </a>
              </div>

              <div className="mt-4 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[11px] text-white/85">
                Bu alan önizlemedir; canlı sitede düzen farklı olabilir.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Small Field ----------------- */
function Field({ label, value, onChange, placeholder, textarea = false, rows = 3, countRight = false }) {
  const len = (value || "").length;
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        {countRight && <span className="text-[11px] text-gray-500">{len}</span>}
      </div>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
        />
      )}
    </div>
  );
}
