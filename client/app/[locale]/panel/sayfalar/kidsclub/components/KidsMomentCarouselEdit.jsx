// app/[locale]/panel/sayfalar/kidsclub/components/KidsMomentCarouselEdit.jsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function KidsMomentCarouselEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const value = data?.kidsMomentCarousel || {};
  const images = Array.isArray(value?.images) ? value.images : [];

  /* ---------------- Embla ---------------- */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: "start",
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

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  /* ---------------- Helpers ---------------- */
  const toSrc = (p) => (p ? (p.startsWith("/") ? `${apiUrl}${p}` : p) : "");

  const setHeader = (val) =>
    setData((prev) => ({
      ...prev,
      kidsMomentCarousel: {
        ...(prev?.kidsMomentCarousel || {}),
        header: {
          ...((prev?.kidsMomentCarousel && prev.kidsMomentCarousel.header) || {}),
          [activeLang]: val,
        },
      },
    }));

  const setImages = (updater) =>
    setData((prev) => ({
      ...prev,
      kidsMomentCarousel: {
        ...(prev?.kidsMomentCarousel || {}),
        images:
          typeof updater === "function"
            ? updater(prev?.kidsMomentCarousel?.images || [])
            : updater,
      },
    }));

  const addImage = () => setImages((arr) => [...arr, ""]);
  const removeImage = (idx) => setImages((arr) => arr.filter((_, i) => i !== idx));
  const setImage = (idx, url) =>
    setImages((arr) => {
      const next = [...arr];
      next[idx] = url;
      return next;
    });

  /* ---------------- Upload ---------------- */
  const [uploading, setUploading] = useState({});
  const uploadImage = async (idx, file) => {
    if (!file) return;
    setUploading((u) => ({ ...u, [idx]: true }));
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Yükleme başarısız");
      const url = json.imageUrl || json.path;
      if (url) setImage(idx, url);
    } catch (e) {
      alert(e?.message || "Yükleme hatası");
    } finally {
      setUploading((u) => ({ ...u, [idx]: false }));
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">📸 Kids Moment Carousel</h3>
        <div className="flex items-center gap-2">
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
            onClick={addImage}
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            + Görsel Ekle
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-6">
        {/* Başlık (aktif dil) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Başlık ({activeLang.toUpperCase()})
          </label>
          <input
            type="text"
            value={value?.header?.[activeLang] || ""}
            onChange={(e) => setHeader(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Images – Embla */}
        <div className="space-y-3">
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-4">
                {images.map((img, idx) => {
                  const src = toSrc(img);
                  return (
                    <div
                      key={idx}
                      className="shrink-0 basis-[85%] sm:basis-[70%] md:basis-[48%] lg:basis-[32%]"
                    >
                      <div className="h-full flex flex-col rounded-xl ring-1 ring-black/5 bg-white p-3">
                        <div className="flex items-center justify-between mb-2">
                          <strong>Görsel #{idx + 1}</strong>
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="px-2 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                          >
                            Sil
                          </button>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-semibold">Önizleme</label>
                          <div className="aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
                            {src ? (
                              <img src={src} alt={`moment-${idx}`} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full grid place-items-center text-gray-400 text-sm">
                                Görsel yok
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <label className="inline-flex items-center px-3 py-2 rounded-md bg-black text-white text-sm cursor-pointer hover:bg-black/90">
                              Dosya Seç
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={!!uploading[idx]}
                                onChange={(e) => uploadImage(idx, e.target.files?.[0] || null)}
                              />
                            </label>
                            <button
                              type="button"
                              className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                              onClick={() => setImage(idx, "")}
                            >
                              Kaldır
                            </button>
                            {uploading[idx] && (
                              <span className="text-sm text-blue-600">Yükleniyor…</span>
                            )}
                          </div>

                          <input
                            type="text"
                            value={img || ""}
                            onChange={(e) => setImage(idx, e.target.value)}
                            placeholder="/uploads/... veya tam URL"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots */}
            {scrollSnaps.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-3">
                {scrollSnaps.map((_, i) => (
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
      </div>
    </section>
  );
}
