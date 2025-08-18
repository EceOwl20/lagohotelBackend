"use client";
import { useEffect, useState, useCallback } from "react";
import ImageUploadInput from "../../components/ImageUploadInput";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// --- immutable helpers ---
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

export default function Page() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  // tek noktadan güncelleme
  const setByPath = useCallback((path, value) => {
    setData(prev => updateIn(prev ?? {}, path, () => value));
  }, []);
  const setLangField = useCallback((basePath, lang, value) => {
    setData(prev => updateIn(prev ?? {}, [...basePath, lang], () => value));
  }, []);

  // load
  useEffect(() => {
    fetch(`${apiUrl}/api/pages/sustainability`)
      .then(r => r.json())
      .then(json => setData(json))
      .catch(() => setData({
        slug: "sustainability",
        banner: { image: "", subtitle: {}, title: {} },
        documentUrl: "",
        places: []
      }));
  }, []);

  // save
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${apiUrl}/api/pages/sustainability`, {
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

  // küçük yardımcı: çok dilli input grubu
  const LangInputs = ({ label, basePath, as = "input", rows = 3 }) => (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">{label}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {langs.map(lang => {
          const obj = getIn(data, basePath) || {};
          const val = obj[lang] ?? "";
          const onChange = (v) => setLangField(basePath, lang, v);
          return as === "textarea" ? (
            <textarea
              key={lang}
              rows={rows}
              className="border rounded p-2 w-full"
              placeholder={`${label} (${lang.toUpperCase()})`}
              value={val}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <input
              key={lang}
              type="text"
              className="border rounded p-2 w-full"
              placeholder={`${label} (${lang.toUpperCase()})`}
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
            onChange={(val) => setByPath(["banner","image"], val)}
          />
        </div>

        <LangInputs label="Alt Başlık" basePath={["banner","subtitle"]} />
        <LangInputs label="Başlık"     basePath={["banner","title"]} />
      </section>

      {/* DOKÜMAN LİNKİ */}
      <section className="p-4 border rounded bg-white">
        <h2 className="text-lg font-bold mb-2">Sürdürülebilirlik Raporu</h2>
        <p className="text-sm text-gray-600 mb-2">
          Dosya URL’si: (örn. <code>/documents/SürdürülebilirlikRaporu2024-2025.pptx</code> veya tam URL)
        </p>
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="/documents/xxx.pptx veya https://…"
          value={data.documentUrl || ""}
          onChange={(e) => setByPath(["documentUrl"], e.target.value)}
        />
      </section>

      {/* GEZİ / LİSTESİ */}
      <section className="p-4 border rounded bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Gezilecek Yerler</h2>
          <button
            type="button"
            className="px-3 py-2 rounded bg-green-600 text-white"
            onClick={() =>
              setData(prev =>
                updateIn(prev ?? { places: [] }, ["places"], (list) => [
                  ...(Array.isArray(list) ? list : []),
                  { image: "", title: {}, text: {}, distance: "" }
                ])
              )
            }
          >
            + Yer Ekle
          </button>
        </div>

        {(data.places || []).map((item, idx) => {
          const imgFull = item.image?.startsWith("/")
            ? `${apiUrl}${item.image}` : item.image || "";

          return (
            <div key={idx} className="border rounded p-3 mb-4">
              <div className="flex items-center justify-between mb-3">
                <strong>Yer #{idx + 1}</strong>
                <button
                  className="text-red-600"
                  onClick={() =>
                    setData(prev =>
                      updateIn(prev, ["places"], (list) =>
                        (list || []).filter((_, i) => i !== idx)
                      )
                    )
                  }
                >
                  Sil
                </button>
              </div>

              {/* Görsel */}
              <div className="mb-3">
                <label className="block font-semibold mb-1">Görsel</label>
                <ImageUploadInput
                  value={item.image || ""}
                  onChange={(val) =>
                    setData(prev =>
                      updateIn(prev, ["places", idx, "image"], () => val)
                    )
                  }
                />
                {imgFull && (
                  <img
                    src={imgFull}
                    alt="Önizleme"
                    className="mt-2 h-28 rounded border object-cover"
                  />
                )}
              </div>

              {/* Çok dilli başlık & metin */}
              <LangInputs label="Başlık" basePath={["places", idx, "title"]} />
              <LangInputs label="Metin"  basePath={["places", idx, "text"]} as="textarea" rows={3} />

              {/* Mesafe */}
              <div className="mt-2">
                <label className="block font-semibold mb-1">Mesafe</label>
                <input
                  type="text"
                  className="border rounded p-2 w-full"
                  placeholder='örn. "5 km"'
                  value={item.distance || ""}
                  onChange={(e) =>
                    setData(prev =>
                      updateIn(prev, ["places", idx, "distance"], () => e.target.value)
                    )
                  }
                />
              </div>
            </div>
          );
        })}
      </section>

      {/* KAYDET */}
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