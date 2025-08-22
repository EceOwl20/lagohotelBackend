"use client";
import { useEffect, useState, useCallback } from "react";
import ImageUploadInput from "../../components/ImageUploadInput";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  // ---- fetch
  useEffect(() => {
    fetch(`${apiUrl}/api/pages/ourpolicies`)
      .then((r) => r.json())
      .then((j) => setData(j))
      .catch(() =>
        setData({
          slug: "ourpolicies",
          banner: { image: "", subtitle: {}, title: {} },
          sustainabilityPolicy: { paragraphs: [] },
          infoBlocks: [],
          trainings: [],
        })
      );
  }, []);

  // ---- helpers
  const getIn = useCallback((obj, path) => {
    return path.reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
  }, []);

  const setLangField = useCallback((pathArray, lang, value) => {
    setData((prev) => {
      const next = structuredClone(prev ?? {});
      let t = next;
      for (let i = 0; i < pathArray.length; i++) t = t[pathArray[i]] ?? (t[pathArray[i]] = {});
      t[lang] = value;
      return next;
    });
  }, []);

  const setField = useCallback((pathArray, value) => {
    setData((prev) => {
      const next = structuredClone(prev ?? {});
      let t = next;
      for (let i = 0; i < pathArray.length - 1; i++) {
        const k = pathArray[i];
        t[k] = t[k] ?? (Number.isInteger(pathArray[i + 1]) ? [] : {});
        t = t[k];
      }
      t[pathArray[pathArray.length - 1]] = value;
      return next;
    });
  }, []);

  const pushToArray = useCallback((pathArray, item) => {
    setData((prev) => {
      const next = structuredClone(prev ?? {});
      let arr = next;
      for (let i = 0; i < pathArray.length; i++) {
        const k = pathArray[i];
        if (arr[k] == null) arr[k] = [];
        arr = arr[k];
      }
      arr.push(item);
      return next;
    });
  }, []);

  const removeFromArray = useCallback((pathArray, idx) => {
    setData((prev) => {
      const next = structuredClone(prev ?? {});
      let arr = next;
      for (let i = 0; i < pathArray.length; i++) arr = arr[pathArray[i]];
      arr.splice(idx, 1);
      return next;
    });
  }, []);

  // ---- save
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${apiUrl}/api/pages/ourpolicies`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  // ---- UI helpers (UNCONTROLLED + onBlur)
  const LangInputs = ({ label, basePath, as = "input", rows = 3 }) => {
    const obj = getIn(data, basePath) || {};
    return (
      <div className="mb-4">
        <h4 className="font-semibold mb-2">{label}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {langs.map((lang) => {
            const defaultVal = obj[lang] ?? "";
            const handleBlur = (e) => setLangField(basePath, lang, e.target.value);

            return as === "textarea" ? (
              <textarea
                key={lang}
                rows={rows}
                className="border rounded p-2 w-full"
                placeholder={`${label} (${lang.toUpperCase()})`}
                defaultValue={defaultVal}
                onBlur={handleBlur}
              />
            ) : (
              <input
                key={lang}
                type="text"
                className="border rounded p-2 w-full"
                placeholder={`${label} (${lang.toUpperCase()})`}
                defaultValue={defaultVal}
                onBlur={handleBlur}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto p-4">
      {/* BANNER */}
      <section className="p-4 border rounded bg-white">
        <h2 className="text-lg font-bold mb-4">Banner</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Banner Görseli</label>
          <ImageUploadInput
            value={data.banner?.image || ""}
            onChange={(v) => setField(["banner", "image"], v)}
          />
        </div>
        <LangInputs label="Alt Başlık" basePath={["banner", "subtitle"]} />
        <LangInputs label="Başlık" basePath={["banner", "title"]} />
      </section>

      {/* SÜRDÜRÜLEBİLİRLİK POLİTİKASI METNİ */}
      <section className="p-4 border rounded bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Sürdürülebilirlik Politikası Metni</h2>
          <button
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={() =>
              pushToArray(["sustainabilityPolicy", "paragraphs"], { text: {} })
            }
          >
            + Paragraf Ekle
          </button>
        </div>

        {(data.sustainabilityPolicy?.paragraphs || []).map((p, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="flex justify-between mb-2">
              <strong>Paragraf #{idx + 1}</strong>
              <button
                className="text-red-600"
                onClick={() =>
                  removeFromArray(["sustainabilityPolicy", "paragraphs"], idx)
                }
              >
                Sil
              </button>
            </div>
            <LangInputs
              label="Metin"
              basePath={["sustainabilityPolicy", "paragraphs", idx, "text"]}
              as="textarea"
              rows={4}
            />
          </div>
        ))}
      </section>

      {/* POLİTİKA / BİLGİ BLOKLARI */}
      <section className="p-4 border rounded bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Politika / Bilgi Blokları</h2>
          <button
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={() =>
              pushToArray(["infoBlocks"], {
                image: "",
                isImageLeft: false,
                span: {},
                title: {},
                text: {},
                text2: {},
                showLink: false,
                link: "",
              })
            }
          >
            + Blok Ekle
          </button>
        </div>

        {(data.infoBlocks || []).map((it, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="flex justify-between mb-2">
              <strong>Blok #{idx + 1}</strong>
              <button
                className="text-red-600"
                onClick={() => removeFromArray(["infoBlocks"], idx)}
              >
                Sil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
              <div>
                <label className="block font-semibold mb-1">Görsel</label>
                <ImageUploadInput
                  value={it.image || ""}
                  onChange={(v) => setField(["infoBlocks", idx, "image"], v)}
                />
              </div>
              <div className="flex items-end gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!it.isImageLeft}
                    onChange={(e) =>
                      setField(["infoBlocks", idx, "isImageLeft"], e.target.checked)
                    }
                  />
                  Görsel Solda
                </label>
              </div>
            </div>

            <LangInputs label="Span" basePath={["infoBlocks", idx, "span"]} />
            <LangInputs label="Başlık" basePath={["infoBlocks", idx, "title"]} />
            <LangInputs
              label="Metin"
              basePath={["infoBlocks", idx, "text"]}
              as="textarea"
              rows={3}
            />
            <LangInputs
              label="Metin 2"
              basePath={["infoBlocks", idx, "text2"]}
              as="textarea"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!it.showLink}
                  onChange={(e) =>
                    setField(["infoBlocks", idx, "showLink"], e.target.checked)
                  }
                />
                Link Göster
              </label>
              <input
                type="text"
                className="border rounded p-2"
                placeholder="/ornek-sayfa veya https://..."
                defaultValue={it.link || ""}
                onBlur={(e) => setField(["infoBlocks", idx, "link"], e.target.value)}
              />
            </div>
          </div>
        ))}
      </section>

      {/* EĞİTİMLER */}
      <section className="p-4 border rounded bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Eğitimler</h2>
          <button
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={() => pushToArray(["trainings"], { label: {}, href: "" })}
          >
            + Eğitim Ekle
          </button>
        </div>

        {(data.trainings || []).map((tr, idx) => (
          <div key={idx} className="border rounded p-3 mb-3">
            <div className="flex justify-between mb-2">
              <strong>Eğitim #{idx + 1}</strong>
              <button
                className="text-red-600"
                onClick={() => removeFromArray(["trainings"], idx)}
              >
                Sil
              </button>
            </div>

            <LangInputs label="Etiket (Label)" basePath={["trainings", idx, "label"]} />

            <label className="block font-semibold mb-1">Dosya / URL</label>
            <input
              type="text"
              className="border rounded p-2 w-full mb-2"
              placeholder="/documents/xxx.pptx veya https://..."
              defaultValue={tr.href || ""}
              onBlur={(e) => setField(["trainings", idx, "href"], e.target.value)}
            />
          </div>
        ))}
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