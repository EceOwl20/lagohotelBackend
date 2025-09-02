"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const DIL_ADLARI = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function KidspoolEdit({
  data,
  setData,
  langs = ["tr", "en", "de", "ru"],
  blockName = "kidspool",
  activeLang: controlledLang, // üst seviyeden dil yönetmek istersen
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const sections = data?.[blockName] || [];

  const [activeLang, setActiveLang] = useState(controlledLang || langs[0] || "tr");
  useEffect(() => {
    if (controlledLang) setActiveLang(controlledLang);
  }, [controlledLang]);

  const [uploading, setUploading] = useState({}); // { "secIdx-itemIdx": true }

  /* ----------------- Data helpers ----------------- */
  const updateData = (updater) => setData((prev) => updater(structuredClone(prev || {})));

  const addSection = () =>
    updateData((prev) => {
      const emptySection = {
        subtitle: langs.reduce((o, l) => ((o[l] = ""), o), {}),
        title: langs.reduce((o, l) => ((o[l] = ""), o), {}),
        text: langs.reduce((o, l) => ((o[l] = ""), o), {}),
        carouselItem: [],
      };
      prev[blockName] = [...(prev[blockName] || []), emptySection];
      return prev;
    });

  const removeSection = (secIdx) =>
    updateData((prev) => {
      prev[blockName] = (prev[blockName] || []).filter((_, i) => i !== secIdx);
      return prev;
    });

  const addItem = (secIdx) =>
    updateData((prev) => {
      const emptyItem = {
        image: "",
        subtitle: langs.reduce((o, l) => ((o[l] = ""), o), {}),
        title: langs.reduce((o, l) => ((o[l] = ""), o), {}),
        text: langs.reduce((o, l) => ((o[l] = ""), o), {}),
        buttonText: langs.reduce((o, l) => ((o[l] = ""), o), {}),
        link: langs.reduce((o, l) => ((o[l] = ""), o), {}),
      };
      prev[blockName][secIdx].carouselItem = [
        ...(prev[blockName][secIdx].carouselItem || []),
        emptyItem,
      ];
      return prev;
    });

  const removeItem = (secIdx, itemIdx) =>
    updateData((prev) => {
      const items = prev[blockName][secIdx].carouselItem || [];
      prev[blockName][secIdx].carouselItem = items.filter((_, i) => i !== itemIdx);
      return prev;
    });

  const setSectionLangField = (secIdx, field, value) =>
    updateData((prev) => {
      const obj = prev[blockName][secIdx][field] || {};
      obj[activeLang] = value;
      prev[blockName][secIdx][field] = obj;
      return prev;
    });

  const setItemLangField = (secIdx, itemIdx, field, value) =>
    updateData((prev) => {
      const obj = prev[blockName][secIdx].carouselItem[itemIdx][field] || {};
      obj[activeLang] = value;
      prev[blockName][secIdx].carouselItem[itemIdx][field] = obj;
      return prev;
    });

  const setItemImage = (secIdx, itemIdx, url) =>
    updateData((prev) => {
      prev[blockName][secIdx].carouselItem[itemIdx].image = url;
      return prev;
    });

  const copySectionActiveToOthers = (secIdx) =>
    updateData((prev) => {
      const sec = prev[blockName][secIdx];
      ["subtitle", "title", "text"].forEach((k) => {
        const base = { ...(sec[k] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => (base[lng] = val));
        sec[k] = base;
      });
      // tüm item alanları için de uygula
      (sec.carouselItem || []).forEach((it) => {
        ["subtitle", "title", "text", "buttonText", "link"].forEach((k) => {
          const base = { ...(it[k] || {}) };
          const val = base[activeLang] || "";
          langs.forEach((lng) => (base[lng] = val));
          it[k] = base;
        });
      });
      return prev;
    });

  const clearSectionActive = (secIdx) =>
    updateData((prev) => {
      const sec = prev[blockName][secIdx];
      ["subtitle", "title", "text"].forEach((k) => {
        const base = { ...(sec[k] || {}) };
        base[activeLang] = "";
        sec[k] = base;
      });
      (sec.carouselItem || []).forEach((it) => {
        ["subtitle", "title", "text", "buttonText", "link"].forEach((k) => {
          const base = { ...(it[k] || {}) };
          base[activeLang] = "";
          it[k] = base;
        });
      });
      return prev;
    });

  const copyItemActiveToOthers = (secIdx, itemIdx) =>
    updateData((prev) => {
      const it = prev[blockName][secIdx].carouselItem[itemIdx];
      ["subtitle", "title", "text", "buttonText", "link"].forEach((k) => {
        const base = { ...(it[k] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => (base[lng] = val));
        it[k] = base;
      });
      return prev;
    });

  /* ----------------- Upload ----------------- */
  const handleImageUpload = async (secIdx, itemIdx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const key = `${secIdx}-${itemIdx}`;
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const url = result.imageUrl || result.path || result.url;
      setItemImage(secIdx, itemIdx, url);
    } catch (err) {
      alert("Yükleme hatası: " + (err?.message || "Bilinmeyen hata"));
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
      e.target.value = "";
    }
  };

  return (
    <section className="space-y-4">
      {/* Üst başlık + dil sekmeleri + aksiyonlar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-bold text-xl">🫧 Kids Pool Bölümleri</h3>
        <div className="flex items-center gap-2">
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
            onClick={addSection}
            className="rounded-md bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5"
          >
            + Bölüm
          </button>
        </div>
      </div>

      {/* Bölümler */}
      {(sections || []).map((sec, secIdx) => (
        <div key={secIdx} className="border rounded-2xl bg-white p-4 md:p-6 space-y-6">
          {/* Bölüm üst bar */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white text-sm">
                {secIdx + 1}
              </span>
              <p className="font-semibold">Bölüm ({activeLang.toUpperCase()})</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copySectionActiveToOthers(secIdx)}
                className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
              >
                ⇆ Tümünü Kopyala
              </button>
              <button
                type="button"
                onClick={() => clearSectionActive(secIdx)}
                className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
              >
                🧹 Temizle
              </button>
              <button
                type="button"
                onClick={() => removeSection(secIdx)}
                className="px-3 py-1.5 rounded-lg border hover:bg-red-50 transition text-sm text-red-600"
              >
                Sil
              </button>
            </div>
          </div>

          {/* Bölüm metinleri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Alt Başlık"
              value={sec?.subtitle?.[activeLang] || ""}
              onChange={(v) => setSectionLangField(secIdx, "subtitle", v)}
              placeholder={`Alt başlık (${DIL_ADLARI[activeLang]})`}
              countRight
            />
            <Field
              label="Başlık"
              value={sec?.title?.[activeLang] || ""}
              onChange={(v) => setSectionLangField(secIdx, "title", v)}
              placeholder={`Başlık (${DIL_ADLARI[activeLang]})`}
              countRight
            />
            <Field
              label="Açıklama"
              textarea
              rows={3}
              value={sec?.text?.[activeLang] || ""}
              onChange={(v) => setSectionLangField(secIdx, "text", v)}
              placeholder={`Açıklama (${DIL_ADLARI[activeLang]})`}
            />
          </div>

          {/* Carousel: item editörleri yatay */}
          <SectionItemsCarousel
            apiUrl={apiUrl}
            sec={sec}
            secIdx={secIdx}
            langs={langs}
            activeLang={activeLang}
            uploading={uploading}
            onUploadImage={handleImageUpload}
            onAddItem={() => addItem(secIdx)}
            onRemoveItem={(itemIdx) => removeItem(secIdx, itemIdx)}
            onCopyItemActiveToOthers={(itemIdx) => copyItemActiveToOthers(secIdx, itemIdx)}
            onChangeItemField={(itemIdx, field, value) => setItemLangField(secIdx, itemIdx, field, value)}
            onChangeItemImageUrl={(itemIdx, url) => setItemImage(secIdx, itemIdx, url)}
          />
        </div>
      ))}

      {(!sections || sections.length === 0) && (
        <div className="rounded-xl border border-dashed p-6 text-center text-gray-600">
          Henüz bölüm yok. <button onClick={addSection} className="underline">Bölüm ekle</button>.
        </div>
      )}
    </section>
  );
}

