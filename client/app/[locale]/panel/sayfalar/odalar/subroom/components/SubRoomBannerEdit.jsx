// app/[locale]/panel/sayfalar/rooms/components/SubRoomBannerEdit.jsx
"use client";

import { useMemo } from "react";
import ImageUploadInput from "../../../../components/ImageUploadInput";

export default function SubRoomBannerEdit({
  data,
  setData,
  activeLang = "tr",                 // ✅ TopBar’dan gelen aktif dil
  langs = ["tr", "en", "de", "ru"], // string veya {key,label}
}) {
  const banner = data?.banner || {};

  // lang keylerini normalize et
  const LANG_KEYS = useMemo(
    () => (langs || []).map((l) => (typeof l === "string" ? l : l.key)),
    [langs]
  );

  // immutable update helper
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.banner || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), banner: { ...cur, ...next } };
    });

  // texts için boş satır şablonu
  const emptyLangsRow = useMemo(
    () => LANG_KEYS.reduce((acc, k) => ({ ...acc, [k]: "" }), {}),
    [LANG_KEYS]
  );

  // texts güvenli dizi
  const texts =
    Array.isArray(banner?.texts) && banner.texts.length > 0
      ? banner.texts
      : [emptyLangsRow];

  /* --------- alan setter’ları (aktif dil) --------- */
  const setTitle = (value) =>
    update((cur) => ({
      title: { ...(cur?.title || {}), [activeLang]: value },
    }));

  const setSubtitle = (value) =>
    update((cur) => ({
      subtitle: { ...(cur?.subtitle || {}), [activeLang]: value },
    }));

  // texts[i][activeLang]
  const setTextRow = (idx, value) =>
    update((cur) => {
      const list = Array.isArray(cur?.texts) ? [...cur.texts] : [emptyLangsRow];
      const row = { ...(list[idx] || emptyLangsRow) };
      row[activeLang] = value;
      list[idx] = row;
      return { texts: list };
    });

  const addTextRow = () =>
    update((cur) => ({
      texts: [...(cur?.texts || []), emptyLangsRow],
    }));

  const removeTextRow = (idx) =>
    update((cur) => ({
      texts: (cur?.texts || []).filter((_, i) => i !== idx),
    }));

  // baby checkbox
  const toggleBaby = (checked) => update({ baby: !!checked });

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h2 className="text-lg font-semibold">🪧 Oda Banner</h2>
        <span className="text-xs text-gray-500">
          Aktif Dil: <strong>{activeLang.toUpperCase()}</strong>
        </span>
      </div>

      <div className="p-4 space-y-8">
        {/* Görsel */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-3">Banner Görseli</h3>
          <ImageUploadInput
            value={banner?.image || ""}
            onChange={(url) => update({ image: url })}
            label="Görsel Yükle"
          />
          {banner?.image && (
            <div className="mt-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                onClick={() => update({ image: "" })}
              >
                Görseli Kaldır
              </button>
            </div>
          )}
        </div>

        {/* Başlıklar (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-3">
            Başlıklar ({activeLang.toUpperCase()})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Başlık (title)</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder={`Title (${activeLang.toUpperCase()})`}
                value={banner?.title?.[activeLang] || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Alt Başlık (subtitle)
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder={`Subtitle (${activeLang.toUpperCase()})`}
                value={banner?.subtitle?.[activeLang] || ""}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Açıklama metinleri listesi (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Açıklama Metinleri ({activeLang.toUpperCase()})
            </h3>
            <button
              type="button"
              onClick={addTextRow}
              className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              + Metin Satırı Ekle
            </button>
          </div>

          {texts.map((row, idx) => (
            <div
              key={idx}
              className="rounded-lg ring-1 ring-black/10 p-3 bg-white space-y-2"
            >
              <div className="flex items-center justify-between">
                <strong>Satır #{idx + 1}</strong>
                {texts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTextRow(idx)}
                    className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
                  >
                    Sil
                  </button>
                )}
              </div>

              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder={`Text (${activeLang.toUpperCase()})`}
                value={row?.[activeLang] || ""}
                onChange={(e) => setTextRow(idx, e.target.value)}
              />
            </div>
          ))}

          {texts.length === 0 && (
            <p className="text-sm text-gray-500">
              Henüz metin yok. “+ Metin Satırı Ekle” ile başlayın.
            </p>
          )}
        </div>

        {/* Baby checkbox */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!banner?.baby}
              onChange={(e) => toggleBaby(e.target.checked)}
            />
            <span className="text-sm">Bebekli Oda mı?</span>
          </label>
        </div>
      </div>
    </section>
  );
}