// app/[locale]/panel/sayfalar/spa/components/SpaReverseEdit.jsx
"use client";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function SpaReverseEdit({
  data,
  setData,
  blockName = "spaReverse",
  activeLang = "tr",
}) {
  const section = data?.[blockName] || {};
  const LBL = activeLang.toUpperCase();

  /* ---------- helpers (immutable updates) ---------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.[blockName] || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), [blockName]: { ...cur, ...next } };
    });

  const setI18n = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  const setBool = (field, checked) => update({ [field]: !!checked });

  /* -------------------- UI -------------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h2 className="text-lg font-semibold">🧖 Spa Reverse Bölümü</h2>
        <span className="text-xs px-2 py-1 rounded bg-black text-white">
          Aktif Dil: {LBL}
        </span>
      </div>

      <div className="p-4 space-y-8">
        {/* Görsel + Ayarlar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sol: Görsel */}
          <div>
            <label className="block text-sm font-medium mb-2">Görsel</label>
            <ImageUploadInput
              value={section?.img || ""}
              onChange={(url) => update({ img: url })}
            />
          </div>

          {/* Sağ: Boolean / Link */}
          <div className="rounded-xl ring-1 ring-black/5 p-4 h-fit space-y-4">
            <h3 className="font-semibold">Ayarlar</h3>

            <label className="inline-flex items-center gap-3">
              <input
                type="checkbox"
                className="accent-black"
                checked={!!section?.isImageLeft}
                onChange={(e) => setBool("isImageLeft", e.target.checked)}
              />
              Resmi solda göster
            </label>

            <label className="inline-flex items-center gap-3">
              <input
                type="checkbox"
                className="accent-black"
                checked={!!section?.showLink}
                onChange={(e) => setBool("showLink", e.target.checked)}
              />
              Link göster
            </label>

            <div>
              <label className="block text-sm font-medium mb-1">Link URL</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={section?.linkUrl || ""}
                onChange={(e) => update({ linkUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Metinler (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4 space-y-4">
          <h3 className="font-semibold">Metinler ({LBL})</h3>

          <FieldText
            label={`Alt Başlık (${LBL})`}
            value={section?.span?.[activeLang] || ""}
            onChange={(v) => setI18n("span", v)}
          />

          <FieldText
            label={`Başlık (${LBL})`}
            value={section?.header?.[activeLang] || ""}
            onChange={(v) => setI18n("header", v)}
          />

          <FieldArea
            label={`Açıklama (${LBL})`}
            rows={3}
            value={section?.text?.[activeLang] || ""}
            onChange={(v) => setI18n("text", v)}
          />

          <FieldText
            label={`Buton Metni (${LBL})`}
            value={section?.buttonText?.[activeLang] || ""}
            onChange={(v) => setI18n("buttonText", v)}
          />

          <p className="text-xs text-gray-500">
            Diğer dilleri düzenlemek için TopBar’dan dili değiştirin.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---- küçük input bileşenleri ---- */
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