// app/[locale]/panel/sayfalar/rooms/components/BackgroundSectionEdit.jsx
"use client";

import { useMemo } from "react";
import ImageUploadInput from "../../../../components/ImageUploadInput";

export default function BackgroundSectionEdit({
  data,
  setData,
  langs = ["tr", "en", "de", "ru"],
  activeLang = "tr",
}) {
  const section = data?.background || {};

  /* --------------- helpers --------------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.background || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), background: { ...cur, ...next } };
    });

  const LANG_KEYS = useMemo(
    () => (langs || []).map((l) => (typeof l === "string" ? l : l.key)),
    [langs]
  );

  // subtitle / title -> sadece aktif dil
  const setLangField = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  // texts (paragraflar) -> sadece aktif dil
  const texts = Array.isArray(section?.texts) ? section.texts : [];
  const ensureRow = (arr, i) => {
    const next = [...arr];
    while (next.length <= i) next.push({});
    return next;
  };

  const setTextRow = (idx, value) =>
    update((cur) => {
      const list = ensureRow(cur?.texts || [], idx);
      const row = { ...(list[idx] || {}) };
      row[activeLang] = value;
      list[idx] = row;
      return { texts: list };
    });

  const addTextRow = () =>
    update((cur) => ({
      texts: [...(cur?.texts || []), {}],
    }));

  const removeTextRow = (idx) =>
    update((cur) => ({
      texts: (cur?.texts || []).filter((_, i) => i !== idx),
    }));

  // tekil alanlar
  const setImage = (url) => update({ image: url });
  const setLink = (url) => update({ link: url });

  /* --------------- UI --------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🌄 Background Section</h2>
      </div>

      <div className="p-4 space-y-8">
        {/* Görsel */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-3">Arka Plan Görseli</h3>
          <ImageUploadInput
            value={section?.image || ""}
            onChange={setImage}
            label="Görsel Yükle"
          />
          {!!section?.image && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setImage("")}
                className="px-3 py-1.5 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
              >
                Görseli Kaldır
              </button>
            </div>
          )}
        </div>

        {/* Başlıklar (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Başlıklar ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldText
              label="Alt Başlık (subtitle)"
              value={section?.subtitle?.[activeLang] || ""}
              onChange={(v) => setLangField("subtitle", v)}
            />
            <FieldText
              label="Başlık (title)"
              value={section?.title?.[activeLang] || ""}
              onChange={(v) => setLangField("title", v)}
            />
          </div>
        </div>

        {/* Paragraflar (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Açıklama Paragrafları ({activeLang.toUpperCase()})
            </h3>
            <button
              type="button"
              onClick={addTextRow}
              className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              + Paragraf Ekle
            </button>
          </div>

          {(texts.length ? texts : [{}]).map((row, i) => (
            <div
              key={i}
              className="rounded-lg ring-1 ring-black/10 p-3 bg-white flex gap-3 items-start"
            >
              <span className="shrink-0 w-6 text-center font-medium mt-2">
                {i + 1}.
              </span>
              <textarea
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder={`Paragraf ${i + 1} (${activeLang.toUpperCase()})`}
                value={row?.[activeLang] || ""}
                onChange={(e) => setTextRow(i, e.target.value)}
              />
              {texts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTextRow(i)}
                  className="shrink-0 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                  aria-label={`Paragraf ${i + 1} sil`}
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Link */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-3">Link</h3>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://…"
            value={section?.link || ""}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

/* ---- küçük input bileşeni ---- */
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