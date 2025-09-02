"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const langs = ["tr", "en", "de", "ru"];
const defaultHeader = {
  logo: "",
  phone: "",
  bookNowLink: { tr: "", en: "", de: "", ru: "" },
  bookNowText: { tr: "", en: "", de: "", ru: "" },
  contactLink: { tr: "", en: "", de: "", ru: "" },
  contactText: { tr: "", en: "", de: "", ru: "" },
  letUsCallYouLink: { tr: "", en: "", de: "", ru: "" },
  letUsCallYouText: { tr: "", en: "", de: "", ru: "" },
  menuItems: [],
  social: {
    tripadvisor: "",
    google: "",
    facebook: "",
    youtube: "",
    instagram: "",
  },
};

export default function SectionHeader() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState(null);
  const [activeLang, setActiveLang] = useState("tr");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Embla for menu items
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  // Fetch header
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/api/header`);
        const json = await res.json();
        setData(json || defaultHeader);
      } catch (err) {
        setData(defaultHeader);
        setError("Header verisi alınamadı.");
      } finally {
        setLoading(false);
      }
    })();
  }, [apiUrl]);

  // Helpers (lang fields)
  const setLangField = (key, value) => {
    setData((prev) => {
      const prevObj = prev || defaultHeader;
      const prevField = prevObj[key] || {};
      return { ...prevObj, [key]: { ...prevField, [activeLang]: value } };
    });
  };

  const copyActiveToOthers = (keys) => {
    setData((prev) => {
      const next = { ...(prev || defaultHeader) };
      keys.forEach((k) => {
        const base = { ...(next[k] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => {
          if (lng !== activeLang) base[lng] = val;
        });
        next[k] = base;
      });
      return next;
    });
  };

  const clearActiveLang = (keys) => {
    setData((prev) => {
      const next = { ...(prev || defaultHeader) };
      keys.forEach((k) => {
        next[k] = { ...(next[k] || {}), [activeLang]: "" };
      });
      return next;
    });
  };

  // Menu helpers
  const addMenuItem = () => {
    setData((prev) => {
      const next = { ...(prev || defaultHeader) };
      next.menuItems = [
        ...(next.menuItems || []),
        { text: { tr: "", en: "", de: "", ru: "" }, link: { tr: "", en: "", de: "", ru: "" } },
      ];
      return next;
    });
    setTimeout(() => scrollTo((data?.menuItems?.length || 0)), 0);
  };

  const removeMenuItem = (idx) => {
    setData((prev) => {
      const next = { ...(prev || defaultHeader) };
      next.menuItems = (next.menuItems || []).filter((_, i) => i !== idx);
      return next;
    });
  };

  const setMenuItemLangField = (idx, field, value) => {
    setData((prev) => {
      const next = { ...(prev || defaultHeader) };
      const items = [...(next.menuItems || [])];
      const row = items[idx] || { text: {}, link: {} };
      row[field] = { ...(row[field] || {}), [activeLang]: value };
      items[idx] = row;
      next.menuItems = items;
      return next;
    });
  };

  const copyMenuActiveToOthers = (idx) => {
    setData((prev) => {
      const next = { ...(prev || defaultHeader) };
      const items = [...(next.menuItems || [])];
      const row = items[idx] || { text: {}, link: {} };

      ["text", "link"].forEach((f) => {
        const base = { ...(row[f] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => {
          if (lng !== activeLang) base[lng] = val;
        });
        row[f] = base;
      });

      items[idx] = row;
      next.menuItems = items;
      return next;
    });
  };

  // Image upload (logo)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploadingLogo(true);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setData((prev) => ({ ...(prev || defaultHeader), logo: result.imageUrl || result.path || result.url }));
    } catch (err) {
      setError("Yükleme hatası: " + err.message);
    } finally {
      setUploadingLogo(false);
      e.target.value = "";
    }
  };

  // Save
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/header`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Güncelleme başarısız");
      setSuccess("✅ Header başarıyla güncellendi!");
    } catch (err) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const logoSrc = useMemo(() => {
    const p = data?.logo;
    if (!p) return null;
    return p.startsWith("/") ? `${apiUrl}${p}` : p;
  }, [data?.logo, apiUrl]);

  if (loading) return <div className="p-6">Yükleniyor…</div>;

  return (
    <section className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">🧭 Header Düzenle</h1>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border overflow-hidden">
            {langs.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => setActiveLang(lng)}
                className={`px-3 py-1.5 text-sm transition ${
                  activeLang === lng ? "bg-black text-white" : "hover:bg-gray-50"
                }`}
                title={lng.toUpperCase()}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              copyActiveToOthers([
                "bookNowText",
                "bookNowLink",
                "contactText",
                "contactLink",
                "letUsCallYouText",
                "letUsCallYouLink",
              ])
            }
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
          >
            ⇆ Tüm CTA Alanlarını Kopyala
          </button>

          <button
            type="button"
            onClick={() =>
              clearActiveLang([
                "bookNowText",
                "bookNowLink",
                "contactText",
                "contactLink",
                "letUsCallYouText",
                "letUsCallYouLink",
              ])
            }
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
          >
            🧹 Aktif Dili Temizle
          </button>
        </div>
      </div>

      {/* Grid: Sol (Formlar) | Sağ (Önizleme) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1  gap-6">
        {/* Sol taraf */}
        <div className="space-y-6">
          {/* Logo + Telefon */}
          <div className="bg-white border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Logo & Telefon</h3>

            <div className="flex items-center gap-4">
              <div className="relative w-28 h-20 rounded border bg-gray-50 overflow-hidden">
                {logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoSrc} alt="Logo" className="absolute inset-0 w-full h-full object-contain p-2" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-gray-400 text-xs">Logo yok</div>
                )}

                <label
                  htmlFor="logo-input"
                  className="absolute inset-0 bg-black/0 hover:bg-black/40 text-white text-xs flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition"
                >
                  {uploadingLogo ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Yükleniyor…
                    </span>
                  ) : (
                    "Değiştir"
                  )}
                </label>
                <input id="logo-input" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>

              <div className="flex-1">
                <Field
                  label="Telefon"
                  value={data?.phone || ""}
                  onChange={(v) => setData((p) => ({ ...(p || defaultHeader), phone: v }))}
                  placeholder="+90 000 000 00 00"
                />
              </div>
            </div>
          </div>

          {/* CTA Alanları */}
          <div className="bg-white border rounded-2xl p-4 space-y-4">
            <h3 className="font-semibold">CTA Alanları (Aktif Dil: {activeLang.toUpperCase()})</h3>

            {/* Book Now */}
            <div className="rounded-xl border p-3 bg-gray-50">
              <h4 className="font-medium mb-2">📘 Book Now</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Buton Metni"
                  value={data?.bookNowText?.[activeLang] || ""}
                  onChange={(v) => setLangField("bookNowText", v)}
                  placeholder="Book Now"
                  countRight
                />
                <Field
                  label="Buton Linki"
                  value={data?.bookNowLink?.[activeLang] || ""}
                  onChange={(v) => setLangField("bookNowLink", v)}
                  placeholder="/rezervasyon"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-xl border p-3 bg-gray-50">
              <h4 className="font-medium mb-2">📞 Contact</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Buton Metni"
                  value={data?.contactText?.[activeLang] || ""}
                  onChange={(v) => setLangField("contactText", v)}
                  placeholder="İletişim"
                  countRight
                />
                <Field
                  label="Buton Linki"
                  value={data?.contactLink?.[activeLang] || ""}
                  onChange={(v) => setLangField("contactLink", v)}
                  placeholder="/iletisim"
                />
              </div>
            </div>

            {/* Let Us Call You */}
            <div className="rounded-xl border p-3 bg-gray-50">
              <h4 className="font-medium mb-2">☎️ Let Us Call You</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Buton Metni"
                  value={data?.letUsCallYouText?.[activeLang] || ""}
                  onChange={(v) => setLangField("letUsCallYouText", v)}
                  placeholder="Sizi Arayalım"
                  countRight
                />
                <Field
                  label="Buton Linki"
                  value={data?.letUsCallYouLink?.[activeLang] || ""}
                  onChange={(v) => setLangField("letUsCallYouLink", v)}
                  placeholder="/teklif"
                />
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="bg-white border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Sosyal Medya</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Tripadvisor"
                value={data?.social?.tripadvisor || ""}
                onChange={(v) => setData((p) => ({ ...p, social: { ...(p?.social || {}), tripadvisor: v } }))}
                placeholder="https://..."
              />
              <Field
                label="Google"
                value={data?.social?.google || ""}
                onChange={(v) => setData((p) => ({ ...p, social: { ...(p?.social || {}), google: v } }))}
                placeholder="https://..."
              />
              <Field
                label="Facebook"
                value={data?.social?.facebook || ""}
                onChange={(v) => setData((p) => ({ ...p, social: { ...(p?.social || {}), facebook: v } }))}
                placeholder="https://..."
              />
              <Field
                label="YouTube"
                value={data?.social?.youtube || ""}
                onChange={(v) => setData((p) => ({ ...p, social: { ...(p?.social || {}), youtube: v } }))}
                placeholder="https://..."
              />
              <Field
                label="Instagram"
                value={data?.social?.instagram || ""}
                onChange={(v) => setData((p) => ({ ...p, social: { ...(p?.social || {}), instagram: v } }))}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Kaydet */}
          <div className="flex items-center justify-end gap-2">
            {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-700 text-sm">{error}</div>}
            {success && <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-700 text-sm">{success}</div>}
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90 disabled:opacity-60"
            >
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Kaydediliyor…
                </span>
              ) : (
                "Kaydet"
              )}
            </button>
          </div>
        </div>

        {/* Sağ taraf: Canlı Önizleme + Menü Kartları */}
        <div className="space-y-6">
          {/* Önizleme */}
          <div className="border rounded-2xl overflow-hidden">
            <div className="bg-white px-4 py-3 border-b flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-24 h-10 relative">
                  {logoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logoSrc} alt="logo" className="absolute inset-0 w-full h-full object-contain" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-gray-400 text-xs border rounded">
                      LOGO
                    </div>
                  )}
                </div>
              </div>

              {/* Menü (aktif dil) */}
              <div className="hidden md:flex items-center gap-4">
                {(data?.menuItems || []).slice(0, 6).map((m, i) => (
                  <span key={i} className="text-sm text-gray-700">
                    {m.text?.[activeLang] || `Menu ${i + 1}`}
                  </span>
                ))}
              </div>

              {/* CTA + Telefon */}
              <div className="flex items-center gap-2">
                <a
                  href={data?.bookNowLink?.[activeLang] || "#"}
                  onClick={(e) => e.preventDefault()}
                  className="px-3 py-1.5 rounded bg-black text-white text-sm"
                >
                  {data?.bookNowText?.[activeLang] || "Book Now"}
                </a>
                <a
                  href={data?.contactLink?.[activeLang] || "#"}
                  onClick={(e) => e.preventDefault()}
                  className="px-3 py-1.5 rounded border text-sm"
                >
                  {data?.contactText?.[activeLang] || "Contact"}
                </a>
                <span className="ml-2 text-sm text-gray-700">{data?.phone || "+90 000 000 00 00"}</span>
              </div>
            </div>
            <div className="px-4 py-3 text-xs text-gray-600">
              Bu alan önizlemedir; canlı sitede düzen farklı olabilir.
            </div>
          </div>

          {/* Menü Öğeleri - Embla */}
          <div className="border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Menü Öğeleri (Aktif Dil: {activeLang.toUpperCase()})</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={addMenuItem}
                  className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  + Menü Ekle
                </button>
              </div>
            </div>

            {(data?.menuItems || []).length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-gray-600">
                Henüz menü öğesi yok. <button onClick={addMenuItem} className="underline">Ekle</button>.
              </div>
            ) : (
              <>
                <div ref={emblaRef} className="overflow-hidden">
                  <div className="flex gap-4">
                    {(data?.menuItems || []).map((item, idx) => (
                      <MenuCard
                        key={idx}
                        idx={idx}
                        item={item}
                        activeLang={activeLang}
                        onRemove={() => removeMenuItem(idx)}
                        onCopy={() => copyMenuActiveToOthers(idx)}
                        onSetText={(v) => setMenuItemLangField(idx, "text", v)}
                        onSetLink={(v) => setMenuItemLangField(idx, "link", v)}
                      />
                    ))}
                  </div>
                </div>

                {scrollSnaps.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {scrollSnaps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        className={`w-2.5 h-2.5 rounded-full ${i === selectedIndex ? "bg-black" : "bg-gray-300"}`}
                        aria-label={`Kart ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

/* --------- Küçük Bileşenler --------- */
function MenuCard({ idx, item, activeLang, onRemove, onCopy, onSetText, onSetLink }) {
  return (
    <div className="shrink-0 basis-[92%] sm:basis-[70%] md:basis-[48%] lg:basis-[40%]">
      <div className="border rounded-xl p-3 bg-gray-50 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <strong>Menu #{idx + 1}</strong>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="px-2 py-1 rounded border hover:bg-white text-xs"
              title="Aktif dil değerlerini diğer dillere kopyala"
            >
              ⇆ Dile Kopyala
            </button>
            <button type="button" onClick={onRemove} className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">
              Sil
            </button>
          </div>
        </div>

        <Field
          label={`Metin (${activeLang.toUpperCase()})`}
          value={item.text?.[activeLang] || ""}
          onChange={onSetText}
          placeholder="Örn: Hakkımızda"
          countRight
        />
        <Field
          label={`Link (${activeLang.toUpperCase()})`}
          value={item.link?.[activeLang] || ""}
          onChange={onSetLink}
          placeholder="/hakkimizda"
        />

        {/* Mini önizleme */}
        <div className="mt-2 rounded-lg bg-white border p-2 text-sm text-gray-800">
          <span className="px-2 py-1 rounded bg-black text-white text-xs">{item.text?.[activeLang] || "Menu"}</span>
          <span className="ml-2 text-xs text-gray-500">{item.link?.[activeLang] || "/"}</span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, textarea = false, rows = 3, countRight = false }) {
  const len = (value || "").length;
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {countRight && <span className="text-[11px] text-gray-500">{len}</span>}
      </div>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-white"
        />
      )}
    </div>
  );
}
