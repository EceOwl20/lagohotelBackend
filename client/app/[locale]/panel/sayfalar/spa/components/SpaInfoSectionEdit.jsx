// app/[locale]/panel/sayfalar/spa/components/SpaInfoSectionEdit.jsx
"use client";
import { useMemo } from "react";
import MultiImageUploadInput from "../../../components/MultiImageUploadInput";

export default function SpaInfoSectionEdit({
  data,
  setData,
  blockName = "SpaInfoSection",
  activeLang = "tr",
  langs = ["tr", "en", "de", "ru"], // string veya {key,label}
}) {
  const section = data?.[blockName] || {};

  /* ------------ helpers (immutable updates) ------------ */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.[blockName] || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), [blockName]: { ...cur, ...next } };
    });

  // Genel alan: subtitle/title/text -> aktif dil
  const setField = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  // Overlay alanları (left/right) -> aktif dil
  const setOverlayField = (side, field, value) =>
    update((cur) => ({
      [side]: {
        ...(cur?.[side] || {}),
        [field]: {
          ...((cur?.[side] && cur[side][field]) || {}),
          [activeLang]: value,
        },
      },
    }));

  // Sağ overlay listeleri
  const lists = Array.isArray(section?.right?.lists) ? section.right.lists : [];
  const addList = () =>
    update((cur) => ({
      right: {
        ...(cur?.right || {}),
        lists: [...(cur?.right?.lists || []), { [activeLang]: "" }],
      },
    }));

  const removeList = (i) =>
    update((cur) => ({
      right: {
        ...(cur?.right || {}),
        lists: (cur?.right?.lists || []).filter((_, idx) => idx !== i),
      },
    }));

  const setListItem = (i, value) =>
    update((cur) => {
      const next = [...(cur?.right?.lists || [])];
      next[i] = { ...(next[i] || {}), [activeLang]: value };
      return { right: { ...(cur?.right || {}), lists: next } };
    });

  /* ---------- MultiImageUploadInput ile img1 & img2 ---------- */
  // MultiImageUploadInput’a boş string göndermemek için filtrele
  const imagesValue = useMemo(
    () => [section?.img1, section?.img2].filter(Boolean),
    [section?.img1, section?.img2]
  );

  const handleImagesChange = (arr = []) => {
    // Sadece ilk iki görseli kullan
    const [img1, img2] = arr.filter(Boolean);
    update({ img1: img1 || "", img2: img2 || "" });
  };

  /* -------------------- UI -------------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">💆 Spa Info Section</h2>
      </div>

      <div className="p-4 space-y-8">
        {/* Arka plan görselleri (Sol / Sağ) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Arka Plan Görselleri</h3>
            <span className="text-xs text-gray-500">
              #1 = Sol Görsel, #2 = Sağ Görsel (sırayı galeriden ayarlayın)
            </span>
          </div>

          <MultiImageUploadInput
            value={imagesValue}            
            onChange={handleImagesChange}
            label="Sol & Sağ Görseller"
          />
        </div>

        {/* Genel metinler (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Genel Metinler ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldText
              label="Alt Başlık"
              value={section?.subtitle?.[activeLang] || ""}
              onChange={(v) => setField("subtitle", v)}
            />
            <FieldText
              label="Başlık"
              value={section?.title?.[activeLang] || ""}
              onChange={(v) => setField("title", v)}
            />
            <FieldArea
              label="Açıklama"
              rows={2}
              value={section?.text?.[activeLang] || ""}
              onChange={(v) => setField("text", v)}
            />
          </div>
        </div>

        {/* Sol overlay */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Sol Görsel Üstü Metinler ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldText
              label="Alt Başlık"
              value={section?.left?.subtitle?.[activeLang] || ""}
              onChange={(v) => setOverlayField("left", "subtitle", v)}
            />
            <FieldText
              label="Başlık"
              value={section?.left?.title?.[activeLang] || ""}
              onChange={(v) => setOverlayField("left", "title", v)}
            />
            <FieldText
              label="Metin"
              value={section?.left?.text?.[activeLang] || ""}
              onChange={(v) => setOverlayField("left", "text", v)}
            />
          </div>
        </div>

        {/* Sağ overlay + listeler */}
        <div className="rounded-xl ring-1 ring-black/5 p-4 space-y-6">
          <h3 className="font-semibold">
            Sağ Görsel Üstü Metinler ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldText
              label="Alt Başlık"
              value={section?.right?.subtitle?.[activeLang] || ""}
              onChange={(v) => setOverlayField("right", "subtitle", v)}
            />
            <FieldText
              label="Başlık"
              value={section?.right?.title?.[activeLang] || ""}
              onChange={(v) => setOverlayField("right", "title", v)}
            />
            <FieldText
              label="Metin"
              value={section?.right?.text?.[activeLang] || ""}
              onChange={(v) => setOverlayField("right", "text", v)}
            />
          </div>

          {/* Dinamik liste (aktif dil) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Listeler ({activeLang.toUpperCase()})</h4>
              <button
                type="button"
                onClick={addList}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
              >
                + Madde Ekle
              </button>
            </div>

            {lists.map((item, i) => (
              <div
                key={i}
                className="rounded-lg ring-1 ring-black/10 p-3 flex gap-3 items-start bg-white"
              >
                <span className="shrink-0 w-6 text-center font-medium mt-2">
                  {i + 1}.
                </span>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder={`Madde (${activeLang.toUpperCase()})`}
                  value={item?.[activeLang] || ""}
                  onChange={(e) => setListItem(i, e.target.value)}
                />
                <button
                  type="button"
                  className="shrink-0 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                  onClick={() => removeList(i)}
                >
                  Sil
                </button>
              </div>
            ))}

            {lists.length === 0 && (
              <p className="text-sm text-gray-500">
                Henüz madde yok. “+ Madde Ekle” ile başlayın.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------- küçük input bileşenleri --------- */
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