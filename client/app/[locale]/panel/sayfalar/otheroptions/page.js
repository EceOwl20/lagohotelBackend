// app/[locale]/panel/.../components/OtherOptionsEdit.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import ImageUploadInput from "../../components/ImageUploadInput"; // yolu projene göre kontrol et

const LANGS_DEFAULT = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const emptyRoom = () => ({
  img: "",
  title: {},
  description: {},
  size: {},
  capacity: {},
  text: {},
  link: "",
});

export default function OtherOptionsEdit() {
  const [data, setData] = useState({
    span: {},
    title: {},
    buttonText: {},
    rooms: [emptyRoom(), emptyRoom(), emptyRoom()],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* -------- Dil Topbar (SSR güvenli) -------- */
  const LANGS = useMemo(() => LANGS_DEFAULT, []);
  const [activeLang, setActiveLang] = useState("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("panel_lang") : null;
      if (stored && LANGS.includes(stored)) setActiveLang(stored);
    } catch {}
  }, [LANGS]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("panel_lang", activeLang);
    } catch {}
  }, [activeLang]);

  /* -------- Fetch -------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/api/otherOptions`);
        const resData = await res.json();

        // Rooms sabit 3 olsun
        let rooms = Array.isArray(resData?.rooms) ? resData.rooms.slice(0, 3) : [];
        while (rooms.length < 3) rooms.push(emptyRoom());

        setData((prev) => ({
          ...prev,
          ...resData,
          rooms,
        }));
      } catch {
        // yut
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* -------- Helpers (setData yapısı korunuyor) -------- */
  const setMainField = (field, value) =>
    setData((prev) => ({
      ...prev,
      [field]: { ...(prev[field] || {}), [activeLang]: value },
    }));

  const setRoomImage = (idx, url) =>
    setData((prev) => {
      const rooms = [...(prev.rooms || [])];
      const r = rooms[idx] || emptyRoom();
      rooms[idx] = { ...r, img: url };
      return { ...prev, rooms };
    });

  const setRoomLangField = (idx, field, value) =>
    setData((prev) => {
      const rooms = [...(prev.rooms || [])];
      const r = rooms[idx] || emptyRoom();
      rooms[idx] = {
        ...r,
        [field]: { ...(r[field] || {}), [activeLang]: value },
      };
      return { ...prev, rooms };
    });

  const setRoomLink = (idx, value) =>
    setData((prev) => {
      const rooms = [...(prev.rooms || [])];
      const r = rooms[idx] || emptyRoom();
      rooms[idx] = { ...r, link: value };
      return { ...prev, rooms };
    });

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`${apiUrl}/api/otherOptions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Kaydedildi!");
    } catch {
      alert("Kaydetme hatası!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Yükleniyor…</div>;

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header + Dil Topbar */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h2 className="text-lg font-semibold">🏨 Other Options (3 Oda Sabit)</h2>

        <div className="hidden sm:flex items-center gap-2">
          {LANGS.map((l) => {
            const selected = (mounted ? activeLang : "tr") === l;
            return (
              <button
                key={l}
                type="button"
                onClick={() => setActiveLang(l)}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  selected ? "bg-black text-white" : "hover:bg-gray-50"
                }`}
                aria-pressed={selected}
                title={l.toUpperCase()}
              >
                {l.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 space-y-8">
        {/* Ana başlıklar (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Genel Metinler ({(mounted ? activeLang : "tr").toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldText
              label="Alt Başlık (span)"
              value={data.span?.[activeLang] || ""}
              onChange={(v) => setMainField("span", v)}
            />
            <FieldText
              label="Başlık (title)"
              value={data.title?.[activeLang] || ""}
              onChange={(v) => setMainField("title", v)}
            />
            <FieldText
              label="Buton Metni (buttonText)"
              value={data.buttonText?.[activeLang] || ""}
              onChange={(v) => setMainField("buttonText", v)}
            />
          </div>
        </div>

        {/* Oda kartları (3 adet) */}
        <div className="space-y-6">
          {data.rooms.map((room, idx) => (
            <div key={idx} className="rounded-xl ring-1 ring-black/10 bg-white p-4 space-y-4">
              <div className="flex items-center justify-between">
                <strong>Oda #{idx + 1}</strong>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
                {/* Sol: Görsel */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Kart Görseli</label>
                  <ImageUploadInput
                    value={room.img || ""}
                    onChange={(url) => setRoomImage(idx, url)}
                    label="Resim Yükle"
                  />
                </div>

                {/* Sağ: Metinler (aktif dil) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldText
                    label={`Başlık (${activeLang.toUpperCase()})`}
                    value={room.title?.[activeLang] || ""}
                    onChange={(v) => setRoomLangField(idx, "title", v)}
                  />
                  <FieldText
                    label={`Açıklama (${activeLang.toUpperCase()})`}
                    value={room.description?.[activeLang] || ""}
                    onChange={(v) => setRoomLangField(idx, "description", v)}
                  />
                  <FieldText
                    label={`Boyut (${activeLang.toUpperCase()})`}
                    value={room.size?.[activeLang] || ""}
                    onChange={(v) => setRoomLangField(idx, "size", v)}
                  />
                  <FieldText
                    label={`Kapasite (${activeLang.toUpperCase()})`}
                    value={room.capacity?.[activeLang] || ""}
                    onChange={(v) => setRoomLangField(idx, "capacity", v)}
                  />
                  <FieldArea
                    label={`Ek Metin (${activeLang.toUpperCase()})`}
                    rows={3}
                    value={room.text?.[activeLang] || ""}
                    onChange={(v) => setRoomLangField(idx, "text", v)}
                  />
                  <FieldText
                    label="Link"
                    value={room.link || ""}
                    onChange={(v) => setRoomLink(idx, v)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Kaydet */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
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
        value={value || ""}
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
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}