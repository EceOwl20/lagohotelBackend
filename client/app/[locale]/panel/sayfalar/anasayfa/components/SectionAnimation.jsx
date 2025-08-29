"use client";

import { useState } from "react";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function SectionAnimation({ data, setData }) {
  const langs = ["tr", "en", "de", "ru"];
  const [activeLang, setActiveLang] = useState("tr");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const anim = data.animationSection || {};

  // --- helpers (okunabilir ve güvenli set) ---
  const get = (field) => anim?.[field]?.[activeLang] || "";
  const setLangField = (field, value) => {
    setData((prev) => {
      const prevAnim = prev.animationSection || {};
      const prevField = prevAnim[field] || {};
      return {
        ...prev,
        animationSection: {
          ...prevAnim,
          [field]: { ...prevField, [activeLang]: value },
        },
      };
    });
  };

  const clearActiveLang = () => {
    const fields = ["subtitle", "title", "text", "text2", "buttonText", "buttonLink"];
    setData((prev) => {
      const prevAnim = prev.animationSection || {};
      const next = { ...prevAnim };
      for (const f of fields) {
        next[f] = { ...(prevAnim[f] || {}), [activeLang]: "" };
      }
      return { ...prev, animationSection: next };
    });
  };

  const copyActiveToOthers = () => {
    const fields = ["subtitle", "title", "text", "text2", "buttonText", "buttonLink"];
    setData((prev) => {
      const prevAnim = prev.animationSection || {};
      const next = { ...prevAnim };
      for (const f of fields) {
        const base = { ...(prevAnim[f] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => {
          if (lng !== activeLang) base[lng] = val;
        });
        next[f] = base;
      }
      return { ...prev, animationSection: next };
    });
  };

  // --- Görsel URL düzenleme (ImageUploadInput zaten upload ediyor) ---
  const handleImageChange = (key, url) => {
    setData((prev) => ({
      ...prev,
      animationSection: {
        ...prev.animationSection,
        [key]: url,
      },
    }));
  };

  // Önizleme için güvenli kaynaklar
  const leftSrc = anim.imageLeft
    ? anim.imageLeft.startsWith("/") ? `${apiUrl}${anim.imageLeft}` : anim.imageLeft
    : null;
  const rightSrc = anim.imageRight
    ? anim.imageRight.startsWith("/") ? `${apiUrl}${anim.imageRight}` : anim.imageRight
    : null;

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-5">
      {/* Üst şerit: başlık + dil sekmeleri + aksiyonlar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">✨ Animasyon Bloğu</h2>

        <div className="flex items-center gap-2">
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
        {/* Sol taraf: Form */}
        <div className="bg-gray-50 border rounded-2xl p-4 md:p-5">
          <Field
            label={`Alt Başlık (${activeLang.toUpperCase()})`}
            value={get("subtitle")}
            onChange={(v) => setLangField("subtitle", v)}
            placeholder="Örn: Keşfetmeye hazırsınız"
            countRight
          />

          <Field
            label={`Başlık (${activeLang.toUpperCase()})`}
            value={get("title")}
            onChange={(v) => setLangField("title", v)}
            placeholder="Örn: Eşsiz bir deneyim"
            countRight
          />

          <Field
            label={`Açıklama 1 (${activeLang.toUpperCase()})`}
            value={get("text")}
            onChange={(v) => setLangField("text", v)}
            placeholder="Kısa bir açıklama metni…"
            textarea
            rows={3}
          />

          <Field
            label={`Açıklama 2 (${activeLang.toUpperCase()})`}
            value={get("text2")}
            onChange={(v) => setLangField("text2", v)}
            placeholder="İkinci açıklama (opsiyonel)…"
            textarea
            rows={3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label={`Buton Metni (${activeLang.toUpperCase()})`}
              value={get("buttonText")}
              onChange={(v) => setLangField("buttonText", v)}
              placeholder="Keşfet"
              countRight
            />
            <Field
              label={`Buton Linki (${activeLang.toUpperCase()})`}
              value={get("buttonLink")}
              onChange={(v) => setLangField("buttonLink", v)}
              placeholder="/animasyon"
            />
          </div>

          {/* Görsel alanları: iki sütun */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUploadInput
              label="Sol Görsel"
              value={anim.imageLeft || ""}
              onChange={(url) => handleImageChange("imageLeft", url)}
            />
            <ImageUploadInput
              label="Sağ Görsel"
              value={anim.imageRight || ""}
              onChange={(url) => handleImageChange("imageRight", url)}
            />
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Başlık: 40–60 karakter • Alt başlık: 60–100 • Açıklama(lar): 120–220 önerilir.
          </p>
        </div>

        {/* Sağ taraf: Canlı Önizleme */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-black to-gray-800 text-white p-6 md:p-8">
            <p className="text-xs text-white/70 mb-3">Önizleme — {activeLang.toUpperCase()}</p>

            {/* Metinler */}
            <h3 className="text-2xl md:text-3xl font-bold">{get("title") || "Başlık"}</h3>
            <p className="mt-1 text-white/80">{get("subtitle") || "Alt başlık"}</p>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              {get("text") || "Açıklama 1 metni burada görünecek."}
            </p>
            {get("text2") && (
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                {get("text2")}
              </p>
            )}

            {/* Buton */}
            <div className="mt-5">
              <a
                href={get("buttonLink") || "#"}
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 hover:bg-white/90 transition"
                title="Önizleme butonu (tıklanmaz)"
              >
                {get("buttonText") || "Keşfet"}
                <span>→</span>
              </a>
            </div>

            {/* Görseller: sağ/sol mock yerleşimi */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative">
                {leftSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={leftSrc}
                    alt="Sol görsel"
                    className="w-full aspect-[4/3] object-cover rounded-xl ring-1 ring-white/10"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-xl ring-1 ring-white/10 grid place-items-center text-white/40">
                    Sol görsel
                  </div>
                )}
              </div>
              <div className="relative">
                {rightSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={rightSrc}
                    alt="Sağ görsel"
                    className="w-full aspect-[4/3] object-cover rounded-xl ring-1 ring-white/10"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-xl ring-1 ring-white/10 grid place-items-center text-white/40">
                    Sağ görsel
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-3 text-xs text-gray-600 border-t">
            Bu alan sadece görsel önizlemedir; canlı sitede animasyon/konumlandırma farklı olabilir.
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Küçük input bileşeni --- */
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
