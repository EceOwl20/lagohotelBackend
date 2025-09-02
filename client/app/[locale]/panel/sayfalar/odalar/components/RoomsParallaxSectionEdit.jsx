// components/RoomsParallaxSectionEdit.jsx
"use client";

import { useMemo, useState } from "react";

const langsParallax = ["tr", "en", "de", "ru"];
const parallaxFields = [
  "subtitle",
  "title",
  "text",
  "feature1",
  "desc1",
  "feature2",
  "desc2",
  "feature3",
  "desc3",
  "feature4",
  "desc4",
];

export default function RoomsParallaxSectionEdit({ data, setData }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activeLang, setActiveLang] = useState("tr");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const rps = data?.roomsParallaxSection || {};

  /* ---------- Multi-lang helpers ---------- */
  const setLangField = (key, value) =>
    setData((prev) => ({
      ...prev,
      roomsParallaxSection: {
        ...(prev.roomsParallaxSection || {}),
        [key]: { ...(prev.roomsParallaxSection?.[key] || {}), [activeLang]: value },
      },
    }));

  const copyActiveToOthers = () =>
    setData((prev) => {
      const next = { ...(prev.roomsParallaxSection || {}) };
      parallaxFields.forEach((k) => {
        const base = { ...(next[k] || {}) };
        const val = base[activeLang] || "";
        langsParallax.forEach((lng) => (base[lng] = val));
        next[k] = base;
      });
      return { ...prev, roomsParallaxSection: next };
    });

  const clearActive = () =>
    setData((prev) => {
      const next = { ...(prev.roomsParallaxSection || {}) };
      parallaxFields.forEach((k) => {
        next[k] = { ...(next[k] || {}), [activeLang]: "" };
      });
      return { ...prev, roomsParallaxSection: next };
    });

  /* ---------- Image upload ---------- */
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setData((prev) => ({
        ...prev,
        roomsParallaxSection: {
          ...(prev.roomsParallaxSection || {}),
          backgroundImage: result.imageUrl || result.path || result.url,
        },
      }));
    } catch (err) {
      setError(err.message || "Yükleme hatası");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const setBgUrl = (v) =>
    setData((prev) => ({
      ...prev,
      roomsParallaxSection: { ...(prev.roomsParallaxSection || {}), backgroundImage: v },
    }));

  const bgSrc = useMemo(() => {
    const p = rps.backgroundImage;
    if (!p) return "";
    return p.startsWith("/") ? `${apiUrl}${p}` : p;
  }, [rps.backgroundImage, apiUrl]);

  /* ---------- UI labels / placeholders ---------- */
  const labelOf = (k) =>
    ({
      subtitle: "Alt Başlık",
      title: "Başlık",
      text: "Açıklama",
      feature1: "Özellik 1",
      desc1: "Özellik 1 Açıklaması",
      feature2: "Özellik 2",
      desc2: "Özellik 2 Açıklaması",
      feature3: "Özellik 3",
      desc3: "Özellik 3 Açıklaması",
      feature4: "Özellik 4",
      desc4: "Özellik 4 Açıklaması",
    }[k] || k);

  const placeholderOf = (k) => {
    if (k === "subtitle") return "Konaklamaya dair kısa vurgu…";
    if (k === "title") return "Neden Bizi Tercih Etmelisiniz?";
    if (k === "text") return "Genel açıklama, parallax alanı için intro…";
    if (k.startsWith("feature")) return "Örn: Denize Sıfır";
    if (k.startsWith("desc")) return "Kısa açıklama metni…";
    return "";
  };

  /* ---------- Feature list for preview ---------- */
  const features = [
    { title: rps?.feature1?.[activeLang], desc: rps?.desc1?.[activeLang] },
    { title: rps?.feature2?.[activeLang], desc: rps?.desc2?.[activeLang] },
    { title: rps?.feature3?.[activeLang], desc: rps?.desc3?.[activeLang] },
    { title: rps?.feature4?.[activeLang], desc: rps?.desc4?.[activeLang] },
  ].filter((f) => (f.title || "").trim() || (f.desc || "").trim());

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">🖼️ Parallax Section Ayarları</h2>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border overflow-hidden">
            {langsParallax.map((lng) => (
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
          {/* Background */}
          <div className="bg-gray-50 border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Arka Plan Görseli</h3>
            <div className="relative h-40 rounded-lg border overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {bgSrc ? (
                <img src={bgSrc} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400">Görsel yok</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/10 pointer-events-none" />
              <label htmlFor="parallax-bg" className="absolute inset-0 flex items-end justify-end p-3">
                <span className="rounded-lg bg-black/60 text-white text-xs px-3 py-1.5 backdrop-blur hover:bg-black/70 cursor-pointer">
                  {uploading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Yükleniyor…
                    </span>
                  ) : (
                    "Görseli Değiştir"
                  )}
                </span>
              </label>
              <input id="parallax-bg" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </div>

            <div className="mt-3">
              <Field
                label="Görsel URL (opsiyonel)"
                value={rps.backgroundImage || ""}
                onChange={setBgUrl}
                placeholder="/uploads/bg.jpg veya https://…"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </div>

          {/* Metinler (aktif dil) */}
          <div className="bg-white border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Metinler ({activeLang.toUpperCase()})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label={labelOf("subtitle")}
                value={rps?.subtitle?.[activeLang] || ""}
                onChange={(v) => setLangField("subtitle", v)}
                placeholder={placeholderOf("subtitle")}
                countRight
              />
              <Field
                label={labelOf("title")}
                value={rps?.title?.[activeLang] || ""}
                onChange={(v) => setLangField("title", v)}
                placeholder={placeholderOf("title")}
                countRight
              />
            </div>
            <Field
              label={labelOf("text")}
              textarea
              rows={4}
              value={rps?.text?.[activeLang] || ""}
              onChange={(v) => setLangField("text", v)}
              placeholder={placeholderOf("text")}
            />
          </div>

          {/* Özellikler (4 adet) */}
          <div className="bg-gray-50 border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Öne Çıkan Özellikler ({activeLang.toUpperCase()})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl bg-white border p-3">
                  <Field
                    label={labelOf(`feature${i}`)}
                    value={rps?.[`feature${i}`]?.[activeLang] || ""}
                    onChange={(v) => setLangField(`feature${i}`, v)}
                    placeholder={placeholderOf("feature1")}
                    countRight
                  />
                  <Field
                    label={labelOf(`desc${i}`)}
                    value={rps?.[`desc${i}`]?.[activeLang] || ""}
                    onChange={(v) => setLangField(`desc${i}`, v)}
                    placeholder={placeholderOf("desc1")}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ: Canlı Önizleme (parallax hissi) */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="relative h-[440px] md:h-[520px] bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {bgSrc ? (
              <img
                src={bgSrc}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: "translateZ(0)" }}
              />
            ) : null}
            {/* Parallax benzeri overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
            <div className="relative z-10 h-full flex flex-col items-start justify-center p-6 md:p-10 text-white">
              <p className="text-sm uppercase tracking-wide text-white/80">
                {rps?.subtitle?.[activeLang] || "Alt Başlık"}
              </p>
              <h3 className="mt-1 text-3xl md:text-4xl font-extrabold drop-shadow">
                {rps?.title?.[activeLang] || "Neden Bizi Tercih Etmelisiniz?"}
              </h3>
              {rps?.text?.[activeLang] && (
                <p className="mt-3 max-w-2xl text-white/90">
                  {rps.text[activeLang]}
                </p>
              )}

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl">
                {features.length === 0 ? (
                  <>
                    {["Denize Sıfır", "Geniş Odalar", "SPA & Wellness", "Gourmet Restoran"].map((t, i) => (
                      <FeaturePill key={i} title={t} desc="Kısa açıklama örneği" />
                    ))}
                  </>
                ) : (
                  features.map((f, i) => <FeaturePill key={i} title={f.title} desc={f.desc} />)
                )}
              </div>

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

/* ---------- Reusable small parts ---------- */
function FeaturePill({ title, desc }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/20 px-3 py-2">
      <span className="mt-1 inline-block w-2 h-2 rounded-full bg-white" />
      <div className="leading-tight">
        <p className="font-medium">{title || "Özellik"}</p>
        {desc && <p className="text-white/80 text-xs mt-0.5">{desc}</p>}
      </div>
    </div>
  );
}

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
