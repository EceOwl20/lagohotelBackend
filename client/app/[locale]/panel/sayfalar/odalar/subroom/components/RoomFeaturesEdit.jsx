// app/[locale]/panel/sayfalar/rooms/components/RoomFeaturesEdit.jsx
"use client";

const ICON_OPTIONS = [
  "PoolSvg2","AreaSvg","DresserSvg","SmokingSvg","FridgeSvg",
  "SafeboxSvg","HairdryerSvg","HandsoapSvg","TeaCoffeeSvg",
  "LedTvSvg","BalconySvg","ShowerSvg"
];

export default function RoomFeaturesEdit({
  data,
  setData,
  activeLang = "tr",   // TopBar’dan geliyor (örn: "tr" | "en" | "de" | "ru")
}) {
  const section = data?.features || {};

  /* ---------------- helpers (immutable updates) ---------------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.features || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), features: { ...cur, ...next } };
    });

  // Genel alanlar: span/header/text/header2/header3/text2 -> sadece aktif dil
  const setGeneral = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  // Havuz boolean
  const togglePool = () =>
    update((cur) => ({ pool: !cur?.pool }));

  // iconsTexts: tam 3 öğe, her biri { text: {tr,en,de,ru} }
  const iconTextsUI = Array.from({ length: 3 }, (_, i) => {
    const row = section?.iconsTexts?.[i] || {};
    return { text: row.text || {} };
  });

  const setIconText = (idx, value) =>
    update((cur) => {
      const list = Array.from({ length: 3 }, (_, i) => {
        const row = cur?.iconsTexts?.[i] || {};
        return { text: row.text || {} };
      });
      list[idx] = { text: { ...(list[idx].text || {}), [activeLang]: value } };
      return { iconsTexts: list };
    });

  // items: tam 12 öğe, { text:{…}, icon:string }
  const itemsUI = Array.from({ length: 12 }, (_, i) => {
    const row = section?.items?.[i] || {};
    return {
      text: row.text || {},
      icon: row.icon || ICON_OPTIONS[i] || "",
    };
  });

  const setItemText = (idx, value) =>
    update((cur) => {
      const list = Array.from({ length: 12 }, (_, i) => {
        const row = cur?.items?.[i] || {};
        return {
          text: row.text || {},
          icon: row.icon || ICON_OPTIONS[i] || "",
        };
      });
      list[idx] = {
        ...list[idx],
        text: { ...(list[idx].text || {}), [activeLang]: value },
      };
      return { items: list };
    });

  const setItemIcon = (idx, icon) =>
    update((cur) => {
      const list = Array.from({ length: 12 }, (_, i) => {
        const row = cur?.items?.[i] || {};
        return {
          text: row.text || {},
          icon: row.icon || ICON_OPTIONS[i] || "",
        };
      });
      list[idx] = { ...list[idx], icon };
      return { items: list };
    });

  /* ----------------------------- UI ----------------------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden mb-8">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h2 className="text-lg font-semibold">🛏️ Oda Özellikleri</h2>
        <span className="text-sm text-gray-600">
          Aktif dil: {activeLang.toUpperCase()}
        </span>
      </div>

      <div className="p-4 space-y-8">
        {/* Genel metinler */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">Genel Metinler ({activeLang.toUpperCase()})</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldText
              label="Alt Başlık (span)"
              value={section?.span?.[activeLang] || ""}
              onChange={(v) => setGeneral("span", v)}
            />
            <FieldText
              label="Başlık"
              value={section?.header?.[activeLang] || ""}
              onChange={(v) => setGeneral("header", v)}
            />
            <FieldArea
              label="Açıklama"
              rows={2}
              value={section?.text?.[activeLang] || ""}
              onChange={(v) => setGeneral("text", v)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <FieldText
              label="İkinci Başlık (header2)"
              value={section?.header2?.[activeLang] || ""}
              onChange={(v) => setGeneral("header2", v)}
            />
            <FieldText
              label="Üçüncü Başlık (header3)"
              value={section?.header3?.[activeLang] || ""}
              onChange={(v) => setGeneral("header3", v)}
            />
            <FieldArea
              label="İkinci Açıklama (text2)"
              rows={2}
              value={section?.text2?.[activeLang] || ""}
              onChange={(v) => setGeneral("text2", v)}
            />
          </div>
        </div>

        {/* İkon açıklamaları (3 adet) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">İkon Açıklamaları ({activeLang.toUpperCase()})</h3>
          <div className="space-y-3">
            {iconTextsUI.map((row, idx) => (
              <FieldText
                key={idx}
                label={`İkon ${idx + 1} Metni`}
                value={row.text?.[activeLang] || ""}
                onChange={(v) => setIconText(idx, v)}
              />
            ))}
          </div>
        </div>

        {/* Havuz seçimi */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={!!section?.pool} onChange={togglePool} />
            <span className="font-medium">Havuzlu Oda</span>
          </label>
        </div>

        {/* Odanın tüm özellikleri (12 satır) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">Tüm Özellikler ({activeLang.toUpperCase()})</h3>
          <div className="space-y-3">
            {itemsUI.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-3 md:items-center rounded-lg ring-1 ring-black/10 p-3 bg-white"
              >
                <div className="shrink-0 w-10 text-gray-600">#{idx + 1}</div>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder={`Metin (${activeLang.toUpperCase()})`}
                  value={item?.text?.[activeLang] || ""}
                  onChange={(e) => setItemText(idx, e.target.value)}
                />
                <select
                  className="shrink-0 rounded-md border border-gray-300 px-3 py-2"
                  value={item.icon || ""}
                  onChange={(e) => setItemIcon(idx, e.target.value)}
                >
                  <option value="">İkon Seç</option>
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- küçük input bileşenleri -------- */
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