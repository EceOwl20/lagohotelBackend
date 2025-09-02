"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionRestaurantPage from "./components/SectionRestaurantPage";
import MainBannerEdit from "./components/MainBanner";
import ClinaryInfoEdit from "./components/ClinaryInfoEdit";
import MainRestaurantSectionEdit from "./components/MainRestaurantSectionEdit";
import CuisinesEdit from "./components/CuisinesEdit";
import ClinaryReverseInfoEdit from "./components/ClinaryReverseInfoEdit";
import DiscoverBackgroundEdit from "./components/DiscoverBackgroundEdit";

const LANGS = ["tr", "en", "de", "ru"];

export default function RestaurantPanelPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState(null);
  const [activeLang, setActiveLang] = useState(
    () => (typeof window !== "undefined" && localStorage.getItem("panel_lang")) || "tr"
  );
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");           // "Kaydedildi!" vb.
  const [saving, setSaving] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [error, setError] = useState("");

  // Akordeon: hangi bölüm açık?
  const sectionDefs = useMemo(
    () => [
      { id: "main-banner", title: "🎯 Ana Banner", render: () => <MainBannerEdit data={data} setData={setData} langs={LANGS} activeLang={activeLang} /> },
      { id: "clinary-info", title: "🍽️ Culinary Info", render: () => <ClinaryInfoEdit data={data} setData={setData} langs={LANGS} activeLang={activeLang} /> },
      { id: "main-restaurant", title: "🏨 Ana Restoran Bölümü", render: () => <MainRestaurantSectionEdit data={data} setData={setData} langs={LANGS} activeLang={activeLang} /> },
      { id: "cuisines", title: "🥗 Mutfaklar (Cuisines)", render: () => <CuisinesEdit data={data} setData={setData} langs={LANGS} blockName="cuisines" activeLang={activeLang} /> },
      { id: "clinary-reverse", title: "🔁 Culinary Reverse Info", render: () => <ClinaryReverseInfoEdit data={data} setData={setData} langs={LANGS} activeLang={activeLang} /> },
      { id: "discover-bg", title: "🌄 Discover Background", render: () => <DiscoverBackgroundEdit data={data} setData={setData} langs={LANGS} activeLang={activeLang} /> },
      // İstersen SectionRestaurantPage’i da bir karta ekleyebilirsin:
      // { id: "page-meta", title: "🧩 Sayfa Meta", render: () => <SectionRestaurantPage data={data} setData={setData} langs={LANGS} activeLang={activeLang} /> },
    ],
    [data, activeLang]
  );

  const [openMap, setOpenMap] = useState({}); // { [id]: boolean }

  // Dil değişiminde hatırla
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("panel_lang", activeLang);
    }
  }, [activeLang]);

  // Fetch
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/api/pages/restaurants`);
        const json = await res.json();
        if (!cancelled) {
          setData(json || {});
          setLoading(false);
          // tüm bölümleri başlangıçta açık yap
          setOpenMap(Object.fromEntries(sectionDefs.map(s => [s.id, true])));
        }
      } catch (e) {
        if (!cancelled) {
          setData({});
          setLoading(false);
          setError("Sayfa verisi alınamadı.");
        }
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  // Ctrl/Cmd + S ile kaydet
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data]); // data değiştikçe en güncel kaydet fonksiyonunu kullansın

  // Auto-save (debounce)
  useEffect(() => {
    if (!autoSave) return;
    if (!data) return;
    setStatus("Taslak kaydediliyor…");
    setSaving(true);
    const t = setTimeout(() => {
      handleSave(true);
    }, 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, autoSave]);

  const handleSave = async (silent = false) => {
    if (!data) return;
    setSaving(true);
    if (!silent) {
      setStatus("Kaydediliyor…");
    }
    try {
      const res = await fetch(`${apiUrl}/api/pages/restaurants`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (typeof window !== "undefined" ? localStorage.getItem("token") : "")
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Kaydetme hatası!");
      setStatus(silent ? "Taslak kaydedildi." : "Kaydedildi! ✅");
      setError("");
    } catch (e) {
      setStatus("");
      setError(e.message || "Kaydetme hatası!");
    } finally {
      setSaving(false);
    }
  };

  const toggleAll = (open) => {
    setOpenMap(Object.fromEntries(sectionDefs.map(s => [s.id, open])));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <TopBar
          activeLang={activeLang}
          setActiveLang={setActiveLang}
          saving={true}
          status="Yükleniyor…"
          autoSave={autoSave}
          setAutoSave={setAutoSave}
          onSave={() => {}}
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
      {/* Üst sticky bar */}
      <TopBar
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        saving={saving}
        status={status}
        autoSave={autoSave}
        setAutoSave={setAutoSave}
        onSave={handleSave}
      />

      {/* İçindekiler / Outline (sol) + İçerik */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* Outline */}
        <nav className="hidden lg:block sticky top-[96px] self-start">
          <div className="rounded-2xl border bg-white p-3">
            <p className="text-xs font-semibold mb-2">Bölümler</p>
            <ul className="space-y-1">
              {sectionDefs.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            {/* <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => toggleAll(true)}
                className="flex-1 rounded-md border px-2 py-1.5 text-xs hover:bg-gray-50"
              >
                Hepsini Aç
              </button>
              <button
                type="button"
                onClick={() => toggleAll(false)}
                className="flex-1 rounded-md border px-2 py-1.5 text-xs hover:bg-gray-50"
              >
                Hepsini Kapa
              </button>
            </div> */}
          </div>
        </nav>

        {/* İçerik */}
        <div className="space-y-6">
          {error && (
            <div className="rounded-xl border bg-red-50 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

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
                onClick={() => handleSave()}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                disabled={saving}
              >
                {saving ? "Kaydediliyor…" : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
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

function TopBar({ activeLang, setActiveLang, saving, status, autoSave, setAutoSave, onSave }) {
  return (
    <header id="top" className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold">🍽️ Restoranlar Paneli</h1>
          <span className="hidden md:inline-block text-xs px-2 py-1 rounded bg-black text-white">Restaurants</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Dil sekmeleri */}
          <div className="hidden sm:flex rounded-lg border overflow-hidden">
            {LANGS.map((lng) => (
              <button
                key={lng}
                onClick={() => setActiveLang(lng)}
                className={`px-3 py-1.5 text-sm transition ${
                  activeLang === lng ? "bg-black text-white" : "hover:bg-gray-50"
                }`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Auto-save toggle */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-black"
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
            />
            Otomatik kaydet
          </label>

          {/* Durum */}
          <span className="hidden sm:inline text-sm text-gray-600">
            {saving ? "Kaydediliyor…" : status}
          </span>

          {/* Kaydet */}
          <button
            onClick={() => onSave()}
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
