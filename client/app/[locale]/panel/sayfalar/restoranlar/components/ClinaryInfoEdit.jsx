"use client";
import { useEffect, useMemo, useState } from "react";

const dilAdlari = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function ClinaryInfoEdit({
  data,
  setData,
  langs = ["tr", "en", "de", "ru"],
  activeLang: controlledLang, // üst seviyeden dil gelirse senkronlar
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activeLang, setActiveLang] = useState(controlledLang || langs[0] || "tr");
  const [uploading, setUploading] = useState({ image1: false, image2: false });

  // controlled prop senkronu
  useEffect(() => {
    if (controlledLang) setActiveLang(controlledLang);
  }, [controlledLang]);

  const ci = data?.clinaryInfo || {};
  const texts =
    Array.isArray(ci?.texts) && ci.texts.length
      ? ci.texts.map((t) => (t && typeof t === "object" ? t : { tr: "", en: "", de: "", ru: "" }))
      : [{ tr: "", en: "", de: "", ru: "" }];

  /* ---------- Helpers: multilang fields ---------- */
  const setLangField = (key, value) =>
    setData((prev) => ({
      ...prev,
      clinaryInfo: {
        ...(prev.clinaryInfo || {}),
        [key]: { ...(prev.clinaryInfo?.[key] || {}), [activeLang]: value },
      },
    }));

  const copyActiveToOthers = () =>
    setData((prev) => {
      const next = { ...(prev.clinaryInfo || {}) };
      ["subtitle", "title"].forEach((k) => {
        const base = { ...(next[k] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => (base[lng] = val));
        next[k] = base;
      });
      // texts dizisindeki HER satırı da kopyala
      const arr = (next.texts && next.texts.length ? next.texts : texts).map((row) => {
        const r = { ...(row || {}) };
        const val = r[activeLang] || "";
        langs.forEach((lng) => (r[lng] = val));
        return r;
      });
      next.texts = arr;
      return { ...prev, clinaryInfo: next };
    });

  const clearActive = () =>
    setData((prev) => {
      const next = { ...(prev.clinaryInfo || {}) };
      ["subtitle", "title"].forEach((k) => {
        next[k] = { ...(next[k] || {}), [activeLang]: "" };
      });
      // texts aktif dilini temizle
      const arr = (next.texts && next.texts.length ? next.texts : texts).map((row) => ({
        ...(row || {}),
        [activeLang]: "",
      }));
      next.texts = arr;
      return { ...prev, clinaryInfo: next };
    });

  /* ---------- Images ---------- */
  const setImageUrl = (key, url) =>
    setData((prev) => ({
      ...prev,
      clinaryInfo: { ...(prev.clinaryInfo || {}), [key]: url },
    }));

  const resolveSrc = (p) => {
    if (!p) return "";
    return p.startsWith("/") ? `${apiUrl}${p}` : p;
  };

  const img1 = useMemo(() => resolveSrc(ci.image1), [ci.image1, apiUrl]);
  const img2 = useMemo(() => resolveSrc(ci.image2), [ci.image2, apiUrl]);

  const handleImageUpload = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setImageUrl(key, result.imageUrl || result.path || result.url);
    } catch (err) {
      alert("Yükleme hatası: " + (err?.message || "Bilinmeyen hata"));
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
      e.target.value = ""; // aynı dosyayı tekrar seçmeye izin ver
    }
  };

  /* ---------- Text rows ---------- */
  const handleAddText = () =>
    setData((prev) => ({
      ...prev,
      clinaryInfo: { ...(prev.clinaryInfo || {}), texts: [...texts, { tr: "", en: "", de: "", ru: "" }] },
    }));

  const handleRemoveText = (idx) =>
    setData((prev) => ({
      ...prev,
      clinaryInfo: { ...(prev.clinaryInfo || {}), texts: texts.filter((_, i) => i !== idx) },
    }));

  const handleTextChange = (idx, value) =>
    setData((prev) => {
      const arr = texts.map((row, i) => (i === idx ? { ...(row || {}), [activeLang]: value } : row));
      return { ...prev, clinaryInfo: { ...(prev.clinaryInfo || {}), texts: arr } };
    });

  const copyRowActiveToOthers = (idx) =>
    setData((prev) => {
      const arr = (prev.clinaryInfo?.texts && prev.clinaryInfo.texts.length ? prev.clinaryInfo.texts : texts).map(
        (row, i) => {
          if (i !== idx) return row;
          const r = { ...(row || {}) };
          const val = r[activeLang] || "";
          const out = { ...r };
          langs.forEach((lng) => (out[lng] = val));
          return out;
        }
      );
      return { ...prev, clinaryInfo: { ...(prev.clinaryInfo || {}), texts: arr } };
    });

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="font-bold text-xl">🍽️ Clinary Info Section</h3>

        <div className="flex items-center gap-2">
          {/* Dil sekmeleri (üstten dil gelmiyorsa lokal kontrol) */}
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

      {/* Grid: Sol (Form & Upload) | Sağ (Önizleme) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol taraf */}
        <div className="space-y-6">
          {/* Görseller */}
          <div className="bg-gray-50 border rounded-2xl p-4 space-y-4">
            <h4 className="font-semibold">Görseller</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sol Görsel */}
              <ImageCard
                title="Sol Görsel"
                imgSrc={img1}
                uploading={uploading.image1}
                onUpload={(e) => handleImageUpload(e, "image1")}
                urlValue={ci.image1 || ""}
                onUrlChange={(v) => setImageUrl("image1", v)}
              />
              {/* Sağ Görsel */}
              <ImageCard
                title="Sağ Görsel"
                imgSrc={img2}
                uploading={uploading.image2}
                onUpload={(e) => handleImageUpload(e, "image2")}
                urlValue={ci.image2 || ""}
                onUrlChange={(v) => setImageUrl("image2", v)}
              />
            </div>
          </div>

          {/* Başlıklar */}
          <div className="bg-white border rounded-2xl p-4">
            <h4 className="font-semibold mb-3">Metinler ({activeLang.toUpperCase()})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Alt Başlık"
                value={ci?.subtitle?.[activeLang] || ""}
                onChange={(v) => setLangField("subtitle", v)}
                placeholder="Kısa vurgu metni…"
                countRight
              />
              <Field
                label="Başlık"
                value={ci?.title?.[activeLang] || ""}
                onChange={(v) => setLangField("title", v)}
                placeholder="Şefin Dokunuşu"
                countRight
              />
            </div>
          </div>

          {/* Açıklamalar (Array) */}
          <div className="bg-gray-50 border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Açıklamalar ({activeLang.toUpperCase()})</h4>
              <button
                type="button"
                onClick={handleAddText}
                className="rounded-md bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5"
              >
                + Yeni Metin
              </button>
            </div>
            <div className="space-y-3">
              {texts.map((row, idx) => (
                <div key={idx} className="rounded-xl bg-white border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Metin #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyRowActiveToOthers(idx)}
                        className="text-xs rounded-md border px-2 py-1 hover:bg-gray-50"
                        title="Bu satırın aktif dilini tüm dillere kopyala"
                      >
                        ⇆ Kopyala
                      </button>
                      {texts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveText(idx)}
                          className="text-xs rounded-md border px-2 py-1 hover:bg-red-50 text-red-600"
                        >
                          Sil
                        </button>
                      )}
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    value={row?.[activeLang] || ""}
                    onChange={(e) => handleTextChange(idx, e.target.value)}
                    placeholder={`Açıklama (${dilAdlari[activeLang]})`}
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ taraf: Önizleme */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="relative bg-gray-100">
            <div className="grid grid-cols-2 gap-0 h-48 md:h-64">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="relative">
                {img1 ? (
                  <img src={img1} alt="Sol" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-gray-400">Sol görsel yok</div>
                )}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="relative">
                {img2 ? (
                  <img src={img2} alt="Sağ" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-gray-400">Sağ görsel yok</div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-sm uppercase tracking-wide text-gray-500">
                {ci?.subtitle?.[activeLang] || "Alt Başlık"}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold">
                {ci?.title?.[activeLang] || "Şefin Dokunuşu"}
              </h3>

              <ul className="mt-4 space-y-2 text-gray-700">
                {(texts.length ? texts : [{ [activeLang]: "" }]).map((t, i) => {
                  const line = t?.[activeLang] || "";
                  if (!line.trim()) return null;
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-gray-800" />
                      <span>{line}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 rounded-lg border border-dashed p-3 text-xs text-gray-500">
                Bu alan önizlemedir; canlı sitede düzen farklı olabilir.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Small subcomponents ----------------- */

function ImageCard({ title, imgSrc, uploading, onUpload, urlValue, onUrlChange }) {
  return (
    <div className="space-y-2">
      <h5 className="text-sm font-medium">{title}</h5>
      <div className="relative h-40 rounded-lg border overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="absolute inset-0 w-full h-full object-cover" />
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
            <input type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} />
          </span>
        </label>
      </div>
      <input
        type="text"
        value={urlValue || ""}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="/uploads/… veya https://…"
        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
      />
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
