// app/[locale]/panel/sayfalar/connect/components/Connect2Edit.jsx
"use client";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function Connect2Edit({
  data,
  setData,
  activeLang = "tr", // TopBar'dan gelen aktif dil
}) {
  const section = data?.connect2 || {};

  /* ---------------- helpers (immutable updates) ---------------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.connect2 || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), connect2: { ...cur, ...next } };
    });

  // Çok dilli alan: sadece aktif dil
  const setField = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  // Görsel
  const setImage = (url) => update({ image: url });

  /* ------------------------------ UI ------------------------------ */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">📝 Bölüm 2 — İletişim Formu</h2>
      </div>

      <div className="p-4 space-y-8">
        {/* Form arka plan görseli */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-3">Form Arka Plan Görseli</h3>
          <ImageUploadInput
            value={section?.image || ""}
            onChange={setImage}
            label="Görsel Yükle"
          />
        </div>

        {/* Form metinleri (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Form Metinleri ({activeLang.toUpperCase()})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldText
              label="Form Başlığı"
              value={section?.formTitle?.[activeLang] || ""}
              onChange={(v) => setField("formTitle", v)}
            />
            <FieldText
              label="İsim Etiketi"
              value={section?.nameLabel?.[activeLang] || ""}
              onChange={(v) => setField("nameLabel", v)}
            />
            <FieldText
              label="E-posta Etiketi"
              value={section?.emailLabel?.[activeLang] || ""}
              onChange={(v) => setField("emailLabel", v)}
            />
            <FieldText
              label="Mesaj Alanı Etiketi"
              value={section?.message?.[activeLang] || ""}
              onChange={(v) => setField("message", v)}
            />
            <FieldText
              label="Buton Metni"
              value={section?.buttonText?.[activeLang] || ""}
              onChange={(v) => setField("buttonText", v)}
            />
            <FieldArea
              label="Form Açıklaması"
              rows={3}
              value={section?.formText?.[activeLang] || ""}
              onChange={(v) => setField("formText", v)}
            />
            <FieldArea
              label="Gizlilik Politikası Metni"
              rows={3}
              value={section?.policyText?.[activeLang] || ""}
              onChange={(v) => setField("policyText", v)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- küçük input bileşenleri ---------------- */
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
    <div className="md:col-span-3">
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