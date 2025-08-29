"use client";
import { useEffect, useState, useCallback } from "react";
import ImageUploadInput from "../../components/ImageUploadInput";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function updateIn(obj, path, updater) {
  if (path.length === 0) return updater(obj);
  const [head, ...rest] = path;
  const isIndex = typeof head === "number";

  if (isIndex) {
    const arr = Array.isArray(obj) ? obj : [];
    const next = arr.slice();
    next[head] = updateIn(arr[head], rest, updater);
    return next;
  } else {
    const src = obj && typeof obj === "object" ? obj : {};
    const next = { ...src };
    next[head] = updateIn(src[head], rest, updater);
    return next;
  }
}

function getIn(obj, path) {
  return path.reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

export default function CertificatePage() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  const setByPath = useCallback((path, value) => {
    setData((prev) => updateIn(prev ?? {}, path, () => value));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/pages/certificate`)
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch(() =>
        setData({
          slug: "certificate",
          banner: { image: "", span: {}, header: {}, opacity: false },
          section1: { image: "", subtitle: {}, title: {}, text: {} },
          certificates: { images: [] }
        })
      );
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${apiUrl}/api/pages/certificate`, {
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

  if (!data) return <p className="p-4">Yükleniyor…</p>;

const LangInputs = ({ label, basePath, as = "input", rows = 3 }) => {
  const current = getIn(data, basePath) || {};

  const handleChange = (lang, value) => {
    setData(prev =>
      updateIn(prev ?? {}, basePath, (obj) => ({
        ...(obj || {}),
        [lang]: value
      }))
    );
  };

  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">{label}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {langs.map((lang) => {
          const val = current[lang] ?? "";
          const placeholder = `${label} (${lang.toUpperCase()})`;

          return as === "textarea" ? (
            <textarea
              key={lang}
              rows={rows}
              className="border rounded p-2 w-full"
              placeholder={placeholder}
              value={val}
              onChange={(e) => handleChange(lang, e.target.value)}
            />
          ) : (
            <input
              key={lang}
              type="text"
              className="border rounded p-2 w-full"
              placeholder={placeholder}
              value={val}
              onChange={(e) => handleChange(lang, e.target.value)}
            />
          );
        })}
      </div>
    </div>
  );
};

  return (
    <div className="space-y-8 p-4">
      {/* === BANNER === */}
      <section className="p-4 border rounded bg-white">
        <h2 className="text-lg font-bold mb-4">Banner</h2>

        <ImageUploadInput
          label="Banner Görseli"
          value={data.banner?.image || ""}
          onChange={(val) => setByPath(["banner", "image"], val)}
        />

        <LangInputs label="Span (Alt Başlık)" basePath={["banner", "span"]} />
        <LangInputs label="Header (Başlık)" basePath={["banner", "header"]} />

        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={!!data.banner?.opacity}
            onChange={(e) => setByPath(["banner", "opacity"], e.target.checked)}
          />
          Koyu arka plan (opacity)
        </label>
      </section>

      {/* === SECTION 1 === */}
      <section className="p-4 border rounded bg-white">
        <h2 className="text-lg font-bold mb-4">Section 1</h2>

        <ImageUploadInput
          label="Section 1 Görseli"
          value={data.section1?.image || ""}
          onChange={(val) => setByPath(["section1", "image"], val)}
        />

        <LangInputs label="Alt Başlık" basePath={["section1", "subtitle"]} />
        <LangInputs label="Başlık" basePath={["section1", "title"]} />
        <LangInputs label="Metin" basePath={["section1", "text"]} as="textarea" rows={4} />
      </section>

      {/* === CERTIFICATES === */}
      <section className="p-4 border rounded bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Sertifikalar</h2>
          <button
            type="button"
            className="px-3 py-2 rounded bg-green-600 text-white"
            onClick={() =>
              setData((prev) =>
                updateIn(prev ?? {}, ["certificates", "images"], (list) => [
                  ...(Array.isArray(list) ? list : []),
                  ""
                ])
              )
            }
          >
            + Görsel Ekle
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {(data.certificates?.images || []).map((img, idx) => (
            <div key={idx} className="border rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <strong>Görsel #{idx + 1}</strong>
                <button
                  className="text-red-600"
                  onClick={() =>
                    setData((prev) =>
                      updateIn(prev, ["certificates", "images"], (list) =>
                        (list || []).filter((_, i) => i !== idx)
                      )
                    )
                  }
                >
                  Sil
                </button>
              </div>

              <ImageUploadInput
                value={img}
                onChange={(val) =>
                  setData((prev) =>
                    updateIn(prev, ["certificates", "images", idx], () => val)
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* === KAYDET === */}
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