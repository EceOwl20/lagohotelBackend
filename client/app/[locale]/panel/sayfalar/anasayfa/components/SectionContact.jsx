"use client";

import { useState } from "react";

export default function Section1({ data, setData }) {
  const languages = ["tr", "en", "de", "ru"];
  const [activeLang, setActiveLang] = useState("tr");

  const s1 = data.section1 || {};

  const get = (field) => s1?.[field]?.[activeLang] || "";
  const setField = (field, value) => {
    setData((prev) => {
      const prevS1 = prev.section1 || {};
      const prevField = prevS1[field] || {};
      return {
        ...prev,
        section1: {
          ...prevS1,
          [field]: { ...prevField, [activeLang]: value },
        },
      };
    });
  };

  const clearActiveLang = () => {
    const fields = ["title", "subtitle", "text", "discoverMoreText", "discoverMoreLink"];
    setData((prev) => {
      const prevS1 = prev.section1 || {};
      const nextS1 = { ...prevS1 };
      for (const f of fields) nextS1[f] = { ...(prevS1[f] || {}), [activeLang]: "" };
      return { ...prev, section1: nextS1 };
    });
  };

  const copyActiveToOthers = () => {
    const fields = ["title", "subtitle", "text", "discoverMoreText", "discoverMoreLink"];
    setData((prev) => {
      const prevS1 = prev.section1 || {};
      const nextS1 = { ...prevS1 };
      for (const f of fields) {
        const base = { ...(prevS1[f] || {}) };
        const val = base[activeLang] || "";
        languages.forEach((lng) => {
          if (lng !== activeLang) base[lng] = val;
        });
        nextS1[f] = base;
      }
      return { ...prev, section1: nextS1 };
    });
  };

  const title = get("title");
  const subtitle = get("subtitle");
  const text = get("text");
  const btnText = get("discoverMoreText");
  const btnLink = get("discoverMoreLink");

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-5">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">🎯 Contact Bloğu</h2>

        <div className="flex items-center gap-2">
          {/* Dil sekmeleri */}
          <div className="flex rounded-lg border overflow-hidden">
            {languages.map((lng) => (
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
            label={`Başlık (${activeLang.toUpperCase()})`}
            value={title}
            onChange={(v) => setField("title", v)}
            placeholder="Örn: İletişime Geçin"
            countRight
          />

          <Field
            label={`Alt Başlık (${activeLang.toUpperCase()})`}
            value={subtitle}
            onChange={(v) => setField("subtitle", v)}
            placeholder="Örn: Size bir mesaj uzaktayız"
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
              placeholder="Bize Ulaşın"
              countRight
            />
            <Field
              label={`Buton Linki (${activeLang.toUpperCase()})`}
              value={btnLink}
              onChange={(v) => setField("discoverMoreLink", v)}
              placeholder="/iletisim"
            />
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Başlık: 32–60 • Alt başlık: 50–100 • Açıklama: 120–220 karakter önerilir.
          </p>
        </div>

        {/* Sağ: Canlı Önizleme */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-black to-gray-800 text-white p-6 md:p-8">
            <p className="text-xs text-white/70 mb-3">Önizleme — {activeLang.toUpperCase()}</p>

            <h3 className="text-2xl md:text-3xl font-bold">{title || "İletişime Geçin"}</h3>
            <p className="mt-1 text-white/80">{subtitle || "Size bir mesaj uzaktayız"}</p>

            <div className="mt-4 space-y-2 text-sm text-white/85">
              <p className="leading-relaxed">
                {text || "Kısa bir açıklama bu alanda görünecek. İletişim formu/harita aynı sayfada olabilir."}
              </p>
              {/* Sadece görsel amaçlı satırlar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/70 text-xs">
                <div className="rounded bg-white/5 px-3 py-2">📍 Adres placeholder</div>
                <div className="rounded bg-white/5 px-3 py-2">☎️ +90 000 000 00 00</div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={btnLink || "#"}
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 hover:bg-white/90 transition"
                onClick={(e) => e.preventDefault()}
                title="Önizleme butonu (tıklanmaz)"
              >
                {btnText || "Bize Ulaşın"}
                <span>→</span>
              </a>
            </div>
          </div>
          <div className="bg-white px-4 py-3 text-xs text-gray-600 border-t">
            Bu alan önizlemedir; canlı sayfada form/harita bileşenleri farklı yerleşebilir.
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Küçük Field bileşeni --- */
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
