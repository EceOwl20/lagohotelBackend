// app/[locale]/panel/sayfalar/spa/components/SpaHeaderSectionEdit.jsx
"use client";
import { useMemo } from "react";
import MultiImageUploadInput from "../../../components/MultiImageUploadInput";

export default function SpaHeaderSectionEdit({
  data,
  setData,
  blockName = "spaHeaderSection",
  langs = ["tr", "en", "de", "ru"],
  activeLang = "tr",
}) {
  const value = data?.[blockName] || {};

  const LANG_KEYS = useMemo(
    () => (langs || []).map((l) => (typeof l === "string" ? l : l.key)),
    [langs]
  );

  const update = (updater) =>
    setData((prev) => {
      const current = prev?.[blockName] || {};
      const next = typeof updater === "function" ? updater(current) : updater;
      return { ...(prev || {}), [blockName]: { ...current, ...next } };
    });

  const setField = (field, val) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: val },
    }));

  const handleImagesChange = (imagesArr) => {
    // MultiImageUploadInput'tan gelen final dizi
    update({ images: imagesArr });
  };

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🧖 Spa Header Section</h2>
      </div>

      <div className="p-4 space-y-8">
        {/* Metinler (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Metinler ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldText
              label="Alt Başlık"
              value={value?.subtitle?.[activeLang] || ""}
              onChange={(v) => setField("subtitle", v)}
            />
            <FieldText
              label="Başlık"
              value={value?.title?.[activeLang] || ""}
              onChange={(v) => setField("title", v)}
            />
            <FieldArea
              label="Açıklama"
              rows={2}
              value={value?.text?.[activeLang] || ""}
              onChange={(v) => setField("text", v)}
            />
          </div>
        </div>

        {/* Galeri – MultiImageUploadInput (değişmeden) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">Galeri Görselleri</h3>
          <MultiImageUploadInput
            value={value.images || []}
            onChange={handleImagesChange}
            label="Galeri Görselleri"
          />
          {/* not: MultiImageUploadInput yükleme/silme/sıralama işlerini kendi içinde halleder */}
        </div>
      </div>
    </section>
  );
}

/* Küçük input bileşenleri */
function FieldText({ label, value, onChange }) {
  return (
    <div>
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
    <div>
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