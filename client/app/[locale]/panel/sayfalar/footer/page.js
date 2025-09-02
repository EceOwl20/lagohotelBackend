"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const langs = ["tr", "en", "de", "ru"];
const emptyLangs = { tr: "", en: "", de: "", ru: "" };

const emptyQuickMenuItem = {
  title: { ...emptyLangs },
  links: [{ text: { ...emptyLangs }, url: "" }],
};
const emptyBottomLink = { text: { ...emptyLangs }, url: "" };

const defaultFooter = {
  social: { tripadvisor: "", google: "", facebook: "", youtube: "", instagram: "" },
  quickMenu: [],
  bottomLinks: [],
  contact: {
    phoneLabel: { ...emptyLangs },
    phone: "",
    callCenterLabel: { ...emptyLangs },
    callCenter: "",
    emailLabel: { ...emptyLangs },
    email: "",
    addressLabel: { ...emptyLangs },
    address: { ...emptyLangs },
  },
};

export default function FooterEditorPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [footer, setFooter] = useState(defaultFooter);
  const [loading, setLoading] = useState(true);
  const [activeLang, setActiveLang] = useState("tr");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* ---------- Fetch ---------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/api/footer`);
        if (!res.ok) throw new Error("Footer getirilemedi");
        const json = await res.json();
        setFooter(json || defaultFooter);
      } catch {
        setFooter(defaultFooter);
      } finally {
        setLoading(false);
      }
    })();
  }, [apiUrl]);

  /* ---------- Helpers: Section-level (contact) ---------- */
  const setContactLang = (key, value) =>
    setFooter((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: { ...(prev.contact[key] || {}), [activeLang]: value } },
    }));

  const setContactSingle = (key, value) =>
    setFooter((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }));

  const copyContactActiveToOthers = () => {
    const keys = ["phoneLabel", "callCenterLabel", "emailLabel", "addressLabel", "address"];
    setFooter((prev) => {
      const next = { ...prev, contact: { ...prev.contact } };
      keys.forEach((k) => {
        const base = { ...(prev.contact[k] || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => lng !== activeLang && (base[lng] = val));
        next.contact[k] = base;
      });
      return next;
    });
  };

  const clearContactActive = () => {
    const keys = ["phoneLabel", "callCenterLabel", "emailLabel", "addressLabel", "address"];
    setFooter((prev) => {
      const next = { ...prev, contact: { ...prev.contact } };
      keys.forEach((k) => (next.contact[k] = { ...(prev.contact[k] || {}), [activeLang]: "" }));
      return next;
    });
  };

  /* ---------- Quick Menu ops ---------- */
  const addQuickMenu = () => {
    setFooter((prev) => ({ ...prev, quickMenu: [...(prev.quickMenu || []), structuredClone(emptyQuickMenuItem)] }));
    setTimeout(() => quickEmblaApi?.scrollTo((footer.quickMenu?.length || 0)), 0);
  };
  const removeQuickMenu = (idx) =>
    setFooter((prev) => ({ ...prev, quickMenu: (prev.quickMenu || []).filter((_, i) => i !== idx) }));

  const setQuickMenuTitle = (idx, value) =>
    setFooter((prev) => {
      const items = [...(prev.quickMenu || [])];
      const row = items[idx] || structuredClone(emptyQuickMenuItem);
      row.title = { ...(row.title || {}), [activeLang]: value };
      items[idx] = row;
      return { ...prev, quickMenu: items };
    });

  const addQuickMenuLink = (idx) =>
    setFooter((prev) => {
      const items = [...(prev.quickMenu || [])];
      const row = items[idx] || structuredClone(emptyQuickMenuItem);
      row.links = [...(row.links || []), { text: { ...emptyLangs }, url: "" }];
      items[idx] = row;
      return { ...prev, quickMenu: items };
    });

  const removeQuickMenuLink = (idx, lidx) =>
    setFooter((prev) => {
      const items = [...(prev.quickMenu || [])];
      const row = items[idx];
      row.links = row.links.filter((_, j) => j !== lidx);
      items[idx] = row;
      return { ...prev, quickMenu: items };
    });

  const setQuickMenuLinkText = (idx, lidx, value) =>
    setFooter((prev) => {
      const items = [...(prev.quickMenu || [])];
      const row = items[idx];
      const link = row.links[lidx];
      link.text = { ...(link.text || {}), [activeLang]: value };
      row.links[lidx] = link;
      items[idx] = row;
      return { ...prev, quickMenu: items };
    });

  const setQuickMenuLinkUrl = (idx, lidx, value) =>
    setFooter((prev) => {
      const items = [...(prev.quickMenu || [])];
      const row = items[idx];
      row.links[lidx] = { ...(row.links[lidx] || {}), url: value };
      items[idx] = row;
      return { ...prev, quickMenu: items };
    });

  const copyQuickMenuActiveToOthers = (idx) =>
    setFooter((prev) => {
      const items = [...(prev.quickMenu || [])];
      const row = items[idx] || structuredClone(emptyQuickMenuItem);
      const baseTitle = { ...(row.title || {}) };
      const titleVal = baseTitle[activeLang] || "";
      langs.forEach((lng) => lng !== activeLang && (baseTitle[lng] = titleVal));
      row.title = baseTitle;

      const links = (row.links || []).map((l) => {
        const base = { ...(l.text || {}) };
        const val = base[activeLang] || "";
        langs.forEach((lng) => lng !== activeLang && (base[lng] = val));
        return { ...l, text: base };
      });
      row.links = links;

      items[idx] = row;
      return { ...prev, quickMenu: items };
    });

  /* ---------- Bottom Links ops ---------- */
  const addBottomLink = () =>
    setFooter((prev) => ({ ...prev, bottomLinks: [...(prev.bottomLinks || []), structuredClone(emptyBottomLink)] }));

  const removeBottomLink = (idx) =>
    setFooter((prev) => ({ ...prev, bottomLinks: (prev.bottomLinks || []).filter((_, i) => i !== idx) }));

  const setBottomLinkText = (idx, value) =>
    setFooter((prev) => {
      const arr = [...(prev.bottomLinks || [])];
      const row = arr[idx] || structuredClone(emptyBottomLink);
      row.text = { ...(row.text || {}), [activeLang]: value };
      arr[idx] = row;
      return { ...prev, bottomLinks: arr };
    });

  const setBottomLinkUrl = (idx, value) =>
    setFooter((prev) => {
      const arr = [...(prev.bottomLinks || [])];
      arr[idx] = { ...(arr[idx] || structuredClone(emptyBottomLink)), url: value };
      return { ...prev, bottomLinks: arr };
    });

  const copyBottomActiveToOthers = (idx) =>
    setFooter((prev) => {
      const arr = [...(prev.bottomLinks || [])];
      const row = arr[idx] || structuredClone(emptyBottomLink);
      const base = { ...(row.text || {}) };
      const val = base[activeLang] || "";
      langs.forEach((lng) => lng !== activeLang && (base[lng] = val));
      row.text = base;
      arr[idx] = row;
      return { ...prev, bottomLinks: arr };
    });

  /* ---------- Embla Carousels ---------- */
  const [quickEmblaRef, quickEmblaApi] = useEmblaCarousel({ dragFree: true, containScroll: "trimSnaps" });
  const [bottomEmblaRef, bottomEmblaApi] = useEmblaCarousel({ dragFree: true, containScroll: "trimSnaps" });

  const quickPrev = useCallback(() => quickEmblaApi?.scrollPrev(), [quickEmblaApi]);
  const quickNext = useCallback(() => quickEmblaApi?.scrollNext(), [quickEmblaApi]);

  const bottomPrev = useCallback(() => bottomEmblaApi?.scrollPrev(), [bottomEmblaApi]);
  const bottomNext = useCallback(() => bottomEmblaApi?.scrollNext(), [bottomEmblaApi]);

  /* ---------- Save ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/footer`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(footer),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Güncelleme başarısız");
      setSuccess("✅ Footer başarıyla güncellendi!");
    } catch (err) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Derived (preview) ---------- */
  const socialList = useMemo(
    () =>
      Object.entries(footer.social || {}).filter(([, v]) => v).map(([k, v]) => ({ key: k, url: v })),
    [footer.social]
  );

  if (loading) return <div className="p-6">Yükleniyor…</div>;

  return (
    <section className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Üst bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">🦶 Footer Düzenle</h1>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border overflow-hidden">
            {langs.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => setActiveLang(lng)}
                className={`px-3 py-1.5 text-sm transition ${activeLang === lng ? "bg-black text-white" : "hover:bg-gray-50"}`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copyContactActiveToOthers}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="İletişim alanlarını diğer dillere kopyala"
          >
            ⇆ İletişimi Kopyala
          </button>
          <button
            type="button"
            onClick={clearContactActive}
            className="px-3 py-1.5 rounded-lg border hover:bg-white transition text-sm"
            title="İletişim alanlarını temizle (aktif dil)"
          >
            🧹 İletişimi Temizle
          </button>
        </div>
      </div>

      {/* Grid: Sol (Formlar) | Sağ (Önizleme) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1  gap-6">
        {/* Sol: Formlar */}
        <div className="space-y-6">
          {/* Sosyal medya */}
          <div className="bg-white border rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Sosyal Medya Linkleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(footer.social).map((soc) => (
                <Field
                  key={soc}
                  label={soc.charAt(0).toUpperCase() + soc.slice(1)}
                  value={footer.social[soc] || ""}
                  onChange={(v) => setFooter((p) => ({ ...p, social: { ...(p.social || {}), [soc]: v } }))}
                  placeholder="https://..."
                />
              ))}
            </div>
          </div>

          {/* İletişim */}
          <div className="bg-white border rounded-2xl p-4 space-y-4">
            <h3 className="font-semibold">İletişim (Aktif Dil: {activeLang.toUpperCase()})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Telefon Label"
                value={footer.contact.phoneLabel?.[activeLang] || ""}
                onChange={(v) => setContactLang("phoneLabel", v)}
                placeholder="Telefon"
                countRight
              />
              <Field
                label="Telefon"
                value={footer.contact.phone || ""}
                onChange={(v) => setContactSingle("phone", v)}
                placeholder="+90 ..."
              />

              <Field
                label="Çağrı Merkezi Label"
                value={footer.contact.callCenterLabel?.[activeLang] || ""}
                onChange={(v) => setContactLang("callCenterLabel", v)}
                placeholder="Çağrı Merkezi"
                countRight
              />
              <Field
                label="Çağrı Merkezi"
                value={footer.contact.callCenter || ""}
                onChange={(v) => setContactSingle("callCenter", v)}
                placeholder="444 0 000"
              />

              <Field
                label="E-posta Label"
                value={footer.contact.emailLabel?.[activeLang] || ""}
                onChange={(v) => setContactLang("emailLabel", v)}
                placeholder="E-posta"
                countRight
              />
              <Field
                label="E-posta"
                value={footer.contact.email || ""}
                onChange={(v) => setContactSingle("email", v)}
                placeholder="info@otelin.com"
              />

              <Field
                label="Adres Label"
                value={footer.contact.addressLabel?.[activeLang] || ""}
                onChange={(v) => setContactLang("addressLabel", v)}
                placeholder="Adres"
                countRight
              />
              <Field
                label={`Adres (${activeLang.toUpperCase()})`}
                value={footer.contact.address?.[activeLang] || ""}
                onChange={(v) => setContactLang("address", v)}
                placeholder="Adres bilgisi…"
              />
            </div>
          </div>

          {/* Quick Menu - Embla */}
          <div className="bg-white border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Quick Menu (Aktif Dil: {activeLang.toUpperCase()})</h3>
              <div className="flex items-center gap-2">
                <button type="button" onClick={quickPrev} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">
                  ←
                </button>
                <button type="button" onClick={quickNext} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">
                  →
                </button>
                <button type="button" onClick={addQuickMenu} className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700">
                  + Menü Ekle
                </button>
              </div>
            </div>

            {(footer.quickMenu || []).length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-gray-600">
                Henüz menü yok. <button onClick={addQuickMenu} className="underline">Ekle</button>.
              </div>
            ) : (
              <div ref={quickEmblaRef} className="overflow-hidden">
                <div className="flex gap-4">
                  {(footer.quickMenu || []).map((item, idx) => (
                    <QuickMenuCard
                      key={idx}
                      idx={idx}
                      item={item}
                      activeLang={activeLang}
                      onRemove={() => removeQuickMenu(idx)}
                      onCopy={() => copyQuickMenuActiveToOthers(idx)}
                      onSetTitle={(v) => setQuickMenuTitle(idx, v)}
                      onAddLink={() => addQuickMenuLink(idx)}
                      onRemoveLink={(lidx) => removeQuickMenuLink(idx, lidx)}
                      onSetLinkText={(lidx, v) => setQuickMenuLinkText(idx, lidx, v)}
                      onSetLinkUrl={(lidx, v) => setQuickMenuLinkUrl(idx, lidx, v)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Alt Linkler - Embla (küçük kartlar) */}
          <div className="bg-white border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Alt Linkler (Aktif Dil: {activeLang.toUpperCase()})</h3>
              <div className="flex items-center gap-2">
                <button type="button" onClick={bottomPrev} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">
                  ←
                </button>
                <button type="button" onClick={bottomNext} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">
                  →
                </button>
                <button
                  type="button"
                  onClick={addBottomLink}
                  className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  + Alt Link Ekle
                </button>
              </div>
            </div>

            {(footer.bottomLinks || []).length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-gray-600">
                Henüz alt link yok. <button onClick={addBottomLink} className="underline">Ekle</button>.
              </div>
            ) : (
              <div ref={bottomEmblaRef} className="overflow-hidden">
                <div className="flex gap-4">
                  {(footer.bottomLinks || []).map((item, idx) => (
                    <BottomLinkCard
                      key={idx}
                      idx={idx}
                      item={item}
                      activeLang={activeLang}
                      onRemove={() => removeBottomLink(idx)}
                      onCopy={() => copyBottomActiveToOthers(idx)}
                      onSetText={(v) => setBottomLinkText(idx, v)}
                      onSetUrl={(v) => setBottomLinkUrl(idx, v)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Kaydet */}
          <div className="flex items-center justify-end gap-2">
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-700 text-sm">
                {success}
              </div>
            )}
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

        {/* Sağ: Canlı önizleme */}
        <div className="space-y-6">
          <div className="border rounded-2xl overflow-hidden">
            <div className="bg-black text-white p-6">
              {/* Üst: Quick Menus as columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(footer.quickMenu || []).slice(0, 6).map((m, i) => (
                  <div key={i}>
                    <p className="font-semibold">{m.title?.[activeLang] || `Menü ${i + 1}`}</p>
                    <ul className="mt-2 space-y-1 text-white/85 text-sm">
                      {(m.links || []).slice(0, 5).map((l, j) => (
                        <li key={j} className="hover:underline cursor-default">
                          {l.text?.[activeLang] || "Link"} {l.url ? "↗" : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Orta: Contact */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-white/70">{footer.contact.phoneLabel?.[activeLang] || "Telefon"}</p>
                  <p className="font-medium">{footer.contact.phone || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/70">{footer.contact.callCenterLabel?.[activeLang] || "Çağrı Merkezi"}</p>
                  <p className="font-medium">{footer.contact.callCenter || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/70">{footer.contact.emailLabel?.[activeLang] || "E-posta"}</p>
                  <p className="font-medium">{footer.contact.email || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/70">{footer.contact.addressLabel?.[activeLang] || "Adres"}</p>
                  <p className="font-medium">{footer.contact.address?.[activeLang] || "—"}</p>
                </div>
              </div>

              {/* Alt: social & bottom links */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-xs">
                  {socialList.length === 0 ? (
                    <span className="text-white/60">Sosyal link yok</span>
                  ) : (
                    socialList.map((s) => (
                      <span key={s.key} className="px-2 py-1 rounded bg-white/10">
                        {s.key}
                      </span>
                    ))
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/85">
                  {(footer.bottomLinks || []).slice(0, 8).map((b, i) => (
                    <span key={i} className="hover:underline cursor-default">
                      {b.text?.[activeLang] || "Link"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white px-4 py-3 text-xs text-gray-600">
              Bu alan önizlemedir; canlı sitede düzen farklı olabilir.
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

/* ---------- Cards ---------- */
function QuickMenuCard({
  idx,
  item,
  activeLang,
  onRemove,
  onCopy,
  onSetTitle,
  onAddLink,
  onRemoveLink,
  onSetLinkText,
  onSetLinkUrl,
}) {
  return (
    <div className="shrink-0 basis-[92%] sm:basis-[70%] md:basis-[48%] lg:basis-[40%]">
      <div className="border rounded-xl p-3 bg-gray-50 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <strong>Menü #{idx + 1}</strong>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onCopy} className="px-2 py-1 rounded border hover:bg-white text-xs">
              ⇆ Dile Kopyala
            </button>
            <button type="button" onClick={onRemove} className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">
              Sil
            </button>
          </div>
        </div>

        <Field
          label={`Başlık (${activeLang.toUpperCase()})`}
          value={item.title?.[activeLang] || ""}
          onChange={onSetTitle}
          placeholder="Örn: Kurumsal"
          countRight
        />

        <div className="mt-2 space-y-2">
          {(item.links || []).map((l, lidx) => (
            <div key={lidx} className="rounded-lg bg-white border p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Field
                  label={`Link Metni (${activeLang.toUpperCase()})`}
                  value={l.text?.[activeLang] || ""}
                  onChange={(v) => onSetLinkText(lidx, v)}
                  placeholder="Hakkımızda"
                  countRight
                />
                <Field
                  label="URL"
                  value={l.url || ""}
                  onChange={(v) => onSetLinkUrl(lidx, v)}
                  placeholder="/hakkimizda"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onRemoveLink(lidx)}
                  className="mt-2 px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-xs"
                >
                  Linki Sil
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={onAddLink}
            className="px-3 py-1.5 rounded-md bg-black text-white hover:bg-black/90 text-sm"
          >
            + Link Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomLinkCard({ idx, item, activeLang, onRemove, onCopy, onSetText, onSetUrl }) {
  return (
    <div className="shrink-0 basis-[80%] sm:basis-[60%] md:basis-[45%] lg:basis-[32%]">
      <div className="border rounded-xl p-3 bg-gray-50 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <strong>Alt Link #{idx + 1}</strong>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onCopy} className="px-2 py-1 rounded border hover:bg-white text-xs">
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
          placeholder="Gizlilik"
          countRight
        />
        <Field label="URL" value={item.url || ""} onChange={onSetUrl} placeholder="/gizlilik" />
      </div>
    </div>
  );
}

/* ---------- Small Field ---------- */
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
