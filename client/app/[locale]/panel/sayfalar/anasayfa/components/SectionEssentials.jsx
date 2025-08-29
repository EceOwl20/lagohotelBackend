"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const langs = ["tr", "en", "de", "ru"];

export default function SectionEssentials({ data, setData }) {
  const essentials = data.essentials || {};
  const items = essentials.items || [];
  const [activeLang, setActiveLang] = useState("tr");

  /* ---------- Yardımcılar (bölüm alanları) ---------- */
  const setSectionField = (field, lang, value) =>
    setData((prev) => {
      const pe = prev.essentials || {};
      const pf = pe[field] || {};
      return { ...prev, essentials: { ...pe, [field]: { ...pf, [lang]: value } } };
    });

  const getSection = useCallback(
    (field) => essentials?.[field]?.[activeLang] || "",
    [essentials, activeLang]
  );

  const copySectionActiveToOthers = () => {
    const fields = ["subtitle", "title", "buttonText", "buttonLink"];
    setData((prev) => {
      const pe = prev.essentials || {};
      const ne = { ...pe };
      for (const f of fields) {
        const base = { ...(pe[f] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => {
          if (lng !== activeLang) base[lng] = val;
        });
        ne[f] = base;
      }
      return { ...prev, essentials: ne };
    });
  };

  const clearSectionActive = () => {
    const fields = ["subtitle", "title", "buttonText", "buttonLink"];
    setData((prev) => {
      const pe = prev.essentials || {};
      const ne = { ...pe };
      for (const f of fields) ne[f] = { ...(pe[f] || {}), [activeLang]: "" };
      return { ...prev, essentials: ne };
    });
  };

  /* ---------- Item işlemleri ---------- */
  const addItem = () => {
    const emptyItem = {
      title: { tr: "", en: "", de: "", ru: "" },
      description: { tr: "", en: "", de: "", ru: "" },
      icon: "",
      link: "",
    };
    const next = [...items, emptyItem];
    setData({ ...data, essentials: { ...essentials, items: next } });
    setTimeout(() => emblaApi?.scrollTo(next.length - 1), 0);
  };

  const removeItem = (idx) => {
    const next = items.filter((_, i) => i !== idx);
    setData({ ...data, essentials: { ...essentials, items: next } });
  };

  const updateItem = (idx, patch) => {
    const next = [...items];
    next[idx] = { ...(next[idx] || {}), ...patch };
    setData({ ...data, essentials: { ...essentials, items: next } });
  };

  const setItemLangField = (idx, field, lang, value) => {
    const it = items[idx] || {};
    const base = it[field] || {};
    updateItem(idx, { [field]: { ...base, [lang]: value } });
  };

  const copyItemActiveToOthers = (idx) => {
    const it = items[idx] || {};
    const fields = ["title", "description"];
    const patch = {};
    for (const f of fields) {
      const base = { ...(it[f] || {}) };
      const val = base[activeLang] || "";
      langs.forEach((lng) => {
        if (lng !== activeLang) base[lng] = val;
      });
      patch[f] = base;
    }
    updateItem(idx, patch);
  };

  /* ---------- Embla ---------- */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  /* ---------- Görünüm ---------- */
  return (
    <section className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
      {/* Üst şerit */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">✨ Essentials Bölümü</h2>

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
            onClick={copySectionActiveToOthers}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dildeki bölüm alanlarını diğer dillere kopyala"
          >
            ⇆ Bölüm Alanlarını Kopyala
          </button>

          <button
            type="button"
            onClick={clearSectionActive}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dil bölüm alanlarını temizle"
          >
            🧹 Bölüm Alanlarını Temizle
          </button>

          {/* Prev / Next & Ekle */}
          <button
            type="button"
            onClick={scrollPrev}
            className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
            aria-label="Önceki"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
            aria-label="Sonraki"
          >
            →
          </button>
          <button
            type="button"
            onClick={addItem}
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            + Özellik Ekle
          </button>
        </div>
      </div>

      {/* Bölüm başlıkları & buton (aktif dil) */}
      <div className="bg-gray-50 border rounded-2xl p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label={`Alt Başlık (${activeLang.toUpperCase()})`}
            value={getSection("subtitle")}
            onChange={(v) => setSectionField("subtitle", activeLang, v)}
            placeholder="Örn: Öne çıkanlar"
            countRight
          />
          <Field
            label={`Başlık (${activeLang.toUpperCase()})`}
            value={getSection("title")}
            onChange={(v) => setSectionField("title", activeLang, v)}
            placeholder="Örn: Tatilin olmazsa olmazları"
            countRight
          />
          <Field
            label={`Buton Metni (${activeLang.toUpperCase()})`}
            value={getSection("buttonText")}
            onChange={(v) => setSectionField("buttonText", activeLang, v)}
            placeholder="Tümünü gör"
            countRight
          />
          <Field
            label={`Buton Linki (${activeLang.toUpperCase()})`}
            value={getSection("buttonLink")}
            onChange={(v) => setSectionField("buttonLink", activeLang, v)}
            placeholder="/essentials"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Başlık: 40–60 karakter • Alt başlık: 60–100 • Buton metni: 12–24 önerilir.
        </p>
      </div>

      {/* Item kartları (Embla) */}
      <div className="relative">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-gray-600">
            Henüz öğe yok. <button onClick={addItem} className="underline">Öğe ekle</button>.
          </div>
        ) : (
          <>
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-4">
                {items.map((item, idx) => (
                  <ItemCard
                    key={idx}
                    idx={idx}
                    item={item}
                    activeLang={activeLang}
                    onRemove={() => removeItem(idx)}
                    onSetLangField={(field, value) => setItemLangField(idx, field, activeLang, value)}
                    onChange={(patch) => updateItem(idx, patch)}
                    onCopyActiveToOthers={() => copyItemActiveToOthers(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Dots */}
            {scrollSnaps.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-3">
                {scrollSnaps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className={`w-2.5 h-2.5 rounded-full ${i === selectedIndex ? "bg-black" : "bg-gray-300"}`}
                    aria-label={`Öğe ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- Item Kartı ---------- */
function ItemCard({ idx, item, activeLang, onRemove, onSetLangField, onChange, onCopyActiveToOthers }) {
  const title = item.title?.[activeLang] || "";
  const description = item.description?.[activeLang] || "";
  const icon = item.icon || "";
  const link = item.link || "";

  // Mini önizleme ikonu (sadece text gösterimi)
  const iconBadge = useMemo(() => {
    if (!icon) return <span className="text-gray-400">—</span>;
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-black text-white">{icon}</span>;
  }, [icon]);

  return (
    <div className="shrink-0 basis-[92%] sm:basis-[70%] md:basis-[48%] lg:basis-[32%]">
      <div className="border rounded-xl p-3 bg-gray-50 h-full flex flex-col">
        {/* Başlık + aksiyonlar */}
        <div className="flex items-center justify-between mb-3">
          <strong>Özellik #{idx + 1}</strong>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopyActiveToOthers}
              className="px-2 py-1 rounded border hover:bg-white text-xs"
              title="Aktif dil alanlarını diğer dillere kopyala"
            >
              ⇆ Dile Kopyala
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Sil
            </button>
          </div>
        </div>

        {/* Aktif dil alanları */}
        <Field
          label={`Başlık (${activeLang.toUpperCase()})`}
          value={title}
          onChange={(v) => onSetLangField("title", v)}
          placeholder="Örn: Plaj"
          countRight
        />

        <Field
          label={`Açıklama (${activeLang.toUpperCase()})`}
          value={description}
          onChange={(v) => onSetLangField("description", v)}
          placeholder="Kısa açıklama…"
          textarea
          rows={2}
        />

        {/* Tek dil alanları */}
        <Field
          label="Icon adı (örn: Beach, Pool)"
          value={icon}
          onChange={(v) => onChange({ icon: v })}
          placeholder="Beach"
        />

        <Field
          label="Link"
          value={link}
          onChange={(v) => onChange({ link: v })}
          placeholder="/essentials/plaj"
        />

        {/* Mini önizleme */}
        <div className="mt-3 rounded-lg bg-white border p-3">
          <div className="flex items-center gap-3">
            {iconBadge}
            <div className="flex-1">
              <p className="font-medium text-gray-900">{title || "Başlık"}</p>
              <p className="text-xs text-gray-600 line-clamp-2">{description || "Açıklama"}</p>
            </div>
            <a
              href={link || "#"}
              onClick={(e) => e.preventDefault()}
              className="px-2.5 py-1.5 rounded-md bg-black text-white text-xs hover:bg-black/90"
            >
              Git →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Küçük Field bileşeni ---------- */
function Field({ label, value, onChange, placeholder, textarea = false, rows = 3, countRight = false }) {
  const len = (value || "").length;
  return (
    <div className="mb-3 last:mb-0">
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
