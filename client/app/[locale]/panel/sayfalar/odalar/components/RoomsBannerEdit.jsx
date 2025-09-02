"use client";

import { useCallback, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const langs = ["tr", "en", "de", "ru"];

export default function RoomsBannerEdit({ data, setData }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const rb = data?.roomsBanner || {};
  const [activeLang, setActiveLang] = useState("tr");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- Embla for buttons ---------- */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    loop: false,
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  /* ---------- Helpers ---------- */
  const bannerImgSrc = useMemo(() => {
    const p = rb.bannerImage;
    if (!p) return "";
    return p.startsWith("/") ? `${apiUrl}${p}` : p;
  }, [rb.bannerImage, apiUrl]);

  const setHeader = (lng, value) =>
    setData((prev) => ({
      ...prev,
      roomsBanner: {
        ...(prev.roomsBanner || {}),
        header: { ...(prev.roomsBanner?.header || {}), [lng]: value },
      },
    }));

  const copyHeaderActiveToOthers = () => {
    const val = rb.header?.[activeLang] || "";
    setData((prev) => {
      const next = { ...(prev.roomsBanner || {}) };
      const base = { ...(next.header || {}) };
      langs.forEach((lng) => (base[lng] = val));
      next.header = base;
      return { ...prev, roomsBanner: next };
    });
  };

  const clearHeaderActive = () =>
    setData((prev) => ({
      ...prev,
      roomsBanner: {
        ...(prev.roomsBanner || {}),
        header: { ...(prev.roomsBanner?.header || {}), [activeLang]: "" },
      },
    }));

  /* ---------- Buttons ops ---------- */
  const addButton = () =>
    setData((prev) => ({
      ...prev,
      roomsBanner: {
        ...(prev.roomsBanner || {}),
        buttons: [
          ...(prev.roomsBanner?.buttons || []),
          { header: { tr: "", en: "", de: "", ru: "" }, link: "" },
        ],
      },
    }));

  const removeButton = (idx) =>
    setData((prev) => {
      const buttons = [...(prev.roomsBanner?.buttons || [])].filter((_, i) => i !== idx);
      return { ...prev, roomsBanner: { ...(prev.roomsBanner || {}), buttons } };
    });

  const setButtonHeader = (idx, value) =>
    setData((prev) => {
      const buttons = [...(prev.roomsBanner?.buttons || [])];
      const row = buttons[idx] || { header: {}, link: "" };
      row.header = { ...(row.header || {}), [activeLang]: value };
      buttons[idx] = row;
      return { ...prev, roomsBanner: { ...(prev.roomsBanner || {}), buttons } };
    });

  const setButtonLink = (idx, value) =>
    setData((prev) => {
      const buttons = [...(prev.roomsBanner?.buttons || [])];
      const row = buttons[idx] || { header: {}, link: "" };
      row.link = value;
      buttons[idx] = row;
      return { ...prev, roomsBanner: { ...(prev.roomsBanner || {}), buttons } };
    });

  const copyButtonActiveToOthers = (idx) =>
    setData((prev) => {
      const buttons = [...(prev.roomsBanner?.buttons || [])];
      const row = buttons[idx] || { header: {}, link: "" };
      const base = { ...(row.header || {}) };
      const val = base[activeLang] || "";
      langs.forEach((lng) => (base[lng] = val));
      row.header = base;
      buttons[idx] = row;
      return { ...prev, roomsBanner: { ...(prev.roomsBanner || {}), buttons } };
    });

  /* ---------- Image upload ---------- */
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("image", file);
    setUploading(true);
    setError("");
    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const imageUrl = result.imageUrl || result.path || result.url;

      setData((prev) => ({
        ...prev,
        roomsBanner: { ...(prev.roomsBanner || {}), bannerImage: imageUrl },
      }));
    } catch (err) {
      setError(err.message || "Yükleme hatası");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">🖼️ Odalar Banner</h2>

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
            onClick={copyHeaderActiveToOthers}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Başlığı tüm dillere kopyala"
          >
            ⇆ Başlığı Kopyala
          </button>
          <button
            type="button"
            onClick={clearHeaderActive}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dil başlığını temizle"
          >
            🧹 Temizle
          </button>
        </div>
      </div>

      {/* Grid: Sol (Form) | Sağ (Önizleme) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol: Form alanları */}
        <div className="space-y-6">
          {/* Banner görseli */}
          <div className="bg-gray-50 border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Banner Görseli</h3>
            <div className="relative h-40 rounded-lg border overflow-hidden">
              {bannerImgSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bannerImgSrc} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400">Görsel yok</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/10 pointer-events-none" />
              <label
                htmlFor="rooms-banner-image"
                className="absolute inset-0 flex items-end justify-end p-3"
              >
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
              <input
                id="rooms-banner-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </div>

            <div className="mt-3">
              <Field
                label="Görsel URL (opsiyonel)"
                value={rb.bannerImage || ""}
                onChange={(v) =>
                  setData((prev) => ({ ...prev, roomsBanner: { ...(prev.roomsBanner || {}), bannerImage: v } }))
                }
                placeholder="/uploads/banner.jpg veya https://…"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </div>

          {/* Başlık (aktif dil) */}
          <div className="bg-gray-50 border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Başlık ({activeLang.toUpperCase()})</h3>
            <Field
              value={rb.header?.[activeLang] || ""}
              onChange={(v) => setHeader(activeLang, v)}
              placeholder="Örn: Konforlu Odalar"
              countRight
            />
            <p className="mt-1 text-xs text-gray-500">Öneri: 30–60 karakter.</p>
          </div>

          {/* Butonlar (Embla) */}
          <div className="bg-white border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Butonlar (Aktif Dil: {activeLang.toUpperCase()})</h3>
              <div className="flex items-center gap-2">
                <button type="button" onClick={scrollPrev} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">
                  ←
                </button>
                <button type="button" onClick={scrollNext} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">
                  →
                </button>
                <button
                  type="button"
                  onClick={addButton}
                  className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  + Buton Ekle
                </button>
              </div>
            </div>

            {(rb.buttons || []).length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-gray-600">
                Henüz buton yok. <button onClick={addButton} className="underline">Ekle</button>.
              </div>
            ) : (
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-4">
                  {(rb.buttons || []).map((btn, idx) => (
                    <ButtonCard
                      key={idx}
                      idx={idx}
                      btn={btn}
                      activeLang={activeLang}
                      onSetText={(v) => setButtonHeader(idx, v)}
                      onSetLink={(v) => setButtonLink(idx, v)}
                      onCopy={() => copyButtonActiveToOthers(idx)}
                      onRemove={() => removeButton(idx)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sağ: Canlı Önizleme */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="relative h-72 md:h-96">
            {bannerImgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={bannerImgSrc} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-gray-400 bg-gray-100">Önizleme</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold drop-shadow">
                {rb.header?.[activeLang] || "Konforlu Odalar"}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(rb.buttons || []).map((b, i) => (
                  <a
                    key={i}
                    href={b.link || "#"}
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-lg text-sm hover:bg-white/90"
                    title="Önizleme (tıklanmaz)"
                  >
                    {b.header?.[activeLang] || "Buton"} <span>→</span>
                  </a>
                ))}
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

/* ---------- Small components ---------- */
function ButtonCard({ idx, btn, activeLang, onSetText, onSetLink, onCopy, onRemove }) {
  return (
    <div className="shrink-0 basis-[92%] sm:basis-[70%] md:basis-[48%] lg:basis-[40%]">
      <div className="border rounded-xl p-3 bg-gray-50 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <strong>Buton #{idx + 1}</strong>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onCopy} className="px-2 py-1 rounded border hover:bg-white text-xs">
              ⇆ Dile Kopyala
            </button>
            <button type="button" onClick={onRemove} className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">
              Sil
            </button>
          </div>
        </div>
        <Field
          label={`Metin (${activeLang.toUpperCase()})`}
          value={btn.header?.[activeLang] || ""}
          onChange={onSetText}
          placeholder="Örn: Tüm Odalar"
          countRight
        />
        <Field label="Link" value={btn.link || ""} onChange={onSetLink} placeholder="/odalar" />
        <div className="mt-2 rounded bg-white border p-2 text-xs text-gray-700">
          <span className="px-2 py-1 rounded bg-black text-white">{btn.header?.[activeLang] || "Buton"}</span>
          <span className="ml-2">{btn.link || "/"}</span>
        </div>
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
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
        />
      )}
    </div>
  );
}
