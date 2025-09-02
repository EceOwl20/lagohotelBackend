// app/[locale]/panel/sayfalar/kidsclub/components/KidsclubCarouselEdit.jsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function KidsclubCarouselEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const carousel = data?.kidsClubCarousel || {};
  const slides = Array.isArray(carousel?.slides) ? carousel.slides : [];

  /* ============ Embla ============ */
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

  /* ============ Helpers ============ */
  const setGeneralField = (field, value) =>
    setData((prev) => ({
      ...prev,
      kidsClubCarousel: {
        ...(prev?.kidsClubCarousel || {}),
        [field]: {
          ...((prev?.kidsClubCarousel && prev.kidsClubCarousel[field]) || {}),
          [activeLang]: value,
        },
      },
    }));

  const setSlides = (updater) =>
    setData((prev) => ({
      ...prev,
      kidsClubCarousel: {
        ...(prev?.kidsClubCarousel || {}),
        slides:
          typeof updater === "function"
            ? updater(prev?.kidsClubCarousel?.slides || [])
            : updater,
      },
    }));

  const addSlide = () => {
    setSlides((arr) => [
      ...arr,
      { image: "", header: { tr: "", en: "", de: "", ru: "" } },
    ]);
    // sona kaydır
    setTimeout(() => {
      if (!emblaApi) return;
      const last = slides?.length || 0;
      emblaApi.scrollTo(last);
    }, 0);
  };

  const removeSlide = (idx) => setSlides((arr) => arr.filter((_, i) => i !== idx));

  const setSlideText = (idx, value) =>
    setSlides((arr) => {
      const next = [...arr];
      const cur = next[idx] || {};
      next[idx] = {
        ...cur,
        header: {
          ...(cur.header || {}),
          [activeLang]: value,
        },
      };
      return next;
    });

  const setSlideImage = (idx, url) =>
    setSlides((arr) => {
      const next = [...arr];
      next[idx] = { ...(next[idx] || {}), image: url };
      return next;
    });

  const toSrc = (p) => (p ? (p.startsWith("/") ? `${apiUrl}${p}` : p) : "");

  /* ============ Upload ============ */
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
      if (url) setSlideImage(idx, url);
    } catch (e) {
      alert(e?.message || "Yükleme hatası");
    } finally {
      setUploading((u) => ({ ...u, [idx]: false }));
    }
  };

  /* ============ UI ============ */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">🧒 Kids Club Carousel</h3>
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
            onClick={addSlide}
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            + Slide Ekle
          </button>
        </div>
      </div>

      {/* body */}
      <div className="p-4 space-y-6">
        <p className="text-sm text-gray-600">
          Aktif dil: <span className="font-medium">{activeLang.toUpperCase()}</span>
        </p>

        {/* Genel alanlar – tek dil */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Alt Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={carousel?.subtitle?.[activeLang] || ""}
              onChange={(e) => setGeneralField("subtitle", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Başlık ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={carousel?.title?.[activeLang] || ""}
              onChange={(e) => setGeneralField("title", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Açıklama ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={2}
              value={carousel?.text?.[activeLang] || ""}
              onChange={(e) => setGeneralField("text", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        {/* Slides - Embla */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4">
              {slides.map((slide, idx) => {
                const imgSrc = toSrc(slide.image);
                return (
                  <div
                    key={idx}
                    className="shrink-0 basis-[85%] sm:basis-[70%] md:basis-[48%] lg:basis-[32%]"
                  >
                    <div className="h-full flex flex-col rounded-xl ring-1 ring-black/5 bg-white p-3">
                      <div className="flex items-center justify-between mb-2">
                        <strong>Slide #{idx + 1}</strong>
                        <button
                          type="button"
                          onClick={() => removeSlide(idx)}
                          className="px-2 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                        >
                          Sil
                        </button>
                      </div>

                      {/* Görsel */}
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold">Görsel</label>
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={`Slide ${idx + 1}`}
                              className="h-full w-full object-cover"
                            />
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
                            onClick={() => setSlideImage(idx, "")}
                          >
                            Kaldır
                          </button>
                          {uploading[idx] && (
                            <span className="text-sm text-blue-600">Yükleniyor…</span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={slide.image || ""}
                          onChange={(e) => setSlideImage(idx, e.target.value)}
                          placeholder="/uploads/... veya tam URL"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                      </div>

                      {/* Başlık (aktif dil) */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                          Başlık ({activeLang.toUpperCase()})
                        </label>
                        <input
                          type="text"
                          value={slide?.header?.[activeLang] || ""}
                          onChange={(e) => setSlideText(idx, e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
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
    </section>
  );
}
