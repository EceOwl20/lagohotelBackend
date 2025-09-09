// app/[locale]/panel/sayfalar/rooms/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import SubRoomBannerEdit from "./components/SubRoomBannerEdit";
import SubroomCarouselEdit from "./components/SubroomCarouselEdit";
import RoomFeaturesEdit from "./components/RoomFeaturesEdit";
import BackgroundSectionEdit from "./components/BackgroundSectionEdit";
import RoomTourEdit from "./components/RoomTourEdit";
import OtherOptionsEdit from "./components/OtherOptionsEdit";

const LANGS = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function RoomPanelPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [activeLang, setActiveLang] = useState("tr");  // ✅ dil state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Odaları çek
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/api/pages/rooms/subroom`);
        const json = await res.json();
        if (cancelled) return;

        const list = Array.isArray(json) ? json : [];
        setRooms(list);

        // ilk seçim: LS -> ilk oda
        let initialSlug = null;
        if (typeof window !== "undefined") {
          initialSlug = localStorage.getItem("panel_room_slug");
        }
        if (!initialSlug && list.length > 0) initialSlug = list[0].slug;
        if (initialSlug) setSelectedSlug(initialSlug);
      } catch {
        if (!cancelled) setError("Oda listesi alınamadı.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Dil seçim LS (hydration-safe: sadece effect’te okunur/yazılır)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("panel_active_lang");
      if (saved && LANGS.includes(saved)) setActiveLang(saved);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("panel_active_lang", activeLang);
    }
  }, [activeLang]);

  // Oda seçimini hatırla
  useEffect(() => {
    if (typeof window !== "undefined" && selectedSlug) {
      localStorage.setItem("panel_room_slug", selectedSlug);
    }
  }, [selectedSlug]);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.slug === selectedSlug) || null,
    [rooms, selectedSlug]
  );

  const setRoomData = (updateFnOrObject) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.slug === selectedSlug
          ? typeof updateFnOrObject === "function"
            ? updateFnOrObject(r)
            : { ...r, ...updateFnOrObject }
          : r
      )
    );
  };

  const handleSave = async () => {
    if (!selectedSlug) return;
    const roomToSave = rooms.find((r) => r.slug === selectedSlug);
    if (!roomToSave) return;

    setSaving(true);
    setStatus("Kaydediliyor…");
    try {
      const res = await fetch(`${apiUrl}/api/pages/rooms/subroom/${selectedSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomToSave),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Kaydetme hatası!");
      setStatus("Kaydedildi! ✅");
      setError("");
    } catch (e) {
      setStatus("");
      setError(e.message || "Kaydetme hatası!");
    } finally {
      setSaving(false);
    }
  };

  const sectionDefs = useMemo(
    () => [
      { id: "banner",   title: "🎯 Banner",             render: () => <SubRoomBannerEdit data={selectedRoom} setData={setRoomData} langs={LANGS} activeLang={activeLang} /> },
      { id: "carousel", title: "🖼️ Carousel",          render: () => <SubroomCarouselEdit data={selectedRoom} setData={setRoomData} activeLang={activeLang} /> },
      { id: "features", title: "✨ Oda Özellikleri",    render: () => <RoomFeaturesEdit data={selectedRoom} setData={setRoomData} langs={LANGS} activeLang={activeLang} /> },
      { id: "bg",       title: "🌄 Arka Plan Bölümü",   render: () => <BackgroundSectionEdit data={selectedRoom} setData={setRoomData} langs={LANGS} activeLang={activeLang} /> },
      { id: "tour",     title: "🎥 Oda Turu",           render: () => <RoomTourEdit data={selectedRoom} setData={setRoomData} langs={LANGS} activeLang={activeLang} /> },
      { id: "other",    title: "🧩 Diğer Seçenekler",   render: () => <OtherOptionsEdit data={selectedRoom} setData={setRoomData} langs={LANGS} activeLang={activeLang} /> },
    ],
    [selectedRoom, activeLang]
  );

  const [openMap, setOpenMap] = useState({});
  useEffect(() => {
    setOpenMap(Object.fromEntries(sectionDefs.map((s) => [s.id, true])));
  }, [selectedSlug, sectionDefs]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <TopBar
          saving
          status="Yükleniyor…"
          activeLang={activeLang}
          setActiveLang={setActiveLang}
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl border bg-white overflow-hidden">
              <div className="h-full w-full animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6 scroll-smooth">
      <TopBar
        saving={saving}
        status={status}
        onSave={handleSave}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Sol: Oda listesi */}
        <aside className="sticky top-[96px] self-start">
          <div className="rounded-2xl border bg-white p-3">
            <p className="text-xs font-semibold mb-2">Odalar</p>
            <div className="flex flex-col gap-2">
              {rooms.map((room) => (
                <button
                  key={room.slug}
                  type="button"
                  onClick={() => setSelectedSlug(room.slug)}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm transition ${
                    room.slug === selectedSlug ? "bg-black text-white" : "hover:bg-gray-50"
                  }`}
                  aria-pressed={room.slug === selectedSlug}
                >
                  {room.banner?.title?.tr || room.title?.tr || room.slug}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Sağ: İçerik */}
        <div className="space-y-6">
          {error && (
            <div className="rounded-xl border bg-red-50 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

          {!selectedRoom ? (
            <div className="rounded-xl border bg-gray-50 p-6 text-gray-600">
              Lütfen soldan bir oda seçiniz.
            </div>
          ) : (
            <>
              {/* Bölüm kısayolları */}
              <nav className="sticky top-[96px] z-10 hidden xl:block">
                <div className="rounded-2xl border bg-white p-3 mb-4">
                  <p className="text-xs font-semibold mb-2">Bölümler</p>
                  <ul className="flex flex-wrap gap-2">
                    {sectionDefs.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="inline-block rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              {sectionDefs.map((sec) => (
                <SectionCard
                  key={sec.id}
                  id={sec.id}
                  title={sec.title}
                  open={openMap[sec.id] ?? true}
                  onToggle={() => setOpenMap((m) => ({ ...m, [sec.id]: !m[sec.id] }))}
                >
                  {sec.render()}
                </SectionCard>
              ))}

              {/* Alt sabit kaydet alanı */}
              <div className="pt-2">
                <div className="rounded-2xl border bg-white p-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {saving ? "Kaydediliyor…" : status || "Değişiklikleri kaydetmeyi unutmayın."}
                  </div>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                    disabled={saving || !selectedRoom}
                  >
                    {saving ? "Kaydediliyor…" : "Kaydet"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Üste dön */}
      <a
        href="#top"
        className="fixed bottom-5 right-5 rounded-full border bg-white px-3 py-2 text-sm shadow hover:bg-gray-50"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        ↑ Üste Dön
      </a>
    </div>
  );
}

/* ===================== Small UI Parts ===================== */

function TopBar({ saving, status, onSave, activeLang, setActiveLang }) {
  return (
    <header id="top" className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold">🛏️ Oda Sayfaları Paneli</h1>
          <span className="hidden md:inline-block text-xs px-2 py-1 rounded bg-black text-white">
            Rooms
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* ✅ Dil butonları (hydration-safe) */}
          <div className="hidden sm:flex items-center gap-1 mr-2">
            {["tr", "en", "de", "ru"].map((lng) => {
              const active = activeLang === lng;
              return (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setActiveLang(lng)}
                  className={`px-3 py-1.5 text-sm transition rounded-md ${
                    active ? "bg-black text-white" : "hover:bg-gray-50"
                  }`}
                  aria-pressed={active}
                  title={lng.toUpperCase()}
                >
                  {lng.toUpperCase()}
                </button>
              );
            })}
          </div>

          <span className="hidden sm:inline text-sm text-gray-600">
            {saving ? "Kaydediliyor…" : status}
          </span>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
            disabled={saving}
            title="Ctrl/Cmd + S"
          >
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionCard({ id, title, children, open, onToggle }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="rounded-2xl border bg-white overflow-hidden">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <span className="text-sm text-gray-500">{open ? "Gizle" : "Göster"}</span>
        </button>
        {open && <div className="px-4 pb-4">{children}</div>}
      </div>
    </section>
  );
}