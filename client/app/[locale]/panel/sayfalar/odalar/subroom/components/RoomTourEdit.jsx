// app/[locale]/panel/sayfalar/rooms/components/RoomTourEdit.jsx
"use client";

export default function RoomTourEdit({
  data,
  setData,
  activeLang = "tr",
}) {
  const tours = Array.isArray(data?.tours) ? data.tours : [];

  /* ---------- helpers (immutable updates) ---------- */
  const setTours = (producer) =>
    setData((prev) => {
      const curList = Array.isArray(prev?.tours) ? prev.tours : [];
      const nextList =
        typeof producer === "function" ? producer(curList) : producer;
      return { ...(prev || {}), tours: nextList };
    });

  const emptyTour = () => ({
    subtitle: {},
    title: {},
    text: {},
    link: "",
  });

  const addTour = () => setTours((list) => [...list, emptyTour()]);

  const removeTour = (idx) =>
    setTours((list) => list.filter((_, i) => i !== idx));

  const setTourField = (idx, field, value) =>
    setTours((list) => {
      const next = [...list];
      const item = next[idx] || emptyTour();
      next[idx] = {
        ...item,
        [field]: {
          ...(item[field] || {}),
          [activeLang]: value,
        },
      };
      return next;
    });

  const setTourLink = (idx, url) =>
    setTours((list) => {
      const next = [...list];
      const item = next[idx] || emptyTour();
      next[idx] = { ...item, link: url };
      return next;
    });

  /* ---------------------- UI ---------------------- */
  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h2 className="text-lg font-semibold">🎥 Room Tours</h2>
        <button
          type="button"
          onClick={addTour}
          className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          + Yeni Tour Ekle
        </button>
      </div>

      <div className="p-4 space-y-6">
        {tours.length === 0 && (
          <div className="rounded-xl ring-1 ring-black/10 bg-gray-50 p-6 text-center text-gray-600">
            Henüz tour yok. “+ Yeni Tour Ekle” ile başlayın.
          </div>
        )}

        {tours.map((tour, idx) => (
          <div
            key={idx}
            className="rounded-xl ring-1 ring-black/10 bg-white p-4 space-y-4"
          >
            {/* Kart üst çubuk */}
            <div className="flex items-center justify-between">
              <strong>Tour #{idx + 1}</strong>
              <button
                type="button"
                onClick={() => removeTour(idx)}
                className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Sil
              </button>
            </div>

            {/* Metinler (aktif dil) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldText
                label={`Alt Başlık (subtitle) — ${activeLang.toUpperCase()}`}
                value={tour?.subtitle?.[activeLang] || ""}
                onChange={(v) => setTourField(idx, "subtitle", v)}
              />
              <FieldText
                label={`Başlık (title) — ${activeLang.toUpperCase()}`}
                value={tour?.title?.[activeLang] || ""}
                onChange={(v) => setTourField(idx, "title", v)}
              />
              <FieldArea
                label={`Açıklama (text) — ${activeLang.toUpperCase()}`}
                rows={3}
                value={tour?.text?.[activeLang] || ""}
                onChange={(v) => setTourField(idx, "text", v)}
              />
              <FieldText
                label="Tour Link"
                value={tour?.link || ""}
                onChange={(v) => setTourLink(idx, v)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------- küçük input bileşenleri ------- */
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