"use client";
import { useEffect, useMemo, useState } from "react";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function MainBannerEdit({ data, setData, langs = ["tr","en","de","ru"], activeLang: controlledLang }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activeLang, setActiveLang] = useState(controlledLang || langs[0] || "tr");

  // controlled prop değişirse iç state’i güncelle
  useEffect(() => {
    if (controlledLang) setActiveLang(controlledLang);
  }, [controlledLang]);

  const mainImgRaw = data?.mainBanner?.image || "";
  const mainImg = useMemo(() => {
    if (!mainImgRaw) return "";
    return mainImgRaw.startsWith("/") ? `${apiUrl}${mainImgRaw}` : mainImgRaw;
  }, [mainImgRaw, apiUrl]);

  /* ---------- helpers: multilang fields ---------- */
  const setLangField = (key, value) =>
    setData(prev => ({
      ...prev,
      mainBanner: {
        ...(prev.mainBanner || {}),
        [key]: { ...(prev.mainBanner?.[key] || {}), [activeLang]: value },
      },
    }));

  const copyActiveToOthers = () =>
    setData(prev => {
      const next = { ...(prev.mainBanner || {}) };
      ["subtitle","title","text"].forEach(k => {
        const base = { ...(next[k] || {}) };
        const val = base[activeLang] || "";
        langs.forEach(l => (base[l] = val));
        next[k] = base;
      });
      return { ...prev, mainBanner: next };
    });

  const clearActive = () =>
    setData(prev => {
      const next = { ...(prev.mainBanner || {}) };
      ["subtitle","title","text"].forEach(k => {
        next[k] = { ...(next[k] || {}), [activeLang]: "" };
      });
      return { ...prev, mainBanner: next };
    });

  /* ---------- image setters ---------- */
  const updateImage = (value) => {
    setData(prev => ({ ...prev, mainBanner: { ...(prev.mainBanner || {}), image: value } }));
  };

  /* ---------- ui labels ---------- */
  const labels = {
    subtitle: "Alt Başlık",
    title: "Başlık",
    text: "Açıklama",
  };

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">🏞️ Banner Ayarları</h2>

        <div className="flex items-center gap-2">
          {/* Dil sekmeleri (lokal) */}
          {!controlledLang && (
            <div className="flex rounded-lg border overflow-hidden">
              {langs.map((lng) => (
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
          )}

          <button
            type="button"
            onClick={copyActiveToOthers}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dildeki metinleri diğer dillere kopyala"
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

      {/* Grid: Sol (Form + Upload) | Sağ (Önizleme) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol */}
        <div className="space-y-6">
          {/* Görsel Upload Kartı */}
          <div className="bg-gray-50 border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Banner Görsel</h3>

            <div className="relative h-48 rounded-lg border overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {mainImg ? (
                <img src={mainImg} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400">Görsel yok</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/10 pointer-events-none" />
              {/* Overlay action: custom input component’i altında */}
            </div>

            <div className="mt-3">
              <ImageUploadInput
                value={data?.mainBanner?.image || ""}
                onChange={updateImage}
                apiPath="/api/upload"
                previewHeight={32}
              />
              <Field
                label="Görsel URL (ops.)"
                value={data?.mainBanner?.image || ""}
                onChange={updateImage}
                placeholder="/uploads/… veya https://…"
              />
            </div>
          </div>

          {/* Metinler (aktif dil) */}
          <div className="bg-white border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Metinler ({activeLang.toUpperCase()})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label={labels.subtitle}
                value={data?.mainBanner?.subtitle?.[activeLang] || ""}
                onChange={(v) => setLangField("subtitle", v)}
                placeholder="Akılda kalıcı kısa vurgu…"
                countRight
              />
              <Field
                label={labels.title}
                value={data?.mainBanner?.title?.[activeLang] || ""}
                onChange={(v) => setLangField("title", v)}
                placeholder="Restoranlar & Lezzetler"
                countRight
              />
            </div>
            <Field
              label={labels.text}
              textarea
              rows={4}
              value={data?.mainBanner?.text?.[activeLang] || ""}
              onChange={(v) => setLangField("text", v)}
              placeholder="Banner açıklaması…"
            />
          </div>
        </div>

        {/* Sağ: Canlı Önizleme */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="relative h-[420px] bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {mainImg ? (
              <img src={mainImg} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 text-white">
              <p className="text-sm uppercase tracking-wide text-white/80">
                {data?.mainBanner?.subtitle?.[activeLang] || "Alt Başlık"}
              </p>
              <h3 className="mt-1 text-3xl md:text-4xl font-extrabold drop-shadow">
                {data?.mainBanner?.title?.[activeLang] || "Sayfa Başlığı"}
              </h3>
              {data?.mainBanner?.text?.[activeLang] && (
                <p className="mt-3 max-w-2xl text-white/90">{data.mainBanner.text[activeLang]}</p>
              )}

              <div className="mt-6 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-xs text-white/85">
                Bu alan önizlemedir; canlı sitede düzen farklı olabilir.
              </div>
            </div>
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
