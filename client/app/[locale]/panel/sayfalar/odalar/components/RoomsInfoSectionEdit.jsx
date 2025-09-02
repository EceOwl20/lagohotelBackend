"use client";

import { useState } from "react";

const langs = ["tr", "en", "de", "ru"];
const fieldLabels = {
  subtitle: "Alt Başlık",
  title: "Başlık",
  text: "Açıklama",
  checkin: "Check-in Bilgisi",
  checkout: "Check-out Bilgisi",
};

export default function RoomsInfoSectionEdit({ data, setData }) {
  const [activeLang, setActiveLang] = useState("tr");
  const ris = data?.roomsInfoSection || {};

  /* ---------- Helpers: multi-lang set ---------- */
  const setLangField = (key, value) =>
    setData((prev) => ({
      ...prev,
      roomsInfoSection: {
        ...(prev.roomsInfoSection || {}),
        [key]: { ...(prev.roomsInfoSection?.[key] || {}), [activeLang]: value },
      },
    }));

  const copyActiveToOthers = () =>
    setData((prev) => {
      const next = { ...(prev.roomsInfoSection || {}) };
      Object.keys(fieldLabels).forEach((k) => {
        const base = { ...(next[k] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => (base[lng] = val));
        next[k] = base;
      });
      return { ...prev, roomsInfoSection: next };
    });

  const clearActive = () =>
    setData((prev) => {
      const next = { ...(prev.roomsInfoSection || {}) };
      Object.keys(fieldLabels).forEach((k) => {
        next[k] = { ...(next[k] || {}), [activeLang]: "" };
      });
      return { ...prev, roomsInfoSection: next };
    });

  /* ---------- Quick fill for times ---------- */
  const quickFillTimes = (ci = "14:00", co = "12:00") =>
    setData((prev) => ({
      ...prev,
      roomsInfoSection: {
        ...(prev.roomsInfoSection || {}),
        checkin: { ...(prev.roomsInfoSection?.checkin || {}), [activeLang]: ci },
        checkout: { ...(prev.roomsInfoSection?.checkout || {}), [activeLang]: co },
      },
    }));

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">ℹ️ Info Section Ayarları</h2>

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
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copyActiveToOthers}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dildeki alanları diğer dillere kopyala"
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
          <div className="bg-white border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Metinler ({activeLang.toUpperCase()})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label={fieldLabels.subtitle}
                value={ris?.subtitle?.[activeLang] || ""}
                onChange={(v) => setLangField("subtitle", v)}
                placeholder="Konaklamanıza dair kısa tanıtım…"
                countRight
              />
              <Field
                label={fieldLabels.title}
                value={ris?.title?.[activeLang] || ""}
                onChange={(v) => setLangField("title", v)}
                placeholder="Odalar & Süitler"
                countRight
              />
            </div>

            <Field
              label={fieldLabels.text}
              textarea
              rows={4}
              value={ris?.text?.[activeLang] || ""}
              onChange={(v) => setLangField("text", v)}
              placeholder="Otelinizin oda bilgilerini anlatan açıklama…"
            />
          </div>

          <div className="bg-gray-50 border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Check-in / Check-out ({activeLang.toUpperCase()})</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => quickFillTimes("14:00", "12:00")}
                  className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                  title="Sık kullanılan saatleri doldur"
                >
                  14:00 / 12:00 Doldur
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label={fieldLabels.checkin}
                value={ris?.checkin?.[activeLang] || ""}
                onChange={(v) => setLangField("checkin", v)}
                placeholder="Giriş: 14:00"
              />
              <Field
                label={fieldLabels.checkout}
                value={ris?.checkout?.[activeLang] || ""}
                onChange={(v) => setLangField("checkout", v)}
                placeholder="Çıkış: 12:00"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Saat yerine açıklama da girebilirsiniz (ör: “Erken giriş isteğe bağlıdır.”).
            </p>
          </div>
        </div>

        {/* Sağ: Canlı Önizleme */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              {ris?.subtitle?.[activeLang] || "Alt Başlık"}
            </p>
            <h3 className="mt-1 text-2xl md:text-3xl font-bold">
              {ris?.title?.[activeLang] || "Odalar & Süitler"}
            </h3>

            <p className="mt-3 text-gray-700">
              {ris?.text?.[activeLang] ||
                "Otelinizin oda özelliklerini, konseptini ve öne çıkan noktalarını burada anlatın."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              {(ris?.checkin?.[activeLang] || "").trim() && (
                <span className="px-2 py-1 rounded-md border bg-white">
                  {ris.checkin[activeLang]}
                </span>
              )}
              {(ris?.checkout?.[activeLang] || "").trim() && (
                <span className="px-2 py-1 rounded-md border bg-white">
                  {ris.checkout[activeLang]}
                </span>
              )}
            </div>

            <div className="mt-6 rounded-lg border border-dashed p-4 text-xs text-gray-500">
              Bu alan önizlemedir; canlı sitede düzen farklı olabilir.
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
