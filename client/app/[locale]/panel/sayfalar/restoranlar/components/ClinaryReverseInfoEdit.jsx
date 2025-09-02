"use client";
import { useState } from "react";

const DIL_ADLARI = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function ClinaryReverseInfoEdit({ data, setData, langs = ["tr","en","de","ru"] }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activeLang, setActiveLang] = useState(langs[0] || "tr");
  const [uploading, setUploading] = useState({ image1: false, image2: false });

  const info = data?.clinaryReverseInfo || {};

  const resolveImg = (path) =>
    !path ? "" : (path.startsWith("/") ? `${apiUrl}${path}` : path);

  // ---- state helpers ----
  const updateInfo = (fn) =>
    setData((prev) => {
      const base = { ...(prev || {}) };
      base.clinaryReverseInfo = { ...(base.clinaryReverseInfo || {}) };
      fn(base.clinaryReverseInfo);
      return base;
    });

  const setLangField = (field, val) =>
    updateInfo((ci) => {
      ci[field] = { ...(ci[field] || {}) , [activeLang]: val };
    });

  const copyActiveToAll = () =>
    updateInfo((ci) => {
      ["subtitle", "title", "text1", "text2"].forEach((k) => {
        const obj = { ...(ci[k] || {}) };
        const v = obj[activeLang] || "";
        langs.forEach((lng) => (obj[lng] = v));
        ci[k] = obj;
      });
    });

  const clearActive = () =>
    updateInfo((ci) => {
      ["subtitle", "title", "text1", "text2"].forEach((k) => {
        const obj = { ...(ci[k] || {}) };
        obj[activeLang] = "";
        ci[k] = obj;
      });
    });

  // ---- image upload / manual url ----
  const handleImageUpload = async (key, file) => {
    if (!file) return;
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const url = result.imageUrl || result.path || result.url;
      updateInfo((ci) => { ci[key] = url; });
    } catch (err) {
      alert("Yükleme hatası: " + (err?.message || "Bilinmeyen hata"));
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };

  const setImageUrl = (key, url) =>
    updateInfo((ci) => { ci[key] = url; });

  return (
    <section className="rounded-2xl border bg-white p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-bold text-xl">🍽️ Clinary Reverse Info</h3>

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
            onClick={copyActiveToAll}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-white"
            title="Aktif dildeki metinleri tüm dillere kopyala"
          >
            ⇆ Tüm Dillere Kopyala
          </button>
          <button
            type="button"
            onClick={clearActive}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-white"
            title="Aktif dil alanlarını temizle"
          >
            🧹 Aktif Dili Temizle
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImageCard
          label="Sol Görsel"
          value={info.image1 || ""}
          resolved={resolveImg(info.image1)}
          uploading={uploading.image1}
          onPick={(file) => handleImageUpload("image1", file)}
          onUrlChange={(url) => setImageUrl("image1", url)}
        />
        <ImageCard
          label="Sağ Görsel"
          value={info.image2 || ""}
          resolved={resolveImg(info.image2)}
          uploading={uploading.image2}
          onPick={(file) => handleImageUpload("image2", file)}
          onUrlChange={(url) => setImageUrl("image2", url)}
        />
      </div>

      {/* Text fields (active language) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label={`Alt Başlık (${DIL_ADLARI[activeLang]})`}
          value={info?.subtitle?.[activeLang] || ""}
          onChange={(v) => setLangField("subtitle", v)}
          countRight
        />
        <Field
          label={`Başlık (${DIL_ADLARI[activeLang]})`}
          value={info?.title?.[activeLang] || ""}
          onChange={(v) => setLangField("title", v)}
          countRight
        />
        <Field
          label={`Açıklama 1 (${DIL_ADLARI[activeLang]})`}
          value={info?.text1?.[activeLang] || ""}
          onChange={(v) => setLangField("text1", v)}
          textarea
          rows={3}
        />
        <Field
          label={`Açıklama 2 (${DIL_ADLARI[activeLang]})`}
          value={info?.text2?.[activeLang] || ""}
          onChange={(v) => setLangField("text2", v)}
          textarea
          rows={3}
        />
      </div>
    </section>
  );
}

/* ================= subcomponents ================= */

function ImageCard({ label, value, resolved, uploading, onPick, onUrlChange }) {
  return (
    <div className="rounded-xl border bg-white p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{label}</h4>
        {uploading && (
          <span className="inline-flex items-center gap-2 text-xs text-blue-600">
            <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-blue-300 border-t-blue-600 animate-spin" />
            Yükleniyor…
          </span>
        )}
      </div>

      <div className="relative h-44 rounded-lg border overflow-hidden bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {resolved ? (
          <img alt="" src={resolved} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-gray-400 text-sm">
            Görsel yok
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10 pointer-events-none" />

        <label className="absolute inset-x-0 bottom-0 p-2 flex justify-end">
          <span className="rounded-md bg-black/60 text-white text-xs px-3 py-1.5 backdrop-blur cursor-pointer hover:bg-black/70">
            Görsel Seç
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPick(e.target.files?.[0] || null)}
              disabled={uploading}
            />
          </span>
        </label>
      </div>

      <div>
        <label className="block text-xs text-gray-600 mb-1">Manuel URL</label>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="/uploads/… veya https://…"
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, textarea = false, rows = 3, countRight = false }) {
  const len = (value || "").length;
  return (
    <div>
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
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
          autoComplete="off"
        />
      )}
    </div>
  );
}
