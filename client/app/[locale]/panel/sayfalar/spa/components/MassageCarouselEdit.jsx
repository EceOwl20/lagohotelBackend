// app/[locale]/panel/sayfalar/spa/components/MassageCarouselEdit.jsx
"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function MassageCarouselEdit({ data, setData, activeLang = "tr" }) {
  const section = data?.massageCarousel || {};
  const cards = Array.isArray(section?.carouselCards) ? section.carouselCards : [];

  /* ---------- helpers (immutable updates) ---------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.massageCarousel || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), massageCarousel: { ...cur, ...next } };
    });

  const setGeneral = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  const addCard = () =>
    update((cur) => ({
      carouselCards: [...(cur?.carouselCards || []), { image: "", title: {}, text: {} }],
    }));

  const removeCard = (idx) =>
    update((cur) => ({
      carouselCards: (cur?.carouselCards || []).filter((_, i) => i !== idx),
    }));

  const setCardField = (idx, field, value) =>
    update((cur) => {
      const list = [...(cur?.carouselCards || [])];
      const item = list[idx] || {};
      list[idx] = {
        ...item,
        [field]: { ...(item[field] || {}), [activeLang]: value },
      };
      return { carouselCards: list };
    });

  const setCardImage = (idx, url) =>
    update((cur) => {
      const list = [...(cur?.carouselCards || [])];
      const item = list[idx] || {};
      list[idx] = { ...item, image: url };
      return { carouselCards: list };
    });

  /* ---------- Embla ---------- */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect, cards.length]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  /* ---------- UI ---------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden max-w-4xl">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h2 className="text-lg font-semibold">💆 Massage Carousel</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            aria-label="Önceki"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            aria-label="Sonraki"
          >
            →
          </button>
          <button
            type="button"
            onClick={addCard}
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            + Kart Ekle
          </button>
        </div>
      </div>

      <div className="p-4 space-y-8 overflow-x-hidden">{/* ← koruma */}
        {/* Genel metinler */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Genel Metinler ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldText
              label="Alt Başlık"
              value={section?.subtitle?.[activeLang] || ""}
              onChange={(v) => setGeneral("subtitle", v)}
            />
            <FieldText
              label="Başlık"
              value={section?.title?.[activeLang] || ""}
              onChange={(v) => setGeneral("title", v)}
            />
            <FieldArea
              label="Açıklama"
              rows={2}
              value={section?.text?.[activeLang] || ""}
              onChange={(v) => setGeneral("text", v)}
            />
          </div>
        </div>

        {/* Cards - Embla */}
        <div className="relative overflow-x-hidden">{/* ← koruma */}
          <div ref={emblaRef} className="overflow-hidden">
            {/* gap yerine -ml + pl ile spacing; track taşımasını engeller */}
            <div className="-ml-4 flex">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="
                    pl-4
                    shrink-0
                    min-w-0
                    basis-[85%] sm:basis-[70%] md:basis-[48%] lg:basis-[44%]
                  "
                >
                  <div className="h-full rounded-xl ring-1 ring-black/10 bg-white p-4 flex flex-col gap-4 min-w-0">
                    {/* Kart üst çubuk */}
                    <div className="flex items-center justify-between">
                      <strong>Kart #{idx + 1}</strong>
                      <button
                        type="button"
                        onClick={() => removeCard(idx)}
                        className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
                      >
                        Sil
                      </button>
                    </div>

                    {/* Görsel (ImageUploadInput) */}
                    <div className="min-w-0">
                      <label className="block text-sm font-medium mb-1">
                        Görsel
                      </label>
                      <ImageUploadInput
                        value={card.image || ""}
                        onChange={(url) => setCardImage(idx, url)}
                      />
                    </div>

                    {/* Metinler (aktif dil) */}
                    <div className="grid grid-cols-1 gap-3 min-w-0">
                      <FieldText
                        label={`Başlık (${activeLang.toUpperCase()})`}
                        value={card?.title?.[activeLang] || ""}
                        onChange={(v) => setCardField(idx, "title", v)}
                      />
                      <FieldArea
                        label={`Açıklama (${activeLang.toUpperCase()})`}
                        rows={3}
                        value={card?.text?.[activeLang] || ""}
                        onChange={(v) => setCardField(idx, "text", v)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {cards.length === 0 && (
                <div className="pl-4 shrink-0 basis-full min-w-0">
                  <div className="rounded-xl ring-1 ring-black/10 bg-gray-50 p-6 text-center text-gray-600">
                    Henüz kart yok. “+ Kart Ekle” ile başlayın.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dots */}
          {snapCount > 1 && (
            <div className="flex items-center justify-center gap-2 mt-3">
              {Array.from({ length: snapCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === selectedIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------- küçük input bileşenleri -------- */
function FieldText({ label, value, onChange }) {
  return (
    <div className="min-w-0">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function FieldArea({ label, value, onChange, rows = 3 }) {
  return (
    <div className="min-w-0">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        rows={rows}
        className="w-full rounded-md border border-gray-300 px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}