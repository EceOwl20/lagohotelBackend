"use client";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function ActivitiesSectionEdit({
  data,
  setData,
  activeLang = "tr", // TopBar’dan gelen aktif dil (spa sayfalarındaki gibi)
}) {
  const section = data?.activitiesSection || {};

  /* ---------------- helpers (immutable updates) ---------------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.activitiesSection || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), activitiesSection: { ...cur, ...next } };
    });

  // Genel alanlar: subtitle / title / text -> sadece aktif dil
  const setField = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  // Info1 & Info2: title / text -> sadece aktif dil
  const setInfoField = (infoKey, field, value) =>
    update((cur) => ({
      [infoKey]: {
        ...(cur?.[infoKey] || {}),
        [field]: {
          ...((cur?.[infoKey] && cur[infoKey][field]) || {}),
          [activeLang]: value,
        },
      },
    }));

  // Görseller
  const setImage = (field, url) => update({ [field]: url });

  /* ------------------------- UI ------------------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🎭 Aktiviteler Bölümü</h2>
      </div>

      <div className="p-4 space-y-8">
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

        {/* Görseller */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">Görseller</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["image1", "image2"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium">
                  {field.toUpperCase()}
                </label>
                <ImageUploadInput
                  value={section?.[field] || ""}
                  onChange={(url) => setImage(field, url)}
                  label={field}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info 1 */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Bilgi 1 ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldText
              label="Başlık"
              value={section?.info1?.title?.[activeLang] || ""}
              onChange={(v) => setInfoField("info1", "title", v)}
            />
            <FieldArea
              label="Metin"
              rows={3}
              value={section?.info1?.text?.[activeLang] || ""}
              onChange={(v) => setInfoField("info1", "text", v)}
            />
          </div>
        </div>

        {/* Info 2 */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Bilgi 2 ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldText
              label="Başlık"
              value={section?.info2?.title?.[activeLang] || ""}
              onChange={(v) => setInfoField("info2", "title", v)}
            />
            <FieldArea
              label="Metin"
              rows={3}
              value={section?.info2?.text?.[activeLang] || ""}
              onChange={(v) => setInfoField("info2", "text", v)}
            />
          </div>
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