/* ----------------- Subcomponents ----------------- */

function SectionItemsCarousel({
  apiUrl,
  sec,
  secIdx,
  activeLang,
  uploading,
  onUploadImage,
  onAddItem,
  onRemoveItem,
  onCopyItemActiveToOthers,
  onChangeItemField,
  onChangeItemImageUrl,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });
  const items = sec?.carouselItem || [];

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    // yeni item eklendiğinde sona kay
    if (emblaApi) emblaApi.scrollTo(items.length - 1);
  }, [items.length, emblaApi]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Carousel Öğeleri ({items.length})</h4>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            disabled={!canPrev}
            className={`px-3 py-1.5 rounded-lg border text-sm ${canPrev ? "hover:bg-gray-50" : "opacity-50"}`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => emblaApi && emblaApi.scrollNext()}
            disabled={!canNext}
            className={`px-3 py-1.5 rounded-lg border text-sm ${canNext ? "hover:bg-gray-50" : "opacity-50"}`}
          >
            →
          </button>
          <button
            type="button"
            onClick={onAddItem}
            className="rounded-md bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5"
          >
            + Öğe
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {items.map((item, itemIdx) => {
            const key = `${secIdx}-${itemIdx}`;
            const img = item.image ? (item.image.startsWith("/") ? `${apiUrl}${item.image}` : item.image) : "";

            return (
              <div key={itemIdx} className="min-w-[88%] sm:min-w-[520px] md:min-w-[560px] max-w-[680px]">
                <div className="rounded-2xl border bg-white p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Öğe #{itemIdx + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onCopyItemActiveToOthers(itemIdx)}
                        className="text-xs rounded-md border px-2 py-1 hover:bg-gray-50"
                        title="Bu öğenin aktif dilini tüm dillere kopyala"
                      >
                        ⇆ Kopyala
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(itemIdx)}
                        className="text-xs rounded-md border px-2 py-1 hover:bg-red-50 text-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Görsel</h5>
                    <div className="relative h-40 rounded-lg border overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {img ? (
                        <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center text-gray-400">Görsel yok</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/10 pointer-events-none" />
                      <label className="absolute inset-x-0 bottom-0 p-2 flex justify-end">
                        <span className="rounded-md bg-black/60 text-white text-xs px-3 py-1.5 backdrop-blur cursor-pointer hover:bg-black/70">
                          {uploading[key] ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                              Yükleniyor…
                            </span>
                          ) : (
                            "Görseli Değiştir"
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onUploadImage(secIdx, itemIdx, e)}
                            disabled={uploading[key]}
                          />
                        </span>
                      </label>
                    </div>
                    <input
                      type="text"
                      value={item.image || ""}
                      onChange={(e) => onChangeItemImageUrl(itemIdx, e.target.value)}
                      placeholder="/uploads/… veya https://…"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
                    />
                  </div>

                  {/* Fields (aktif dil) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field
                      label={`Alt Başlık (${activeLang.toUpperCase()})`}
                      value={item?.subtitle?.[activeLang] || ""}
                      onChange={(v) => onChangeItemField(itemIdx, "subtitle", v)}
                      countRight
                    />
                    <Field
                      label={`Başlık (${activeLang.toUpperCase()})`}
                      value={item?.title?.[activeLang] || ""}
                      onChange={(v) => onChangeItemField(itemIdx, "title", v)}
                      countRight
                    />
                  </div>
                  <Field
                    label={`Açıklama (${activeLang.toUpperCase()})`}
                    textarea
                    rows={3}
                    value={item?.text?.[activeLang] || ""}
                    onChange={(v) => onChangeItemField(itemIdx, "text", v)}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field
                      label={`Buton Metni (${activeLang.toUpperCase()})`}
                      value={item?.buttonText?.[activeLang] || ""}
                      onChange={(v) => onChangeItemField(itemIdx, "buttonText", v)}
                      placeholder="Keşfet"
                    />
                    <Field
                      label={`Buton Link (${activeLang.toUpperCase()})`}
                      value={item?.link?.[activeLang] || ""}
                      onChange={(v) => onChangeItemField(itemIdx, "link", v)}
                      placeholder="/kids/pool/detay"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {items.map((_, i) => (
            <span key={i} className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, textarea = false, rows = 3, countRight = false }) {
  const len = (value || "").length;
  return (
    <div>
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
