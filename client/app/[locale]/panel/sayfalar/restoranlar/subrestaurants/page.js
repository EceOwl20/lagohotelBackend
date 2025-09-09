// app/[locale]/panel/sayfalar/restaurants/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import SubrestaurantEdit from "./components/SubrestaurantEdit";

const LANGS_DEFAULT = ["tr", "en", "de", "ru"];
const restaurantSlugs = [
  "anatoliarestaurant",
  "despinarestaurant",
  "fuego",
  "gustorestaurant",
  "mainrestaurant",
  "tapazrestaurant",
  "wasabi",
];

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const defaultRestaurantData = {
  slug: "",
  mainBanner: {
    subtitle: { tr: "", en: "", de: "", ru: "" },
    title: { tr: "", en: "", de: "", ru: "" },
    text: { tr: "", en: "", de: "", ru: "" },
    image: "",
  },
  // ileride: carousel, section1, vs...
};

export default function RestaurantPanelPage() {
  /* ---------------- state ---------------- */
  const [restaurants, setRestaurants] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Dil topbar (SSR güvenli)
  const LANGS = useMemo(() => LANGS_DEFAULT, []);
  const [activeLang, setActiveLang] = useState("tr");
  const [mounted, setMounted] = useState(false);

  /* ---------------- effects ---------------- */
  // İlk mount: dil & slug'ı localStorage'dan al
  useEffect(() => {
    setMounted(true);
    try {
      const storedLang =
        typeof window !== "undefined" ? localStorage.getItem("panel_lang") : null;
      if (storedLang && LANGS.includes(storedLang)) setActiveLang(storedLang);

      const storedSlug =
        typeof window !== "undefined" ? localStorage.getItem("panel_restaurant_slug") : null;
      if (storedSlug && restaurantSlugs.includes(storedSlug)) {
        setSelectedSlug(storedSlug);
      } else {
        setSelectedSlug(restaurantSlugs[0]); // varsayılan ilk slug
      }
    } catch {
      setSelectedSlug(restaurantSlugs[0]);
    }
  }, [LANGS]);

  // Dil değişince kaydet
  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("panel_lang", activeLang);
    } catch {}
  }, [activeLang]);

  // Slug değişince kaydet
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && selectedSlug) {
        localStorage.setItem("panel_restaurant_slug", selectedSlug);
      }
    } catch {}
  }, [selectedSlug]);

  // Restoran verilerini çek
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/api/pages/restaurants/subrestaurants`);
        const data = await res.json();
        if (cancelled) return;

        setRestaurants(Array.isArray(data) ? data : []);
        setError("");
      } catch (e) {
        if (!cancelled) setError("Restoran listesi alınamadı.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------- helpers ---------------- */
  // Seçili restoran objesi (yoksa default şema ile oluşturulmuş geçici obje)
  const selectedRestaurant =
    restaurants.find((r) => r.slug === selectedSlug) ||
    (selectedSlug ? { ...defaultRestaurantData, slug: selectedSlug } : null);

  // Child bileşenin yapacağı immutable güncellemeyi uygula
  const setRestaurantData = (updateFnOrObject) => {
    setRestaurants((prev) => {
      const exists = prev.some((r) => r.slug === selectedSlug);
      if (exists) {
        return prev.map((r) =>
          r.slug === selectedSlug
            ? typeof updateFnOrObject === "function"
              ? updateFnOrObject(r)
              : { ...r, ...updateFnOrObject }
            : r
        );
      }
      const base = { ...defaultRestaurantData, slug: selectedSlug };
      const created =
        typeof updateFnOrObject === "function"
          ? updateFnOrObject(base)
          : { ...base, ...updateFnOrObject };
      return [...prev, created];
    });
  };

  // Kaydet
  const handleSave = async () => {
    if (!selectedSlug) return;
    const restaurantToSave =
      restaurants.find((r) => r.slug === selectedSlug) ||
      { ...defaultRestaurantData, slug: selectedSlug };

    setSaving(true);
    setStatus("Kaydediliyor…");
    setError("");

    try {
      const response = await fetch(
        `${apiUrl}/api/pages/restaurants/subrestaurants/${selectedSlug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(restaurantToSave),
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Kaydetme hatası!");
      setStatus("Kaydedildi! ✅");
    } catch (e) {
      setStatus("");
      setError(e.message || "Kaydetme hatası!");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <TopBar
          saving
          status="Yükleniyor…"
          activeLang={activeLang}
          onChangeLang={setActiveLang}
          mounted={mounted}
          langs={LANGS}
          onSave={handleSave}
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl border bg-white overflow-hidden"
            >
              <div className="h-full w-full animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6 scroll-smooth">
      {/* Üst bar (Dil topbar + Kaydet) */}
      <TopBar
        saving={saving}
        status={status}
        activeLang={activeLang}
        onChangeLang={setActiveLang}
        mounted={mounted}
        langs={LANGS}
        onSave={handleSave}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Sol: restoran slug listesi */}
        <aside className="sticky top-[96px] self-start">
          <div className="rounded-2xl border bg-white p-3">
            <p className="text-xs font-semibold mb-2">Restoranlar</p>
            <div className="flex flex-col gap-2">
              {restaurantSlugs.map((slug) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setSelectedSlug(slug)}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm transition
                    ${slug === selectedSlug ? "bg-black text-white" : "hover:bg-gray-50"}`}
                  aria-pressed={slug === selectedSlug}
                >
                  {slug}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Sağ: içerik */}
        <div className="space-y-6">
          {error && (
            <div className="rounded-xl border bg-red-50 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

          {!selectedRestaurant || !selectedSlug ? (
            <div className="rounded-xl border bg-gray-50 p-6 text-gray-600">
              Lütfen soldan bir restoran seçiniz.
            </div>
          ) : (
            <>
              <section className="rounded-2xl border bg-white overflow-hidden">
                <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
                  <h2 className="text-lg font-semibold">
                    🍽️ {selectedSlug} — Düzenleme
                  </h2>
                </div>
                <div className="p-4">
                  <SubrestaurantEdit
                    data={selectedRestaurant}
                    setData={setRestaurantData}
                    langs={LANGS}
                    activeLang={activeLang} // 👈 aktif dili child’a geçiriyoruz
                  />
                </div>
              </section>

              {/* Alt sabit kaydet alanı */}
              <div className="pt-2">
                <div className="rounded-2xl border bg-white p-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {saving
                      ? "Kaydediliyor…"
                      : status || "Değişiklikleri kaydetmeyi unutmayın."}
                  </div>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                    disabled={saving || !selectedRestaurant}
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

/* ============== Small UI: TopBar ============== */
function TopBar({ saving, status, activeLang, onChangeLang, mounted, langs, onSave }) {
  return (
    <header id="top" className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold">🍽️ Restoran Sayfaları Paneli</h1>
          <span className="hidden md:inline-block text-xs px-2 py-1 rounded bg-black text-white">
            Subrestaurants
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Dil Topbar */}
          <div className="hidden sm:flex items-center gap-1 mr-2">
            {langs.map((l) => {
              const selected = (mounted ? activeLang : "tr") === l;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => onChangeLang(l)}
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

          {/* Status + Kaydet */}
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