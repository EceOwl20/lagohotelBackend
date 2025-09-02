// app/[locale]/panel/sayfalar/kidsclub/components/KidsIconsEdit.jsx
"use client";
import React from "react";

export default function KidsIconsEdit({ data, setData, activeLang = "tr" }) {
  const section = data?.iconsSection || {};
  const ICON_KEYS = ["icon1", "icon2", "icon3", "icon4"];

  const setIconField = (key, value) =>
    setData((prev) => ({
      ...prev,
      iconsSection: {
        ...(prev?.iconsSection || {}),
        [key]: {
          ...((prev?.iconsSection && prev.iconsSection[key]) || {}),
          [activeLang]: value,
        },
      },
    }));

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">⭐ Kids Icons Section</h2>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600">
          Aktif dil: <span className="font-medium">{activeLang.toUpperCase()}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ICON_KEYS.map((key, i) => (
            <div key={key} className="rounded-xl ring-1 ring-black/5 p-3 bg-white">
              <div className="text-xs font-semibold text-gray-500 mb-1">
                İkon {i + 1}
              </div>
              <input
                type="text"
                value={section?.[key]?.[activeLang] || ""}
                onChange={(e) => setIconField(key, e.target.value)}
                placeholder={`İkon ${i + 1} (${activeLang.toUpperCase()})`}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {/* Küçük önizleme/etiket */}
              {!!(section?.[key]?.[activeLang] || "").trim() && (
                <div className="mt-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-gray-700">
                  {section[key][activeLang]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Not/İpucu alanı (opsiyonel) */}
        <div className="text-xs text-gray-500">
          Bu alanlar genelde ikon başlığı/kısa metni içindir. Görsel ikon yükleme
          gerekmiyorsa yalnızca metin yeterlidir.
        </div>
      </div>
    </section>
  );
}
