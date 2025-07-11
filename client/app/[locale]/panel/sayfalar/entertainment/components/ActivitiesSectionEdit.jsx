"use client";
import { useState } from "react";

export default function ActivitiesSectionEdit({ data, setData, langs }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const section = data.activitiesSection || {};
  const [uploading, setUploading] = useState({ image1: false, image2: false });

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(u => ({ ...u, [field]: true }));

    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData
      });
      const result = await res.json();
      if (!res.ok || !result.imageUrl) throw new Error(result.error || "Yükleme başarısız");

      const updated = {
        ...section,
        [field]: result.imageUrl
      };
      setData({ 
        ...data, 
        activitiesSection: updated 
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(u => ({ ...u, [field]: false }));
    }
  };

  const handleFieldChange = (key, lang, val) => {
    setData({
      ...data,
      activitiesSection: {
        ...section,
        [key]: { ...section[key], [lang]: val }
      }
    });
  };

  const handleInfoChange = (infoKey, field, lang, val) => {
    setData({
      ...data,
      activitiesSection: {
        ...section,
        [infoKey]: {
          ...section[infoKey],
          [field]: { ...section[infoKey]?.[field], [lang]: val }
        }
      }
    });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-4">Aktiviteler Bölümü</h4>

      {/* ——— Çok Dilli Metinler ——— */}
      {["subtitle", "title", "text"].map(key => (
        <div key={key} className="mb-4">
          <h5 className="font-semibold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {langs.map(lang => (
              <div key={lang} className="flex flex-col">
                <label className="text-sm mb-1">{lang.toUpperCase()}</label>
                {key === "text" ? (
                  <textarea
                    className="border p-2 rounded"
                    value={section.text?.[lang] || ""}
                    onChange={e => handleFieldChange("text", lang, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="border p-2 rounded"
                    value={section[key]?.[lang] || ""}
                    onChange={e => handleFieldChange(key, lang, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ——— Görseller ——— */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {["image1", "image2"].map(field => (
          <div key={field} className="flex flex-col">
            <label className="font-semibold mb-1">{field.toUpperCase()}</label>
            <input
              type="file"
              accept="image/*"
              disabled={uploading[field]}
              onChange={e => handleImageUpload(e, field)}
              className="mb-2"
            />
            {uploading[field] && <p className="text-sm text-gray-500">Yükleniyor…</p>}
            {section[field] && (
              <img
                src={section[field].startsWith("/") ? `${apiUrl}${section[field]}` : section[field]}
                alt={field}
                className="mt-1 h-32 object-cover border rounded"
              />
            )}
          </div>
        ))}
      </div>

      {/* ——— Info1 & Info2 Bölümleri ——— */}
      {["info1", "info2"].map(infoKey => (
        <div key={infoKey} className="mb-6">
          <h5 className="font-semibold mb-2">
            {infoKey === "info1" ? "Bilgi 1" : "Bilgi 2"}
          </h5>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["title", "text"].map(field => (
              <div key={field} className="flex flex-col">
                <label className="text-sm mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "text" ? (
                  <textarea
                    className="border p-2 rounded"
                    value={section[infoKey]?.[field]?.[langs[0]] || ""}
                    // not: langs[0] yerine her dilde ayrı olmasını istiyorsan, alt map'e al
                    onChange={e => handleInfoChange(infoKey, field, langs[0], e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="border p-2 rounded"
                    value={section[infoKey]?.[field]?.[langs[0]] || ""}
                    onChange={e => handleInfoChange(infoKey, field, langs[0], e.target.value)}
                  />
                )}
              </div>
            ))}
          </div> */}
          {/* Çok dilli info alanları */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {langs.map(lang => (
              <div key={lang} className="flex flex-col">
                <label className="text-xs mb-1">{lang.toUpperCase()}</label>
                <input
                  type="text"
                  className="border p-2 rounded"
                  placeholder={`Başlık (${lang})`}
                  value={section[infoKey]?.title?.[lang] || ""}
                  onChange={e => handleInfoChange(infoKey, "title", lang, e.target.value)}
                />
                <textarea
                  rows={2}
                  className="border p-2 rounded mt-2"
                  placeholder={`Metin (${lang})`}
                  value={section[infoKey]?.text?.[lang] || ""}
                  onChange={e => handleInfoChange(infoKey, "text", lang, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
