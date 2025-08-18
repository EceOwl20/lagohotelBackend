"use client";
import { useEffect, useState, useCallback } from "react";
import ImageUploadInput from "../../components/ImageUploadInput";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ---- IMMUTABLE HELPER’LAR
// path: (string|number)[]
function updateIn(obj, path, updater) {
  if (path.length === 0) return updater(obj);

  const [head, ...rest] = path;
  const isIndex = typeof head === "number";

  if (isIndex) {
    const arr = Array.isArray(obj) ? obj : [];
    const next = arr.slice(); // sığ kopya
    next[head] = updateIn(arr[head], rest, updater);
    return next;
  } else {
    const src = obj && typeof obj === "object" ? obj : {};
    const next = { ...src }; // sığ kopya
    next[head] = updateIn(src[head], rest, updater);
    return next;
  }
}

function getIn(obj, path) {
  return path.reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

export default function Page() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  // tek noktadan güvenli güncelleme:
  const setByPath = useCallback((path, value) => {
    setData(prev => updateIn(prev ?? {}, path, () => value));
  }, []);

  const setLangField = useCallback((basePath, lang, value) => {
    setData(prev => updateIn(prev ?? {}, [...basePath, lang], () => value));
  }, []);

  // ---- load
  useEffect(() => {
    fetch(`${apiUrl}/api/pages/blognews`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(() => setData({ slug: "blognews" }));
  }, []);

  // ---- save
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${apiUrl}/api/pages/blognews`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Kaydetme hatası");
      alert("Kaydedildi ✅");
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <p>Yükleniyor…</p>;

  // UI helpers
  const LangInputs = ({ label, basePath, as = "input", rows = 3, placeholderPrefix = "" }) => (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">{label}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {langs.map(lang => {
          const currentObj = getIn(data, basePath) || {};
          const val = currentObj[lang] ?? "";
          const onChange = (v) => setLangField(basePath, lang, v);

          return as === "textarea" ? (
            <textarea
              key={lang}
              rows={rows}
              className="border rounded p-2 w-full"
              placeholder={`${placeholderPrefix}${label} (${lang.toUpperCase()})`}
              value={val}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <input
              key={lang}
              type="text"
              className="border rounded p-2 w-full"
              placeholder={`${placeholderPrefix}${label} (${lang.toUpperCase()})`}
              value={val}
              onChange={(e) => onChange(e.target.value)}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* BANNER */}
      <section className="p-4 border rounded bg-white">
        <h2 className="text-lg font-bold mb-4">Banner</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Banner Görseli</label>
          <ImageUploadInput
            value={data.banner?.image || ""}
            onChange={(val) => setByPath(["banner", "image"], val)}
          />
        </div>
        <LangInputs label="Alt Başlık" basePath={["banner", "subtitle"]} />
        <LangInputs label="Başlık" basePath={["banner", "title"]} />
      </section>

      {/* SECTION (Mission/Vision alanı gibi) */}
      <section className="p-4 border rounded bg-white">
        <h2 className="text-lg font-bold mb-4">Bilgi Bölümü</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block font-semibold mb-1">Sol Görsel</label>
            <ImageUploadInput
              value={data.section?.leftImg || ""}
              onChange={(val) => setByPath(["section", "leftImg"], val)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Sağ Görsel</label>
            <ImageUploadInput
              value={data.section?.rightImg || ""}
              onChange={(val) => setByPath(["section", "rightImg"], val)}
            />
          </div>
        </div>

        <LangInputs label="Alt Başlık" basePath={["section", "subtitle"]} />
        <LangInputs label="Başlık" basePath={["section", "title"]} />
        <LangInputs label="Metin" basePath={["section", "text"]} as="textarea" rows={4} />

        <hr className="my-4" />
        <h3 className="font-bold mb-2">Alt Blok 1</h3>
        <LangInputs label="Alt Başlık 1" basePath={["section", "secsubtitle1"]} />
        <LangInputs label="Başlık 1" basePath={["section", "sectitle1"]} />
        <LangInputs label="Metin 1" basePath={["section", "sectext1"]} as="textarea" rows={3} />

        <hr className="my-4" />
        <h3 className="font-bold mb-2">Alt Blok 2</h3>
        <LangInputs label="Alt Başlık 2" basePath={["section", "secsubtitle2"]} />
        <LangInputs label="Başlık 2" basePath={["section", "sectitle2"]} />
        <LangInputs label="Metin 2" basePath={["section", "sectext2"]} as="textarea" rows={3} />
      </section>

      {/* NEWS LIST */}
      <section className="p-4 border rounded bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Haber Kartları</h2>
          <button
            type="button"
            className="px-3 py-2 rounded bg-green-600 text-white"
            onClick={() =>
              setData(prev =>
                updateIn(prev ?? { newsItems: [] }, ["newsItems"], (list) => [
                  ...(Array.isArray(list) ? list : []),
                  { image: "", subtitle: {}, title: {}, description: {}, link: "" }
                ])
              )
            }
          >
            + Haber Ekle
          </button>
        </div>

        {(data.newsItems || []).map((item, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="flex items-center justify-between mb-3">
              <strong>Haber #{idx + 1}</strong>
              <button
                className="text-red-600"
                onClick={() =>
                  setData(prev =>
                    updateIn(prev, ["newsItems"], (list) =>
                      (list || []).filter((_, i) => i !== idx)
                    )
                  )
                }
              >
                Sil
              </button>
            </div>

            <div className="mb-3">
              <label className="block font-semibold mb-1">Görsel</label>
              <ImageUploadInput
                value={item.image || ""}
                onChange={(val) =>
                  setData(prev =>
                    updateIn(prev, ["newsItems", idx, "image"], () => val)
                  )
                }
              />
            </div>

            {/* Çok dilli alanlar */}
            <LangInputs label="Alt Başlık" basePath={["newsItems", idx, "subtitle"]} />
            <LangInputs label="Başlık" basePath={["newsItems", idx, "title"]} />
            <LangInputs label="Açıklama" basePath={["newsItems", idx, "description"]} as="textarea" rows={3} />

            {/* Link */}
            <div className="mt-2">
              <label className="block font-semibold mb-1">Link</label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                placeholder="/ornek-sayfa veya https://..."
                value={item.link || ""}
                onChange={(e) =>
                  setData(prev =>
                    updateIn(prev, ["newsItems", idx, "link"], () => e.target.value)
                  )
                }
              />
            </div>
          </div>
        ))}
      </section>

      {/* BUTTON TEXT */}
      <section className="p-4 border rounded bg-white">
        <h2 className="text-lg font-bold mb-2">Buton Metni</h2>
        <LangInputs label="Buton" basePath={["buttonText"]} />
      </section>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </div>
    </div>
  );
}