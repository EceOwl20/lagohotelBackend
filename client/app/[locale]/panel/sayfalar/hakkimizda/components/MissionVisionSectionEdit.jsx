// app/[locale]/panel/sayfalar/hakkimizda/components/MissionVisionSectionEdit.jsx
"use client";

import ImageUploadInput from "../../../components/ImageUploadInput";

export default function MissionVisionSectionEdit({
  data,
  setData,
  activeLang = "tr",
  blockName = "missionVisionSection",
}) {
  const section = data?.[blockName] || {};

  /* ------------ helpers (immutable updates) ------------ */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.[blockName] || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), [blockName]: { ...cur, ...next } };
    });

  // 1, 2, 3. blokların alanlarını (span/header/text) aktif dile yazar
  const setTripletField = (blockIndex, key, value) => {
    const fieldName = blockIndex === 1 ? key : `${key}${blockIndex}`;
    update((cur) => ({
      [fieldName]: { ...(cur?.[fieldName] || {}), [activeLang]: value },
    }));
  };

  // Görseller
  const setLeftImg = (url) => update({ leftImg: url });
  const setRightImg = (url) => update({ rightImg: url });

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🎯 Misyon / Vizyon</h2>
      </div>

      <div className="p-4 space-y-8">
        {/* Blok 1 */}
        <BlockCard
          title={`Blok 1 (${activeLang.toUpperCase()})`}
          spanValue={section?.span?.[activeLang] || ""}
          headerValue={section?.header?.[activeLang] || ""}
          textValue={section?.text?.[activeLang] || ""}
          onSpanChange={(v) => setTripletField(1, "span", v)}
          onHeaderChange={(v) => setTripletField(1, "header", v)}
          onTextChange={(v) => setTripletField(1, "text", v)}
        />

        {/* Blok 2 */}
        <BlockCard
          title={`Blok 2 (${activeLang.toUpperCase()})`}
          spanValue={section?.span2?.[activeLang] || ""}
          headerValue={section?.header2?.[activeLang] || ""}
          textValue={section?.text2?.[activeLang] || ""}
          onSpanChange={(v) => setTripletField(2, "span", v)}
          onHeaderChange={(v) => setTripletField(2, "header", v)}
          onTextChange={(v) => setTripletField(2, "text", v)}
        />

        {/* Blok 3 */}
        <BlockCard
          title={`Blok 3 (${activeLang.toUpperCase()})`}
          spanValue={section?.span3?.[activeLang] || ""}
          headerValue={section?.header3?.[activeLang] || ""}
          textValue={section?.text3?.[activeLang] || ""}
          onSpanChange={(v) => setTripletField(3, "span", v)}
          onHeaderChange={(v) => setTripletField(3, "header", v)}
          onTextChange={(v) => setTripletField(3, "text", v)}
        />

        {/* Görseller */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">Görseller</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Sol Görsel</label>
              <ImageUploadInput
                value={section?.leftImg || ""}
                onChange={setLeftImg}
                label="Sol Görsel Yükle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sağ Görsel</label>
              <ImageUploadInput
                value={section?.rightImg || ""}
                onChange={setRightImg}
                label="Sağ Görsel Yükle"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------- küçük bileşenler ------------- */

function BlockCard({
  title,
  spanValue,
  headerValue,
  textValue,
  onSpanChange,
  onHeaderChange,
  onTextChange,
}) {
  return (
    <div className="rounded-xl ring-1 ring-black/5 p-4">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FieldText label="Üst Metin (span)" value={spanValue} onChange={onSpanChange} />
        <FieldText label="Başlık (header)" value={headerValue} onChange={onHeaderChange} />
        <FieldArea label="Açıklama (text)" rows={3} value={textValue} onChange={onTextChange} />
      </div>
    </div>
  );
}

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
