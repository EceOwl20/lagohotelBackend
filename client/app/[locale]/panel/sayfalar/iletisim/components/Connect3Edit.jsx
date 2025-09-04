// app/[locale]/panel/sayfalar/connect/components/Connect3Edit.jsx
"use client";

export default function Connect3Edit({
  data,
  setData,
  activeLang = "tr", // TopBar’dan gelen aktif dil
}) {
  const section = data?.connect3 || {};

  /* ---------------- helpers (immutable updates) ---------------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.connect3 || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), connect3: { ...cur, ...next } };
    });

  // Çok dilli alan: yalnız aktif dil
  const setField = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  // Embed URL (veya iframe’den src ayıkla)
  const setMapUrl = (raw) => {
    const cleaned = extractEmbedSrc(raw);
    update({ mapEmbedUrl: cleaned || "" });
  };

  const embedSrc = extractEmbedSrc(section?.mapEmbedUrl || "");

  /* ------------------------------ UI ------------------------------ */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">📍 Bölüm 3 — Adres & Harita</h2>
      </div>

      <div className="p-4 space-y-8">
        {/* Adres alanları (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Adres Bilgileri ({activeLang.toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldText
              label="Adres Başlığı"
              value={section?.addressHeader?.[activeLang] || ""}
              onChange={(v) => setField("addressHeader", v)}
            />
            <FieldArea
              label="Adres Açıklama"
              rows={3}
              value={section?.addressText?.[activeLang] || ""}
              onChange={(v) => setField("addressText", v)}
            />
          </div>
        </div>

        {/* Harita embed */}
        <div className="rounded-xl ring-1 ring-black/5 p-4 space-y-3">
          <h3 className="font-semibold">Google Maps Embed</h3>
          <FieldText
            label="Google Maps Embed URL veya &lt;iframe&gt; Kodu"
            value={section?.mapEmbedUrl || ""}
            onChange={setMapUrl}
          />
          <p className="text-xs text-gray-500">
            İpucu: Google Maps → <em>Paylaş</em> → <em>Haritayı yerleştir</em> →
            çıkan kodun içindeki <code>src</code> URL’sini yapıştırın (veya komple
            &lt;iframe&gt; kodunu bırakın, biz URL’yi otomatik alırız).
          </p>

          {embedSrc ? (
            <div className="mt-2">
              <div className="w-full aspect-video rounded-lg ring-1 ring-black/10 overflow-hidden bg-gray-50">
                <iframe
                  src={embedSrc}
                  title="Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : (
            <div className="rounded-md bg-gray-50 text-gray-500 text-sm px-3 py-2">
              Önizleme için geçerli bir embed URL’si girin.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- utils ---------------- */
function extractEmbedSrc(raw) {
  if (!raw) return "";
  const val = String(raw).trim();
  // Eğer kullanıcı komple <iframe ...> kodu bıraktıysa src'yi ayıkla
  if (val.toLowerCase().includes("<iframe")) {
    const m = val.match(/src=['"]([^'"]+)['"]/i);
    return m?.[1] || "";
  }
  return val;
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
    <div className="md:col-span-2">
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