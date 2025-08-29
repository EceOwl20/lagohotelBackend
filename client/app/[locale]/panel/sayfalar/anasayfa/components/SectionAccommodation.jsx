"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ImageUploadInput from "../../../components/ImageUploadInput";

const langs = ["tr", "en", "de", "ru"];

export default function SectionAccommodation({ data, setData }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const acc = data.accommodation || {};
  const rooms = acc.rooms || [];
  const [activeLang, setActiveLang] = useState("tr");

  /* ---------- Yardımcılar ---------- */
  const setSectionField = (field, lang, value) =>
    setData((prev) => {
      const pa = prev.accommodation || {};
      const pf = pa[field] || {};
      return { ...prev, accommodation: { ...pa, [field]: { ...pf, [lang]: value } } };
    });

  const getSection = useCallback(
    (field) => acc?.[field]?.[activeLang] || "",
    [acc, activeLang]
  );

  const copySectionActiveToOthers = () => {
    const fields = ["subtitle", "title"];
    setData((prev) => {
      const pa = prev.accommodation || {};
      const next = { ...pa };
      for (const f of fields) {
        const base = { ...(pa[f] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => {
          if (lng !== activeLang) base[lng] = val;
        });
        next[f] = base;
      }
      return { ...prev, accommodation: next };
    });
  };

  const clearSectionActive = () => {
    const fields = ["subtitle", "title"];
    setData((prev) => {
      const pa = prev.accommodation || {};
      const next = { ...pa };
      for (const f of fields) next[f] = { ...(pa[f] || {}), [activeLang]: "" };
      return { ...prev, accommodation: next };
    });
  };

  const updateRoom = (index, patch) => {
    const next = [...rooms];
    next[index] = { ...(next[index] || {}), ...patch };
    setData({ ...data, accommodation: { ...acc, rooms: next } });
  };

  const setRoomLangField = (index, field, lang, value) => {
    const r = rooms[index] || {};
    const base = r[field] || {};
    updateRoom(index, { [field]: { ...base, [lang]: value } });
  };

  const copyRoomActiveToOthers = (index) => {
    const r = rooms[index] || {};
    const fields = ["title", "description", "area", "view", "buttonText"];
    const patch = {};
    for (const f of fields) {
      const base = { ...(r[f] || {}) };
      const val = base[activeLang] || "";
      langs.forEach((lng) => {
        if (lng !== activeLang) base[lng] = val;
      });
      patch[f] = base;
    }
    updateRoom(index, patch);
  };

  /* ---------- Oda ekle/sil ---------- */
  const addRoom = () => {
    const emptyRoom = {
      image: "",
      title: { tr: "", en: "", de: "", ru: "" },
      description: { tr: "", en: "", de: "", ru: "" },
      area: { tr: "", en: "", de: "", ru: "" },
      view: { tr: "", en: "", de: "", ru: "" },
      buttonText: { tr: "", en: "", de: "", ru: "" },
      link: "",
    };
    const next = [...rooms, emptyRoom];
    setData({ ...data, accommodation: { ...acc, rooms: next } });
    // yeni karta atla
    setTimeout(() => emblaApi?.scrollTo(next.length - 1), 0);
  };

  const removeRoom = (index) => {
    const next = rooms.filter((_, i) => i !== index);
    setData({ ...data, accommodation: { ...acc, rooms: next } });
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
      {/* Üst şerit: başlık + dil sekmeleri + aksiyonlar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold">🛏️ Odalar Bölümü</h2>

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
            title="Aktif dildeki bölüm başlıklarını diğer dillere kopyala"
          >
            ⇆ Başlıkları Kopyala
          </button>

          <button
            type="button"
            onClick={clearSectionActive}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="Aktif dil alanlarını temizle"
          >
            🧹 Bölüm Alanlarını Temizle
          </button>

          {/* Prev / Next */}
          <button
            type="button"
            onClick={scrollPrev}
            className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
            aria-label="Önceki oda"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
            aria-label="Sonraki oda"
          >
            →
          </button>

          {/* Ekle */}
          <button
            type="button"
            onClick={addRoom}
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            + Oda Ekle
          </button>
        </div>
      </div>

      {/* Bölüm başlıkları (aktif dil) */}
      <div className="bg-gray-50 border rounded-2xl p-4 md:p-5">
        <Field
          label={`Alt Başlık (${activeLang.toUpperCase()})`}
          value={getSection("subtitle")}
          onChange={(v) => setSectionField("subtitle", activeLang, v)}
          placeholder="Örn: Konaklama"
          countRight
        />
        <Field
          label={`Başlık (${activeLang.toUpperCase()})`}
          value={getSection("title")}
          onChange={(v) => setSectionField("title", activeLang, v)}
          placeholder="Örn: Sizin için seçtiğimiz odalar"
          countRight
        />
        <p className="text-xs text-gray-500">
          Başlık önerisi: 40–60 karakter • Alt başlık: 60–100 karakter
        </p>
      </div>

      {/* Oda kartları - Embla viewport */}
      <div className="relative">
        {rooms.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-gray-600">
            Henüz oda eklenmemiş. <button onClick={addRoom} className="underline">
              Oda ekle
            </button>
            .
          </div>
        ) : (
          <>
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-4">
                {rooms.map((room, index) => (
                  <RoomCard
                    key={index}
                    index={index}
                    room={room}
                    activeLang={activeLang}
                    apiUrl={apiUrl}
                    onRemove={() => removeRoom(index)}
                    onChange={(patch) => updateRoom(index, patch)}
                    onSetLangField={(field, value) =>
                      setRoomLangField(index, field, activeLang, value)
                    }
                    onCopyActiveToOthers={() => copyRoomActiveToOthers(index)}
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
                    className={`w-2.5 h-2.5 rounded-full ${
                      i === selectedIndex ? "bg-black" : "bg-gray-300"
                    }`}
                    aria-label={`Oda ${i + 1}`}
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

/* ---------- Oda Kartı ---------- */
function RoomCard({
  index,
  room,
  activeLang,
  apiUrl,
  onRemove,
  onChange,
  onSetLangField,
  onCopyActiveToOthers,
}) {
  const previewSrc = useMemo(() => {
    if (!room?.image) return null;
    return room.image.startsWith("/") ? `${apiUrl}${room.image}` : room.image;
  }, [room?.image, apiUrl]);

  return (
    <div className="shrink-0 basis-[92%] sm:basis-[70%] md:basis-[48%] lg:basis-[32%]">
      <div className="border rounded-xl p-3 bg-gray-50 h-full flex flex-col">
        {/* Başlık + Sil */}
        <div className="flex items-center justify-between mb-3">
          <strong>Oda #{index + 1}</strong>
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

        {/* Görsel */}
        <div className="mb-3">
          <ImageUploadInput
            label="Görsel"
            value={room.image || ""}
            onChange={(url) => onChange({ image: url })}
          />
          {previewSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt={`Oda ${index + 1}`}
              className="w-full h-40 object-cover rounded border mt-2"
            />
          ) : (
            <div className="w-full h-40 rounded border grid place-items-center text-gray-400 bg-white mt-2">
              Önizleme yok
            </div>
          )}
        </div>

        {/* Aktif dil alanları */}
        <Field
          label={`Oda Adı (${activeLang.toUpperCase()})`}
          value={room.title?.[activeLang] || ""}
          onChange={(v) => onSetLangField("title", v)}
          placeholder="Örn: Deluxe Oda"
          countRight
        />

        <Field
          label={`Açıklama (${activeLang.toUpperCase()})`}
          value={room.description?.[activeLang] || ""}
          onChange={(v) => onSetLangField("description", v)}
          placeholder="Kısa tanım…"
          textarea
          rows={2}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label={`Alan (m²) (${activeLang.toUpperCase()})`}
            value={room.area?.[activeLang] || ""}
            onChange={(v) => onSetLangField("area", v)}
            placeholder="30"
          />
          <Field
            label={`Manzara (${activeLang.toUpperCase()})`}
            value={room.view?.[activeLang] || ""}
            onChange={(v) => onSetLangField("view", v)}
            placeholder="Deniz / Bahçe"
          />
        </div>

        <Field
          label={`Buton Metni (${activeLang.toUpperCase()})`}
          value={room.buttonText?.[activeLang] || ""}
          onChange={(v) => onSetLangField("buttonText", v)}
          placeholder="Detaylar"
          countRight
        />

        {/* Link (tek dil) */}
        <Field
          label="Detay Sayfası Linki"
          value={room.link || ""}
          onChange={(v) => onChange({ link: v })}
          placeholder="/odalar/deluxe-oda"
        />

        {/* Mini Önizleme */}
        <div className="mt-4 rounded-lg bg-white border p-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md bg-gray-200 overflow-hidden">
              {previewSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewSrc} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {room.title?.[activeLang] || "Oda adı"}
              </p>
              <p className="text-xs text-gray-600">
                {room.area?.[activeLang] || "—"} · {room.view?.[activeLang] || "—"}
              </p>
            </div>
            <a
              href={room.link || "#"}
              onClick={(e) => e.preventDefault()}
              className="px-2.5 py-1.5 rounded-md bg-black text-white text-xs hover:bg-black/90"
            >
              {room.buttonText?.[activeLang] || "Detaylar"}
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
