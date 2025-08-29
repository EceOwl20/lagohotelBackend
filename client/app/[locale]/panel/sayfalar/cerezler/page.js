"use client";
import { useEffect, useState } from "react";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ---- küçük yardımcılar (hook DEĞİL) ----
const getIn = (obj, path) => path.reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
const setFieldImmutable = (prev, path, value) => {
  const next = structuredClone(prev ?? {});
  let t = next;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    if (t[k] == null) t[k] = Number.isInteger(path[i + 1]) ? [] : {};
    t = t[k];
  }
  t[path[path.length - 1]] = value;
  return next;
};
const pushImmutable = (prev, path, item) => {
  const next = structuredClone(prev ?? {});
  let a = next;
  for (let i = 0; i < path.length; i++) {
    const k = path[i];
    if (a[k] == null) a[k] = [];
    a = a[k];
  }
  a.push(item);
  return next;
};
const removeImmutable = (prev, path, idx) => {
  const next = structuredClone(prev ?? {});
  let a = next;
  for (let i = 0; i < path.length; i++) a = a[path[i]];
  a.splice(idx, 1);
  return next;
};

// ---- boş şablon (modeline uygun) ----
const emptyDoc = {
  slug: "cookies",
  barTexts: {
    cookie: { tr: "", en: "", de: "", ru: "" },
    cookieText: { tr: "", en: "", de: "", ru: "" },
    read: { tr: "", en: "", de: "", ru: "" },
    about: { tr: "", en: "", de: "", ru: "" },
    deny: { tr: "", en: "", de: "", ru: "" },
    accept: { tr: "", en: "", de: "", ru: "" },
    manage: { tr: "", en: "", de: "", ru: "" },
  },
  tabs: [
    { key: "policy",        title: { tr: "", en: "", de: "", ru: "" }, content: { tr: "", en: "", de: "", ru: "" } },
    { key: "clarification", title: { tr: "", en: "", de: "", ru: "" }, content: { tr: "", en: "", de: "", ru: "" } },
    { key: "what",          title: { tr: "", en: "", de: "", ru: "" }, content: { tr: "", en: "", de: "", ru: "" } },
  ],
  toggles: [
    { key: "necessary",   title: { tr: "", en: "", de: "", ru: "" }, description: { tr: "", en: "", de: "", ru: "" } },
    { key: "performance", title: { tr: "", en: "", de: "", ru: "" }, description: { tr: "", en: "", de: "", ru: "" } },
    { key: "functional",  title: { tr: "", en: "", de: "", ru: "" }, description: { tr: "", en: "", de: "", ru: "" } },
    { key: "targeting",   title: { tr: "", en: "", de: "", ru: "" }, description: { tr: "", en: "", de: "", ru: "" } },
  ],
};

