// app/[locale]/panel/sayfalar/connect/components/Connect1Edit.jsx
"use client";
import ImageUploadInput from "../../../components/ImageUploadInput";
import { useMemo } from "react";

export default function Connect1Edit({
  data,
  setData,
  activeLang = "tr", // TopBar'dan gelen aktif dil
}) {
  const section = data?.connect1 || {};

  /* ---------------- helpers (immutable updates) ---------------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.connect1 || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), connect1: { ...cur, ...next } };
    });

  // Çok dilli alanlar: subtitle / title / addressLabel / address / phoneLabel / emailLabel
  const setField = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  // Görsel
  const setImage = (url) => update({ image: url });

  // Dizi alanları (telefonlar / e-postalar)
  const phones = useMemo(() => Array.isArray(section?.phones) ? section.phones : [], [section?.phones]);
  const emails = useMemo(() => Array.isArray(section?.emails) ? section.emails : [], [section?.emails]);

  const addItem = (field) =>
    update((cur) => ({ [field]: [...(cur?.[field] || []), ""] }));

  const removeItem = (field, idx) =>
    update((cur) => ({ [field]: (cur?.[field] || []).filter((_, i) => i !== idx) }));

  const setItem = (field, idx, value) =>
    update((cur) => {
      const list = [...(cur?.[field] || [])];
      list[idx] = value;
      return { [field]: list };
    });

  /* ------------------------------ UI ------------------------------ */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">📮 Connect 1</h2>
      </div>

      <div className="p-4 space-y-8">
        {/* Görsel */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-3">Görsel</h3>
          <ImageUploadInput value={section?.image || ""} onChange={setImage} label="Kapak Görseli" />
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
            <FieldText
              label="Adres Etiket"
              value={section?.addressLabel?.[activeLang] || ""}
              onChange={(v) => setField("addressLabel", v)}
            />
            <FieldArea
              label="Adres"
              rows={3}
              value={section?.address?.[activeLang] || ""}
              onChange={(v) => setField("address", v)}
            />
            <FieldText
              label="Telefon Etiket"
              value={section?.phoneLabel?.[activeLang] || ""}
              onChange={(v) => setField("phoneLabel", v)}
            />
            <FieldText
              label="E-posta Etiket"
              value={section?.emailLabel?.[activeLang] || ""}
              onChange={(v) => setField("emailLabel", v)}
            />
          </div>
        </div>

        {/* Telefonlar */}
        <div className="rounded-xl ring-1 ring-black/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Telefonlar</h3>
            <button
              type="button"
              onClick={() => addItem("phones")}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
            >
              + Telefon Ekle
            </button>
          </div>

          {phones.length === 0 && (
            <p className="text-sm text-gray-500">Henüz telefon yok. “+ Telefon Ekle” ile başlayın.</p>
          )}

          {phones.map((ph, i) => (
            <div key={i} className="rounded-lg ring-1 ring-black/10 p-3 flex gap-3 items-start bg-white">
              <span className="shrink-0 w-6 text-center font-medium mt-2">{i + 1}.</span>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="+90 242 000 00 00"
                value={ph}
                onChange={(e) => setItem("phones", i, e.target.value)}
              />
              <button
                type="button"
                className="shrink-0 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={() => removeItem("phones", i)}
              >
                Sil
              </button>
            </div>
          ))}
        </div>

        {/* E-postalar */}
        <div className="rounded-xl ring-1 ring-black/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">E-postalar</h3>
            <button
              type="button"
              onClick={() => addItem("emails")}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
            >
              + E-posta Ekle
            </button>
          </div>

          {emails.length === 0 && (
            <p className="text-sm text-gray-500">Henüz e-posta yok. “+ E-posta Ekle” ile başlayın.</p>
          )}

          {emails.map((em, i) => (
            <div key={i} className="rounded-lg ring-1 ring-black/10 p-3 flex gap-3 items-start bg-white">
              <span className="shrink-0 w-6 text-center font-medium mt-2">{i + 1}.</span>
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="info@hotel.com"
                value={em}
                onChange={(e) => setItem("emails", i, e.target.value)}
              />
              <button
                type="button"
                className="shrink-0 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={() => removeItem("emails", i)}
              >
                Sil
              </button>
            </div>
          ))}
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