"use client";

import { useMemo, useState } from "react";

const langsRoom = ["tr", "en", "de", "ru"];
const sectionFields = ["title", "subtitle", "m", "view", "buttonText", "buttonLink"];

export default function RoomSectionEdit({ sectionKey, data, setData }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activeLang, setActiveLang] = useState("tr");
  const [uploading, setUploading] = useState({ img: false, img2: false });
  const [error, setError] = useState("");

  const section = data?.[sectionKey] || {};

  /* ---------- Helpers: multilang fields ---------- */
  const setLangField = (field, value) =>
    setData(prev => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        [field]: { ...(prev[sectionKey]?.[field] || {}), [activeLang]: value },
      },
    }));

  const copyActiveToOthers = () =>
    setData(prev => {
      const next = { ...(prev[sectionKey] || {}) };
      sectionFields.forEach(f => {
        const base = { ...(next[f] || {}) };
        const val = base[activeLang] || "";
        langsRoom.forEach(l => (base[l] = val));
        next[f] = base;
      });
      return { ...prev, [sectionKey]: next };
    });

  const clearActive = () =>
    setData(prev => {
      const next = { ...(prev[sectionKey] || {}) };
      sectionFields.forEach(f => {
        next[f] = { ...(next[f] || {}), [activeLang]: "" };
      });
      return { ...prev, [sectionKey]: next };
    });

  /* ---------- Image upload ---------- */
  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(u => ({ ...u, [field]: true }));
    setError("");
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const imageUrl = result.imageUrl || result.path || result.url;
      setData(prev => ({ ...prev, [sectionKey]: { ...(prev[sectionKey] || {}), [field]: imageUrl } }));
    } catch (err) {
      setError(err.message || "Yükleme hatası");
    } finally {
      setUploading(u => ({ ...u, [field]: false }));
      e.target.value = "";
    }
  };

  const setImageUrl = (field, value) =>
    setData(prev => ({ ...prev, [sectionKey]: { ...(prev[sectionKey] || {}), [field]: value } }));

  const srcFor = (p) => {
    if (!p) return "";
    return p.startsWith("/") ? `${apiUrl}${p}` : p;
  };

  const img1 = useMemo(() => srcFor(section.img), [section.img, apiUrl]);
  const img2 = useMemo(() => srcFor(section.img2), [section.img2, apiUrl]);

  /* ---------- Labels ---------- */
  const fieldLabel = (f) =>
    ({
      title: "Başlık",
      subtitle: "Alt Başlık",
      m: "Alan (m²)",
      view: "Manzara",
      buttonText: "Buton Metni",
      buttonLink: "Buton Linki",
    }[f] || f);

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">🧩 Bölüm {sectionKey.replace("roomSection", "")}</h2>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border overflow-hidden">
            {langsRoom.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => setActiveLang(lng)}
                className={`px-3 py-1.5 text-sm transition ${activeLang === lng ? "bg-black text-white" : "hover:bg-gray-50"}`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copyActiveToOthers}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dildeki tüm alanları diğer dillere kopyala"
          >
            ⇆ Tümünü Kopyala
          </button>
          <button
            type="button"
            onClick={clearActive}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dildeki tüm alanları temizle"
          >
            🧹 Temizle
          </button>
        </div>
      </div>

      {/* Grid: Sol (Form) | Sağ (Önizleme) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol: Form */}
        <div className="space-y-6">
          {/* İki görsel alanı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["img", "img2"].map((fld) => (
              <div key={fld} className="bg-gray-50 border rounded-2xl p-3">
                <h3 className="font-semibold mb-2">{fld === "img" ? "Görsel (img)" : "Görsel (img2)"}</h3>
                <div className="relative h-40 rounded-lg border overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fld === "img" ? img1 || "" : img2 || ""}
                    alt={fld}
                    className={`absolute inset-0 w-full h-full object-cover ${!(fld === "img" ? img1 : img2) ? "hidden" : ""}`}
                  />
                  {!(fld === "img" ? img1 : img2) && (
                    <div className="absolute inset-0 grid place-items-center text-gray-400">Görsel yok</div>
                  )}
                  <label htmlFor={`upload-${fld}`} className="absolute inset-0 flex items-end justify-end p-3">
                    <span className="rounded-lg bg-black/60 text-white text-xs px-3 py-1.5 backdrop-blur hover:bg-black/70 cursor-pointer">
                      {uploading[fld] ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          Yükleniyor…
                        </span>
                      ) : (
                        "Görseli Değiştir"
                      )}
                    </span>
                  </label>
                  <input
                    id={`upload-${fld}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, fld)}
                    disabled={uploading[fld]}
                  />
                </div>

                <div className="mt-2">
                  <Field
                    label="Görsel URL (ops.)"
                    value={section[fld] || ""}
                    onChange={(v) => setImageUrl(fld, v)}
                    placeholder="/uploads/… veya https://…"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Çok dilli alanlar – sadece aktif dil gösterilir */}
          <div className="bg-white border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Metinler ({activeLang.toUpperCase()})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sectionFields.map((f) => (
                <Field
                  key={f}
                  label={fieldLabel(f)}
                  value={section?.[f]?.[activeLang] || ""}
                  onChange={(v) => setLangField(f, v)}
                  placeholder={
                    f === "m"
                      ? "35 m²"
                      : f === "view"
                      ? "Deniz / Bahçe"
                      : f === "buttonText"
                      ? "Keşfet"
                      : f === "buttonLink"
                      ? "/oda-detay"
                      : f === "title"
                      ? "Oda Adı"
                      : "Alt başlık"
                  }
                  countRight={["title", "subtitle", "buttonText"].includes(f)}
                />
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {/* Sağ: Canlı Önizleme */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="relative h-80">
            {/* Arka plan olarak img veya img2 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {img1 ? (
              <img src={img1} alt="bg1" className="absolute inset-0 w-full h-full object-cover" />
            ) : img2 ? (
              <img src={img2} alt="bg2" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-gray-400 bg-gray-100">Önizleme</div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold drop-shadow">
                {section?.title?.[activeLang] || "Oda Başlığı"}
              </h3>
              {section?.subtitle?.[activeLang] && (
                <p className="mt-1 text-white/90">{section.subtitle[activeLang]}</p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                {section?.m?.[activeLang] && (
                  <span className="px-2 py-1 rounded bg-white/15 border border-white/20">
                    {section.m[activeLang]}
                  </span>
                )}
                {section?.view?.[activeLang] && (
                  <span className="px-2 py-1 rounded bg-white/15 border border-white/20">
                    {section.view[activeLang]}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <a
                  href={section?.buttonLink?.[activeLang] || "#"}
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-lg text-sm hover:bg-white/90"
                  title="Önizleme (tıklanmaz)"
                >
                  {section?.buttonText?.[activeLang] || "Detay"}
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-3 text-xs text-gray-600 border-t">
            Bu alan önizlemedir; canlı sitede düzen farklı olabilir.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small Field ---------- */
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
