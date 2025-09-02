// app/[locale]/panel/sayfalar/entertainment/components/EntertainmentTypesEdit.jsx
"use client";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function EntertainmentTypesEdit({
  data,
  setData,
  activeLang = "tr", // TopBar’dan gelen aktif dil (SPA’daki gibi)
}) {
  const section = data?.entertainmentTypes || {};
  const activities = Array.isArray(section?.activities) ? section.activities : [];

  /* ---------------- helpers (immutable updates) ---------------- */
  const update = (updater) =>
    setData((prev) => {
      const cur = prev?.entertainmentTypes || {};
      const next = typeof updater === "function" ? updater(cur) : updater;
      return { ...(prev || {}), entertainmentTypes: { ...cur, ...next } };
    });

  // Genel alanlar: subtitle / title / text -> sadece aktif dil
  const setGeneral = (field, value) =>
    update((cur) => ({
      [field]: { ...(cur?.[field] || {}), [activeLang]: value },
    }));

  // Aktiviteler
  const addActivity = () =>
    update((cur) => ({
      activities: [
        ...(cur?.activities || []),
        { image: "", title: {}, category: {}, description: {}, link: "" },
      ],
    }));

  const removeActivity = (idx) =>
    update((cur) => ({
      activities: (cur?.activities || []).filter((_, i) => i !== idx),
    }));

  const setActivityField = (idx, field, value) =>
    update((cur) => {
      const list = [...(cur?.activities || [])];
      const item = list[idx] || {};
      list[idx] = {
        ...item,
        [field]: { ...(item[field] || {}), [activeLang]: value },
      };
      return { activities: list };
    });

  const setActivityImage = (idx, url) =>
    update((cur) => {
      const list = [...(cur?.activities || [])];
      const item = list[idx] || {};
      list[idx] = { ...item, image: url };
      return { activities: list };
    });

  const setActivityLink = (idx, url) =>
    update((cur) => {
      const list = [...(cur?.activities || [])];
      const item = list[idx] || {};
      list[idx] = { ...item, link: url };
      return { activities: list };
    });

  /* ------------------------- UI ------------------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h2 className="text-lg font-semibold">🎪 Eğlence Tipleri</h2>
        <button
          type="button"
          onClick={addActivity}
          className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          + Aktivite Kartı Ekle
        </button>
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
              onChange={(v) => setGeneral("subtitle", v)}
            />
            <FieldText
              label="Başlık"
              value={section?.title?.[activeLang] || ""}
              onChange={(v) => setGeneral("title", v)}
            />
            <FieldArea
              label="Açıklama"
              rows={2}
              value={section?.text?.[activeLang] || ""}
              onChange={(v) => setGeneral("text", v)}
            />
          </div>
        </div>

        {/* Aktivite Kartları */}
        <div className="space-y-6">
          {activities.map((act, idx) => (
            <div key={idx} className="rounded-xl ring-1 ring-black/10 bg-white p-4">
              {/* Kart üst çubuk */}
              <div className="flex items-center justify-between mb-4">
                <strong>Aktivite #{idx + 1}</strong>
                <button
                  type="button"
                  onClick={() => removeActivity(idx)}
                  className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Sil
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
                {/* Sol: Görsel */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Kart Görseli</label>
                  <ImageUploadInput
                    value={act.image || ""}
                    onChange={(url) => setActivityImage(idx, url)}
                    label="Resim Yükle"
                  />
                </div>

                {/* Sağ: Metinler (aktif dil) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldText
                    label={`Başlık (${activeLang.toUpperCase()})`}
                    value={act?.title?.[activeLang] || ""}
                    onChange={(v) => setActivityField(idx, "title", v)}
                  />
                  <FieldText
                    label={`Kategori (${activeLang.toUpperCase()})`}
                    value={act?.category?.[activeLang] || ""}
                    onChange={(v) => setActivityField(idx, "category", v)}
                  />
                  <FieldArea
                    label={`Açıklama (${activeLang.toUpperCase()})`}
                    rows={3}
                    value={act?.description?.[activeLang] || ""}
                    onChange={(v) => setActivityField(idx, "description", v)}
                  />
                  <FieldText
                    label="Link"
                    value={act?.link || ""}
                    onChange={(v) => setActivityLink(idx, v)}
                  />
                </div>
              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="rounded-xl ring-1 ring-black/10 bg-gray-50 p-6 text-center text-gray-600">
              Henüz aktivite kartı yok. “+ Aktivite Kartı Ekle” ile başlayın.
            </div>
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