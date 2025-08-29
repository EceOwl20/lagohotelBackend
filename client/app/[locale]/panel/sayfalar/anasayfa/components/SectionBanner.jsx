"use client";

import { useMemo, useState } from "react";

const langs = ["tr", "en", "de", "ru"];

export default function SectionBanner({ data, setData }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activeLang, setActiveLang] = useState("tr");
  const [uploading, setUploading] = useState(false);

  const banner = data.banner || {};

  // ---- helpers ----
  const get = (field) => banner?.[field]?.[activeLang] || "";
  const setField = (field, value) => {
    setData((prev) => {
      const prevBanner = prev.banner || {};
      const prevField = prevBanner[field] || {};
      return {
        ...prev,
        banner: { ...prevBanner, [field]: { ...prevField, [activeLang]: value } },
      };
    });
  };

  const copyActiveToOthers = () => {
    const fields = ["subtitle", "title", "text", "discoverMoreText", "discoverMoreLink"];
    setData((prev) => {
      const prevBanner = prev.banner || {};
      const next = { ...prevBanner };
      for (const f of fields) {
        const base = { ...(prevBanner[f] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => {
          if (lng !== activeLang) base[lng] = val;
        });
        next[f] = base;
      }
      return { ...prev, banner: next };
    });
  };

  const clearActiveLang = () => {
    const fields = ["subtitle", "title", "text", "discoverMoreText", "discoverMoreLink"];
    setData((prev) => {
      const prevBanner = prev.banner || {};
      const next = { ...prevBanner };
      for (const f of fields) next[f] = { ...(prevBanner[f] || {}), [activeLang]: "" };
      return { ...prev, banner: next };
    });
  };

  // ---- image upload ----
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setData((prev) => ({
        ...prev,
        banner: { ...(prev.banner || {}), backgroundImage: result.imageUrl || result.path || result.url },
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // ---- preview src ----
  const bgSrc = useMemo(() => {
    const p = banner.backgroundImage;
    if (!p) return null;
    return p.startsWith("/") ? `${apiUrl}${p}` : p;
  }, [banner.backgroundImage, apiUrl]);

  const title = get("title");
  const subtitle = get("subtitle");
  const text = get("text");
  const btnText = get("discoverMoreText");
  const btnLink = get("discoverMoreLink");

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">📢 Banner Alanı</h2>

        <div className="flex items-center gap-2">
          {/* Dil sekmeleri */}
          <div className="flex rounded-lg border overflow-hidden">
            {langs.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => setActiveLang(lng)}
                className={`px-3 py-1.5 text-sm transition ${
                  activeLang === lng ? "bg-black text-white" : "hover:bg-gray-50"
                }`}
                title={lng.toUpperCase()}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copyActiveToOthers}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dildeki içerikleri diğer dillere kopyala"
          >
            ⇆ Tüm Dillere Kopyala
          </button>

          <button
            type="button"
            onClick={clearActiveLang}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dil alanlarını temizle"
          >
            🧹 Aktif Dili Temizle
          </button>
        </div>
      </div>

      {/* Form + Önizleme */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol: Form */}
        <div className="bg-gray-50 border rounded-2xl p-4 md:p-5">
          <Field
            label={`Alt Başlık (${activeLang.toUpperCase()})`}
            value={subtitle}
            onChange={(v) => setField("subtitle", v)}
            placeholder="Örn: Sıcak Karşılama"
            countRight
          />
          <Field
            label={`Başlık (${activeLang.toUpperCase()})`}
            value={title}
            onChange={(v) => setField("title", v)}
            placeholder="Örn: Akdeniz’in Kalbinde Tatil"
            countRight
          />
          <Field
            label={`Açıklama (${activeLang.toUpperCase()})`}
            value={text}
            onChange={(v) => setField("text", v)}
            placeholder="Kısa açıklama metni…"
            textarea
            rows={4}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label={`Buton Metni (${activeLang.toUpperCase()})`}
              value={btnText}
              onChange={(v) => setField("discoverMoreText", v)}
              placeholder="Keşfet"
              countRight
            />
            <Field
              label={`Buton Linki (${activeLang.toUpperCase()})`}
              value={btnLink}
              onChange={(v) => setField("discoverMoreLink", v)}
              placeholder="/kesfet"
            />
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Başlık: 40–60 • Alt başlık: 60–100 • Açıklama: 120–220 karakter önerilir.
          </p>
        </div>

        {/* Sağ: Canlı Önizleme + Görsel yükleme */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="relative h-64 md:h-80">
            {bgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={bgSrc} alt="Banner BG" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-gray-400 bg-gray-100">
                Arka plan görseli yok
              </div>
            )}
            {/* gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/10" />

            {/* İçerik */}
            <div className="relative z-10 text-white p-6 md:p-8">
              <p className="text-sm text-white/80">{subtitle || "Alt başlık"}</p>
              <h3 className="text-2xl md:text-3xl font-bold mt-1">{title || "Başlık"}</h3>
              <p className="mt-3 text-sm text-white/85 max-w-prose">
                {text || "Açıklama metni bu alanda görünecek. Arka plan görseliyle birlikte öne çıkacak."}
              </p>
              <div className="mt-5">
                <a
                  href={btnLink || "#"}
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 hover:bg-white/90 transition"
                  title="Önizleme butonu (tıklanmaz)"
                >
                  {btnText || "Keşfet"} <span>→</span>
                </a>
              </div>
            </div>

            {/* Overlay upload */}
            <label
              htmlFor="banner-bg"
              className="absolute inset-0 flex items-end justify-end p-3"
              title="Arka plan görselini değiştir"
            >
              <span className="rounded-lg bg-black/60 backdrop-blur px-3 py-1.5 text-xs text-white hover:bg-black/70 cursor-pointer">
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
            <input
              id="banner-bg"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </div>

          {/* Manuel URL alanı */}
          <div className="bg-white px-4 py-3 border-t">
            <input
              type="text"
              placeholder="Arka plan görsel URL (opsiyonel)"
              value={banner.backgroundImage || ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  banner: { ...(prev.banner || {}), backgroundImage: e.target.value },
                }))
              }
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Küçük Field bileşeni ---- */
function Field({ label, value, onChange, placeholder, textarea = false, rows = 3, countRight = false }) {
  const len = (value || "").length;
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
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
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
        />
      )}
    </div>
  );
}
