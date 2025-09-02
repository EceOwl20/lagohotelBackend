// app/[locale]/panel/sayfalar/kidsclub/components/KidsRestaurantCarouselEdit.jsx
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const ALL_LANGS = ["tr", "en", "de", "ru"];

export default function KidsRestaurantCarouselEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const value = data?.kidsRestaurantCarousel || {};
  const images = Array.isArray(value?.images) ? value.images : [];
  const listForActive = Array.isArray(value?.list?.[activeLang]) ? value.list[activeLang] : [];

  /* ============ Embla (Images) ============ */
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
  const toSrc = (p) => (p ? (p.startsWith("/") ? `${apiUrl}${p}` : p) : "");

  const setGeneralField = (field, val) =>
    setData((prev) => ({
      ...prev,
      kidsRestaurantCarousel: {
        ...(prev?.kidsRestaurantCarousel || {}),
        [field]: {
          ...((prev?.kidsRestaurantCarousel && prev.kidsRestaurantCarousel[field]) || {}),
          [activeLang]: val,
        },
      },
    }));

  const setImages = (updater) =>
    setData((prev) => ({
      ...prev,
      kidsRestaurantCarousel: {
        ...(prev?.kidsRestaurantCarousel || {}),
        images: typeof updater === "function" ? updater(prev?.kidsRestaurantCarousel?.images || []) : updater,
      },
    }));

  const setListForLang = (lang, updater) =>
    setData((prev) => {
      const cur = prev?.kidsRestaurantCarousel?.list || {};
      const nextList = { ...cur, [lang]: typeof updater === "function" ? updater(cur[lang] || []) : updater };
      return {
        ...prev,
        kidsRestaurantCarousel: {
          ...(prev?.kidsRestaurantCarousel || {}),
          list: nextList,
        },
      };
    });

  /* ---- List ops (aktif dil) ---- */
  const handleListItemChange = (idx, val) =>
    setListForLang(activeLang, (arr) => {
      const next = [...arr];
      next[idx] = val;
      return next;
    });

  const addListItem = () =>
    setData((prev) => {
      const base = prev?.kidsRestaurantCarousel?.list || {};
      const next = { ...base };
      ALL_LANGS.forEach((l) => {
        next[l] = [...(base[l] || []), ""];
      });
      return { ...prev, kidsRestaurantCarousel: { ...(prev?.kidsRestaurantCarousel || {}), list: next } };
    });

  const removeListItem = (idx) =>
    setData((prev) => {
      const base = prev?.kidsRestaurantCarousel?.list || {};
      const next = Object.fromEntries(
        ALL_LANGS.map((l) => [l, (base[l] || []).filter((_, i) => i !== idx)])
      );
      return { ...prev, kidsRestaurantCarousel: { ...(prev?.kidsRestaurantCarousel || {}), list: next } };
    });

  /* ---- Images ops ---- */
  const setImage = (idx, url) =>
    setImages((arr) => {
      const next = [...arr];
      next[idx] = url;
      return next;
    });

  const addImage = () => setImages((arr) => [...arr, ""]);
  const removeImage = (idx) => setImages((arr) => arr.filter((_, i) => i !== idx));

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

  /* ============ UI ============ */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">🍝 Kids Restaurant Carousel</h3>
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
      <div className="p-4 space-y-8">
        <p className="text-sm text-gray-600">
          Aktif dil: <span className="font-medium">{activeLang.toUpperCase()}</span>
        </p>

        {/* Genel alanlar (tek dil) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Alt Başlık ({activeLang.toUpperCase()})</label>
            <input
              type="text"
              value={value?.subtitle?.[activeLang] || ""}
              onChange={(e) => setGeneralField("subtitle", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Başlık ({activeLang.toUpperCase()})</label>
            <input
              type="text"
              value={value?.title?.[activeLang] || ""}
              onChange={(e) => setGeneralField("title", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Açıklama ({activeLang.toUpperCase()})</label>
            <textarea
              rows={2}
              value={value?.text?.[activeLang] || ""}
              onChange={(e) => setGeneralField("text", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        {/* Liste maddeleri (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Liste Maddeleri ({activeLang.toUpperCase()})</h4>
            <button
              type="button"
              onClick={addListItem}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
            >
              + Madde Ekle
            </button>
          </div>

          {listForActive.length === 0 && (
            <div className="text-sm text-gray-500">Henüz madde yok. “+ Madde Ekle” ile başlayın.</div>
          )}

          {listForActive.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2 bg-white p-2 rounded ring-1 ring-black/5">
              <span className="w-6 text-center font-medium">{idx + 1}.</span>
              <input
                className="border p-2 rounded w-full"
                value={val || ""}
                onChange={(e) => handleListItemChange(idx, e.target.value)}
                placeholder={`Madde ${idx + 1}`}
              />
              <button
                type="button"
                className="px-3 py-1.5 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                onClick={() => removeListItem(idx)}
              >
                Sil
              </button>
            </div>
          ))}
        </div>

        {/* Görseller – Embla carousel */}
        <div className="space-y-3">
          <h4 className="font-semibold">Görseller</h4>

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
                              <img src={src} alt={`slide-${idx}`} className="h-full w-full object-cover" />
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

            {/* dots */}
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
