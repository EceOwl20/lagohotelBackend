"use client";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function KidsclubCarouselEdit({ data, setData, langs }) {
  const carousel = data.kidsClubCarousel || {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ---------- Embla ----------
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
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

  // ---------- Genel alanlar ----------
  const handleGeneralChange = (field, lang, value) => {
    setData({
      ...data,
      kidsClubCarousel: {
        ...carousel,
        [field]: { ...(carousel[field] || {}), [lang]: value },
      },
    });
  };

  // ---------- Slide ekle/sil ----------
  const handleAdd = () => {
    setData({
      ...data,
      kidsClubCarousel: {
        ...carousel,
        slides: [
          ...(carousel.slides || []),
          { image: "", header: { tr: "", en: "", de: "", ru: "" } },
        ],
      },
    });
    // yeni eklenen kartı en sona kaydır
    setTimeout(() => scrollTo((carousel.slides?.length || 0)), 0);
  };

  const handleRemove = (i) => {
    setData({
      ...data,
      kidsClubCarousel: {
        ...carousel,
        slides: (carousel.slides || []).filter((_, idx) => idx !== i),
      },
    });
  };

  // ---------- Slide içi ----------
  const handleSlideTextChange = (key, lang, value, idx) => {
    const slides = [...(carousel.slides || [])];
    slides[idx][key][lang] = value;
    setData({ ...data, kidsClubCarousel: { ...carousel, slides } });
  };

  // ---------- Upload ----------
  const [uploading, setUploading] = useState({});
  const uploadImage = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((u) => ({ ...u, [idx]: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const imageUrl = result.imageUrl || result.path;

      const slides = [...(carousel.slides || [])];
      slides[idx].image = imageUrl;
      setData({ ...data, kidsClubCarousel: { ...carousel, slides } });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading((u) => ({ ...u, [idx]: false }));
    }
  };

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-bold text-xl">Kids Club Carousel</h3>
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
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
            onClick={handleAdd}
          >
            + Slide Ekle
          </button>
        </div>
      </div>

      {/* Subtitle */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Alt Başlıklar</label>
        <div className="flex gap-2 flex-wrap">
          {langs.map((lang) => (
            <input
              key={lang}
              placeholder={`Alt Başlık (${lang.toUpperCase()})`}
              className="border p-2 rounded w-[180px]"
              value={carousel.subtitle?.[lang] || ""}
              onChange={(e) => handleGeneralChange("subtitle", lang, e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Başlıklar</label>
        <div className="flex gap-2 flex-wrap">
          {langs.map((lang) => (
            <input
              key={lang}
              placeholder={`Başlık (${lang.toUpperCase()})`}
              className="border p-2 rounded w-[180px]"
              value={carousel.title?.[lang] || ""}
              onChange={(e) => handleGeneralChange("title", lang, e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Açıklama</label>
        <div className="flex gap-2 flex-wrap">
          {langs.map((lang) => (
            <textarea
              key={lang}
              placeholder={`Açıklama (${lang.toUpperCase()})`}
              className="border p-2 rounded w-[180px] min-h-[64px]"
              value={carousel.text?.[lang] || ""}
              onChange={(e) => handleGeneralChange("text", lang, e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Slides - Embla Viewport */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4">
            {(carousel.slides || []).map((slide, idx) => (
              <div
                key={idx}
                className="
                  shrink-0
                  basis-[85%] sm:basis-[70%] md:basis-[48%] lg:basis-[32%]
                "
              >
                <div className="border rounded-xl p-3 bg-white h-full flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <strong>Slide #{idx + 1}</strong>
                    <button
                      type="button"
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleRemove(idx)}
                    >
                      Sil
                    </button>
                  </div>

                  {/* Görsel Yükle */}
                  <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">Görsel Yükle</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadImage(e, idx)}
                        disabled={uploading[idx]}
                      />
                      {uploading[idx] && <span className="text-blue-500">Yükleniyor…</span>}
                    </div>
                    {slide.image && (
                      <img
                        src={
                          slide.image.startsWith("/")
                            ? `${apiUrl}${slide.image}`
                            : slide.image
                        }
                        alt={`Slide ${idx + 1}`}
                        className="w-full h-40 object-cover rounded border mt-2"
                      />
                    )}
                  </div>

                  {/* Başlıklar */}
                  <div className="grid grid-cols-1 gap-3">
                    {langs.map((lang) => (
                      <div key={lang}>
                        <label className="text-xs block mb-1">
                          Başlık ({lang.toUpperCase()})
                        </label>
                        <input
                          type="text"
                          className="w-full border p-2 rounded"
                          value={slide.header?.[lang] || ""}
                          onChange={(e) =>
                            handleSlideTextChange("header", lang, e.target.value, idx)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
                className={`w-2.5 h-2.5 rounded-full ${
                  i === selectedIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
