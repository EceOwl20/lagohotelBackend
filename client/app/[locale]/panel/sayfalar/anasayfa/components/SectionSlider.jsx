"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function SectionSlider({ data, setData }) {
  const languages = ["tr", "en", "de", "ru"];
  const [activeLang, setActiveLang] = useState("tr"); // Dil sekmesi
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Embla
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

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  // --- helpers ---
  const updateSlide = (index, patch) => {
    const updated = [...(data.slider || [])];
    updated[index] = { ...(updated[index] || {}), ...patch };
    setData({ ...data, slider: updated });
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");

      const imageUrl = result.imageUrl || result.path || result.url;
      updateSlide(index, { image: imageUrl || "" });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      e.target.value = "";
    }
  };

  const setLangField = (index, field, lang, value) => {
    const slide = (data.slider || [])[index] || {};
    const nextField = { ...(slide[field] || {}), [lang]: value };
    updateSlide(index, { [field]: nextField });
  };

  const slides = data.slider || [];

  return (
    <section className="border p-4 rounded bg-white space-y-4">
      {/* Başlık + Aksiyonlar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">🖼️ Slider</h2>

        <div className="flex items-center gap-2">
          {/* Dil sekmeleri */}
          <div className="hidden sm:flex items-center rounded-lg border overflow-hidden">
            {languages.map((lng) => (
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

          {/* Prev / Next */}
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

          {/* Ekle */}
          <button
            type="button"
            onClick={() => {
              const newSlide = {
                image: "",
                title: { tr: "", en: "", de: "", ru: "" },
                link: { tr: "", en: "", de: "", ru: "" }, // map'te obje bekleniyor
              };
              const next = [...slides, newSlide];
              setData({ ...data, slider: next });
              setTimeout(() => scrollTo(next.length - 1), 0);
            }}
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            + Slayt Ekle
          </button>
        </div>
      </div>

      {/* Embla Viewport */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4">
            {slides.map((slide, index) => {
              const previewSrc = slide?.image
                ? (slide.image.startsWith("/") ? `${apiUrl}${slide.image}` : slide.image)
                : null;

              return (
                <div
                  key={index}
                  className="shrink-0 basis-[92%] sm:basis-[70%] md:basis-[48%] lg:basis-[32%]"
                >
                  <div className="border rounded-xl p-3 bg-gray-50 h-full flex flex-col">
                    {/* Kart başlık + Sil */}
                    <div className="flex items-center justify-between mb-3">
                      <strong>Slayt #{index + 1}</strong>
                      <button
                        type="button"
                        className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                        onClick={() => {
                          const next = slides.filter((_, i) => i !== index);
                          setData({ ...data, slider: next });
                        }}
                      >
                        Sil
                      </button>
                    </div>

                    {/* Görsel alanı */}
                    <div className="mb-3">
                      <label className="block text-sm font-semibold mb-1">Görsel</label>

                      <div className="relative w-full">
                        {previewSrc ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={previewSrc}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-40 object-cover rounded border"
                          />
                        ) : (
                          <div className="w-full h-40 rounded border grid place-items-center text-gray-400 bg-white">
                            Görsel yok
                          </div>
                        )}

                        {/* Overlay yükle butonu */}
                        <label
                          htmlFor={`file-${index}`}
                          className="absolute inset-0 rounded bg-black/0 hover:bg-black/40 text-white flex items-center justify-center text-sm opacity-0 hover:opacity-100 cursor-pointer transition"
                        >
                          Değiştir / Yükle
                        </label>
                        <input
                          id={`file-${index}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, index)}
                        />
                      </div>

                      {/* Manuel URL */}
                      <input
                        type="text"
                        value={slide.image || ""}
                        onChange={(e) => updateSlide(index, { image: e.target.value })}
                        className="w-full mt-2 rounded border px-3 py-2 bg-white"
                        placeholder="Görsel URL (opsiyonel)"
                      />
                    </div>

                    {/* Başlık (aktif dil) */}
                    <div className="mb-3">
                      <label className="block text-sm font-semibold mb-1">
                        Başlık ({activeLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={slide.title?.[activeLang] || ""}
                        onChange={(e) =>
                          setLangField(index, "title", activeLang, e.target.value)
                        }
                        className="w-full rounded border px-3 py-2 bg-white"
                        placeholder={`Başlık (${activeLang.toUpperCase()})`}
                      />
                    </div>

                    {/* Link (aktif dil) */}
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Link ({activeLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={slide.link?.[activeLang] || ""}
                        onChange={(e) =>
                          setLangField(index, "link", activeLang, e.target.value)
                        }
                        className="w-full rounded border px-3 py-2 bg-white"
                        placeholder={`/ornek-yol (${activeLang.toUpperCase()})`}
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
                  i === selectedIndex ? "bg-black" : "bg-gray-300"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Örnek slayt butonu */}
      <div className="flex gap-3">
        {/* <button
          type="button"
          onClick={() => {
            const exampleSlides = [
              "Konaklama",
              "Havuz & Plaj",
              "Eğlence",
              "Lezzetler",
              "Çocuk Kulübü",
              "SPA & Wellness",
              "Barlar",
            ].map((title, i) => ({
              image: "",
              title: { tr: title, en: `Slide ${i + 1}`, de: `Slide ${i + 1}`, ru: `Слайд ${i + 1}` },
              link: { tr: "/", en: "/", de: "/", ru: "/" },
            }));
            setData({ ...data, slider: exampleSlides });
            setTimeout(() => scrollTo(0), 0);
          }}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          🚀 7 Örnek Slayt Ekle
        </button> */}
      </div>
    </section>
  );
}
