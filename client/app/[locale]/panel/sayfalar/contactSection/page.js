// app/[locale]/panel/.../components/ContactSection2Edit.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import ImageUploadInput from "../../components/ImageUploadInput"; // yolunuzu kontrol edin

export default function ContactSection2Edit() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Mevcut setData yapısını KORUYORUZ (tek state objesi)
  const [data, setData] = useState({
    subtitle: {},
    title: {},
    address: {},
    phone: {},
    callcenter: {},
    email: {},
    buttonText: {},
    social: { instagram: "", facebook: "", youtube: "", meta: "" },
    image: "",
  });

  const [loading, setLoading] = useState(true);

  /* ---------- Dil Topbar (SSR güvenli) ---------- */
  const LANGS = useMemo(() => ["tr", "en", "de", "ru"], []);
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

  /* ---------- Fetch ---------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/api/contactSection2`);
        const resData = await res.json();
        setData((prev) => ({ ...prev, ...resData }));
      } catch {
        // yut
      } finally {
        setLoading(false);
      }
    })();
  }, [apiUrl]);

  /* ---------- Helpers (setData yapısı korunuyor) ---------- */
  const handleMultiLangChange = (field, lang, value) => {
    setData((prev) => ({
      ...prev,
      [field]: { ...(prev[field] || {}), [lang]: value },
    }));
  };

  const handleSocialChange = (network, value) => {
    setData((prev) => ({
      ...prev,
      social: { ...(prev.social || {}), [network]: value },
    }));
  };

  const handleSave = async () => {
    await fetch(`${apiUrl}/api/contactSection2`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("Kaydedildi!");
  };

  const toSrc = (p) =>
    !p ? null : p.startsWith("http") ? p : `${apiUrl}${p.startsWith("/") ? "" : "/"}${p}`;

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      {/* Header + Dil Topbar */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent flex items-center justify-between">
        <h2 className="text-lg font-semibold">📞 İletişim Alanı Paneli</h2>

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
        {/* Genel metinler (aktif dil) */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">
            Genel Metinler ({(mounted ? activeLang : "tr").toUpperCase()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldText
              label="Alt Başlık"
              value={data.subtitle?.[activeLang] || ""}
              onChange={(v) => handleMultiLangChange("subtitle", activeLang, v)}
            />
            <FieldText
              label="Başlık"
              value={data.title?.[activeLang] || ""}
              onChange={(v) => handleMultiLangChange("title", activeLang, v)}
            />
            <FieldText
              label="Adres"
              value={data.address?.[activeLang] || ""}
              onChange={(v) => handleMultiLangChange("address", activeLang, v)}
            />
            <FieldText
              label="Telefon"
              value={data.phone?.[activeLang] || ""}
              onChange={(v) => handleMultiLangChange("phone", activeLang, v)}
            />
            <FieldText
              label="Çağrı Merkezi"
              value={data.callcenter?.[activeLang] || ""}
              onChange={(v) => handleMultiLangChange("callcenter", activeLang, v)}
            />
            <FieldText
              label="E-posta"
              value={data.email?.[activeLang] || ""}
              onChange={(v) => handleMultiLangChange("email", activeLang, v)}
            />
            <FieldText
              label="Buton Metni"
              value={data.buttonText?.[activeLang] || ""}
              onChange={(v) => handleMultiLangChange("buttonText", activeLang, v)}
            />
          </div>
        </div>

        {/* Sosyal medya linkleri */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-4">Sosyal Medya Linkleri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["instagram", "facebook", "youtube", "meta"].map((net) => (
              <FieldText
                key={net}
                label={net.charAt(0).toUpperCase() + net.slice(1)}
                value={data.social?.[net] || ""}
                onChange={(v) => handleSocialChange(net, v)}
              />
            ))}
          </div>
        </div>

        {/* Görsel */}
        <div className="rounded-xl ring-1 ring-black/5 p-4">
          <h3 className="font-semibold mb-3">İletişim Görseli</h3>
          <ImageUploadInput
            value={data.image || ""}
            onChange={(url) => setData((prev) => ({ ...prev, image: url }))}
            label="Görsel Yükle"
          />
          {toSrc(data.image) && (
            <img
              src={toSrc(data.image)}
              alt="İletişim görseli"
              className="mt-3 w-40 h-28 object-cover rounded ring-1 ring-black/10"
            />
          )}
        </div>

        {/* Kaydet */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Kaydet
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---- küçük input ---- */
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