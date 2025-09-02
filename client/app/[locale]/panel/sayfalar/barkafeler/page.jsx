"use client";
import { useCallback, useEffect, useMemo, useRef, useState, createContext } from "react";
import MainBannerEdit from "./components/MainBannerEdit";
import ClinaryInfoEdit from "../restoranlar/components/ClinaryInfoEdit";
import BackgroundSectionsEdit from "./components/BackgroundSectionsEdit";
import OtherOptions4Edit from "./components/OtherOptions4Edit";
import BarCarouselEdit from "./components/BarCarouselEdit";
import DiscoverBackgroundEdit from "./components/DiscoverBackgroundEdit";

export const LangContext = createContext({ activeLang: "tr", langs: ["tr","en","de","ru"] });

const ALL_LANGS = ["tr", "en", "de", "ru"];

export default function BarCafesPanel() {
  const [data, setData] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [saveState, setSaveState] = useState("idle"); // idle|saving|saved|error
  const [activeLang, setActiveLang] = useState("tr");
  const [activeId, setActiveId] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // dil seçimini hatırla
  useEffect(() => {
    const ls = typeof window !== "undefined" && localStorage.getItem("panel.activeLang");
    if (ls && ALL_LANGS.includes(ls)) setActiveLang(ls);
  }, []);
  const changeLang = (lng) => {
    setActiveLang(lng);
    if (typeof window !== "undefined") localStorage.setItem("panel.activeLang", lng);
  };

  // fetch initial
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/api/pages/barcafes`);
        const json = await res.json();
        setData(json || {});
        setLastSaved(json || {});
      } catch {
        setData({});
        setLastSaved({});
      }
    })();
  }, [apiUrl]);

  // dirty check
  const isDirty = useMemo(() => {
    if (!data || !lastSaved) return false;
    try { return JSON.stringify(data) !== JSON.stringify(lastSaved); }
    catch { return true; }
  }, [data, lastSaved]);

  // save
  const handleSave = useCallback(async () => {
    if (!data) return;
    setSaveState("saving");
    try {
      const res = await fetch(`${apiUrl}/api/pages/barcafes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (typeof window !== "undefined" ? localStorage.getItem("token") : "")
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Kaydetme hatası");
      setLastSaved(data);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1200);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 2000);
    }
  }, [apiUrl, data]);

  // discard
  const handleDiscard = useCallback(() => {
    if (lastSaved) setData(lastSaved);
  }, [lastSaved]);

  // section list (sol menü)
  const sectionDefs = useRef([
    { id: "main-banner", label: "Ana Banner" },
    { id: "clinary-info", label: "Clinary Info" },
    { id: "background-sections", label: "Arkaplan Bölümleri" },
    { id: "other-options-1", label: "Diğer Seçenekler 1" },
    { id: "other-options-2", label: "Diğer Seçenekler 2" },
    { id: "bar-carousel", label: "Bar Carousel" },
    { id: "discover-background", label: "Discover Background" },
  ]).current;

  // IO: aktif bölüm
  const headingRefs = useRef({});
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter(e => e.isIntersecting)
                           .sort((a,b)=> b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target?.id) setActiveId(top.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0,0.25,0.5,0.75,1] }
    );
    sectionDefs.forEach(({ id }) => {
      const el = headingRefs.current[id];
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sectionDefs, data]);

  // kısayol: Cmd/Ctrl+S
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (isDirty) handleSave();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSave, isDirty]);

  if (!data) return <div className="p-6">Yükleniyor…</div>;

  return (
    <LangContext.Provider value={{ activeLang, langs: ALL_LANGS }}>
      <div className="relative">
        {/* STICKY TOP BAR */}
        <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-[64px]">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold">🍹 Bar & Cafes — İçerik Paneli</h1>
              {isDirty && <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500" title="Kaydedilmemiş değişiklikler" />}
            </div>

            <div className="flex items-center gap-3">
              {/* DİL SEÇİCİ */}
              <div className="hidden sm:flex rounded-lg border overflow-hidden">
                {ALL_LANGS.map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLang(lng)}
                    className={`px-3 py-1.5 text-sm transition ${
                      activeLang === lng ? "bg-black text-white" : "hover:bg-gray-50"
                    }`}
                    type="button"
                    title={lng.toUpperCase()}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Aksiyonlar */}
              <StatusPill state={saveState} />
              <button
                onClick={handleDiscard}
                disabled={!isDirty}
                className={`px-3 py-1.5 rounded border text-sm ${isDirty ? "hover:bg-white" : "opacity-50 cursor-not-allowed"}`}
                type="button"
              >
                Vazgeç
              </button>
              <button
                onClick={handleSave}
                disabled={!isDirty || saveState === "saving"}
                className={`px-4 py-1.5 rounded text-sm text-white transition ${
                  !isDirty || saveState === "saving" ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                title="Cmd/Ctrl+S"
                type="button"
              >
                {saveState === "saving" ? "Kaydediliyor…" : "Kaydet"}
              </button>
            </div>
          </div>
        </header>

        {/* CONTENT + LEFT NAV */}
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-4 md:px-6 py-6">
          <aside className="hidden xl:block xl:col-span-3">
            <nav className="sticky top-[88px] rounded-2xl border bg-white p-3">
              <p className="px-2 py-1 text-xs font-medium text-gray-500">Bölümler</p>
              <ul className="mt-1.5">
                {sectionDefs.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`block px-2 py-2 rounded-md text-sm transition ${activeId === s.id ? "bg-black text-white" : "hover:bg-gray-50"}`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="col-span-12 xl:col-span-9 space-y-10">
            <SectionShell id="main-banner" title="Ana Banner" headingRefs={headingRefs}>
              <MainBannerEdit data={data} setData={setData} langs={ALL_LANGS} activeLang={activeLang} />
            </SectionShell>

            <SectionShell id="clinary-info" title="Clinary Info" headingRefs={headingRefs}>
              <ClinaryInfoEdit data={data} setData={setData} langs={ALL_LANGS} activeLang={activeLang} />
            </SectionShell>

            <SectionShell id="background-sections" title="Arkaplan Bölümleri" headingRefs={headingRefs}>
              <BackgroundSectionsEdit data={data} setData={setData} langs={ALL_LANGS} activeLang={activeLang} />
            </SectionShell>

            <SectionShell id="other-options-1" title="Diğer Seçenekler 1" headingRefs={headingRefs}>
              <OtherOptions4Edit data={data} setData={setData} langs={ALL_LANGS} blockName="otherOptions" activeLang={activeLang} />
            </SectionShell>

            <SectionShell id="other-options-2" title="Diğer Seçenekler 2" headingRefs={headingRefs}>
              <OtherOptions4Edit data={data} setData={setData} langs={ALL_LANGS} blockName="otherOptions2" activeLang={activeLang} />
            </SectionShell>

            <SectionShell id="bar-carousel" title="Bar Carousel" headingRefs={headingRefs}>
              <BarCarouselEdit data={data} setData={setData} langs={ALL_LANGS} activeLang={activeLang} />
            </SectionShell>

            <SectionShell id="discover-background" title="Discover Background" headingRefs={headingRefs}>
              <DiscoverBackgroundEdit data={data} setData={setData} langs={ALL_LANGS} activeLang={activeLang} />
            </SectionShell>
          </main>
        </div>
      </div>
    </LangContext.Provider>
  );
}

function SectionShell({ id, title, headingRefs, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div ref={(el) => (headingRefs.current[id] = el)} className="mb-3 text-lg font-semibold text-gray-900">
        {title}
      </div>
      <div className="rounded-2xl border bg-white p-4 md:p-6">{children}</div>
    </section>
  );
}

function StatusPill({ state }) {
  if (state === "saving") return (
    <span className="inline-flex items-center gap-2 text-xs rounded-full bg-blue-50 text-blue-700 px-3 py-1">
      <span className="inline-block w-3 h-3 rounded-full border-2 border-blue-200 border-top-blue-600 animate-spin" />
      Kaydediliyor
    </span>
  );
  if (state === "saved") return (
    <span className="inline-flex items-center gap-2 text-xs rounded-full bg-green-50 text-green-700 px-3 py-1">✓ Kaydedildi</span>
  );
  if (state === "error") return (
    <span className="inline-flex items-center gap-2 text-xs rounded-full bg-red-50 text-red-700 px-3 py-1">⚠︎ Hata</span>
  );
  return <span className="inline-flex items-center gap-2 text-xs rounded-full bg-gray-100 text-gray-600 px-3 py-1">Hazır</span>;
}