export default function CookiesPanelPage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");

  // -------- LOAD (KidsClub sayfası gibi basit) --------
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${apiUrl}/api/pages/cookies`, { cache: "no-store" });
        if (!r.ok) throw new Error(`GET /cookies ${r.status}`);
        const json = await r.json();

        // API bazen {cookiePage: {...}} veya direkt {...} dönebilir; normalize edelim:
        const page = json?.cookiePage ? json.cookiePage : json;

        // boş yerleri şablonla doldur
        setData({ ...emptyDoc, ...(page || {}) });
      } catch (e) {
        console.warn("Cookies GET error:", e);
        setData(structuredClone(emptyDoc));
      }
    })();
  }, []);

  // -------- helpers (hook olmayan) --------
  const setField = (path, value) =>
    setData(prev => setFieldImmutable(prev, path, value));

  const setLangField = (basePath, lang, val) =>
    setData(prev => setFieldImmutable(prev, [...basePath, lang], val));

  const pushToArray = (path, item) =>
    setData(prev => pushImmutable(prev, path, item));

  const removeFromArray = (path, idx) =>
    setData(prev => removeImmutable(prev, path, idx));

  // -------- SAVE (KidsClub mantığı + token) --------
  const handleSave = async () => {
    setStatus("Yükleniyor...");
    try {
      const res = await fetch(`${apiUrl}/api/pages/cookies`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (typeof window !== "undefined" ? localStorage.getItem("token") : "")
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Kaydetme hatası (${res.status}) ${txt}`);
      }
      const saved = await res.json().catch(() => null);
      if (saved) {
        const page = saved?.cookiePage ? saved.cookiePage : saved;
        setData({ ...emptyDoc, ...(page || {}) });
      }
      setStatus("Kaydedildi!");
    } catch (err) {
      console.error(err);
      setStatus("Kaydetme hatası!");
    }
  };

  if (!data) return <p>Yükleniyor...</p>;

  // -------- Reusable dil girişleri (UNCONTROLLED: blur’da state’e yazar) --------
  const LangInputs = ({ label, basePath, as = "input", rows = 3 }) => {
    const obj = getIn(data, basePath) || {};
    return (
      <div className="mb-4">
        <h4 className="font-semibold mb-2">{label}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {langs.map((lang) => {
            const dv = obj[lang] ?? "";
            const onBlur = (e) => setLangField(basePath, lang, e.target.value);
            return as === "textarea" ? (
              <textarea
                key={lang}
                rows={rows}
                className="border rounded p-2 w-full"
                placeholder={`${label} (${lang.toUpperCase()})`}
                defaultValue={dv}
                onBlur={onBlur}
              />
            ) : (
              <input
                key={lang}
                type="text"
                className="border rounded p-2 w-full"
                placeholder={`${label} (${lang.toUpperCase()})`}
                defaultValue={dv}
                onBlur={onBlur}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">
      <h2 className="font-bold text-3xl mb-4">Çerez (Cookie) Paneli</h2>

      {/* BAR TEXTS */}
      <section className="p-4 border rounded bg-white">
        <h3 className="text-lg font-bold mb-4">Alt Çubuk (Bar) Metinleri</h3>
        <LangInputs label="Cookie (kısa başlık)" basePath={["barTexts","cookie"]} />
        <LangInputs label="CookieText (kısa açıklama)" basePath={["barTexts","cookieText"]} as="textarea" rows={3}/>
        <LangInputs label="Read (link yazısı)" basePath={["barTexts","read"]} />
        <LangInputs label="About (linkin devamı)" basePath={["barTexts","about"]} />
        <LangInputs label="Deny" basePath={["barTexts","deny"]} />
        <LangInputs label="Accept" basePath={["barTexts","accept"]} />
        <LangInputs label="Manage" basePath={["barTexts","manage"]} />
      </section>

      {/* TABS */}
      <section className="p-4 border rounded bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Modal Sekmeleri (Tabs)</h3>
          <button
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={() => pushToArray(["tabs"], { key: "custom", title: {}, content: {} })}
          >
            + Sekme Ekle
          </button>
        </div>

        {(data.tabs || []).map((tab, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="flex justify-between mb-2">
              <strong>Sekme #{idx + 1} ({tab.key})</strong>
              <button
                className="text-red-600"
                onClick={() => removeFromArray(["tabs"], idx)}
              >
                Sil
              </button>
            </div>

            <input
              className="border rounded p-2 w-full mb-3"
              placeholder="key (ör: policy/clarification/what)"
              defaultValue={tab.key || ""}
              onBlur={(e) => setField(["tabs", idx, "key"], e.target.value)}
            />
            <LangInputs label="Sekme Başlığı" basePath={["tabs", idx, "title"]} />
            <LangInputs label="Sekme İçeriği" basePath={["tabs", idx, "content"]} as="textarea" rows={6}/>
          </div>
        ))}
      </section>

      {/* TOGGLES */}
      <section className="p-4 border rounded bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Kategoriler (Toggle/Dropdown)</h3>
        <button
          className="px-3 py-2 bg-green-600 text-white rounded"
          onClick={() => pushToArray(["toggles"], { key: "new", title: {}, description: {} })}
        >
          + Kategori Ekle
        </button>
        </div>

        {(data.toggles || []).map((it, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="flex justify-between mb-2">
              <strong>Kategori #{idx + 1} ({it.key})</strong>
              <button
                className="text-red-600"
                onClick={() => removeFromArray(["toggles"], idx)}
              >
                Sil
              </button>
            </div>

            <input
              className="border rounded p-2 w-full mb-3"
              placeholder="key (necessary/performance/functional/targeting)"
              defaultValue={it.key || ""}
              onBlur={(e) => setField(["toggles", idx, "key"], e.target.value)}
            />
            <LangInputs label="Başlık" basePath={["toggles", idx, "title"]} />
            <LangInputs label="Açıklama" basePath={["toggles", idx, "description"]} as="textarea" rows={4}/>
          </div>
        ))}
      </section>

      {/* SAVE */}
      <button
        className="mt-2 px-6 py-3 rounded bg-blue-600 text-white font-bold max-w-[200px]"
        onClick={handleSave}
      >
        Kaydet
      </button>
      <p className="mt-2 text-lg text-green-800">{status}</p>
    </div>
  );
}