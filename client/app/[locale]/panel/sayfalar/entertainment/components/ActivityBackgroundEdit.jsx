// app/[locale]/panel/sayfalar/entertainment/components/ActivityBackgroundEdit.jsx
"use client";

import MultiImageUploadInput from "../../../components/MultiImageUploadInput";

export default function ActivityBackgroundEdit({
  data,
  setData,
  activeLang = "tr", // TopBar’dan gelen aktif dil ile uyumlu
}) {
  const section = data?.activityBackground || {};

  /* ---------------- helpers (immutable updates) ---------------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.activityBackground || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), activityBackground: { ...cur, ...next } };
    });

  // Genel alanlar: subtitle/title/text/span -> sadece aktif dil
  const setGeneral = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  // Galeri görselleri (MultiImageUploadInput — dokunma)
  const setImages = (images) => update({ images });

  /* ------------------------- UI ------------------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🖼️ Galeri & Arka Plan</h2>
      </div>

      <div className="p-4 space-y-8">
        {/* Genel metinler (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Genel Metinler ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldText
              label="Alt Başlık"
              value={section?.subtitle?.[activeLang] || ""}
              onChange={(v) => setGeneral("subtitle", v)}
            />
            <FieldText
              label="Başlık"
              value={section?.title?.[activeLang] || ""}
              onChange={(v) => setGeneral("title", v)}
            />
            <FieldArea
              label="Açıklama"
              rows={3}
              value={section?.text?.[activeLang] || ""}
              onChange={(v) => setGeneral("text", v)}
            />
            <FieldText
              label="Ek Bilgi (span)"
              value={section?.span?.[activeLang] || ""}
              onChange={(v) => setGeneral("span", v)}
            />
          </div>
        </div>

        {/* Galeri (MultiImageUploadInput) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-3">Galeri Görselleri</h3>
          <MultiImageUploadInput
            value={section?.images || []}
            onChange={setImages}
            label="Galeri Görselleri"
          />
          {Array.isArray(section?.images) && section.images.length > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              Toplam {section.images.length} görsel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------- küçük input bileşenleri ------------- */
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