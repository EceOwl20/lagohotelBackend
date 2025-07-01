"use client";
import { useRef, useState } from "react";

const langs = ["tr", "en", "de", "ru"];

export default function BackgroundSectionEdit({ data, setData }) {
  const bg = data.backgroundSection || {
    span: { tr: "", en: "", de: "", ru: "" },
    header: { tr: "", en: "", de: "", ru: "" },
    texts: [
      { tr: "", en: "", de: "", ru: "" },
      { tr: "", en: "", de: "", ru: "" },
      { tr: "", en: "", de: "", ru: "" }
    ],
    link: "",
    image: ""
  };
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value, idx, lang) => {
    setData(prev => {
      const updated = { ...bg };
      if (field === "image" || field === "link") {
        updated[field] = value;
      } else if (field === "span" || field === "header") {
        updated[field][lang] = value;
      } else if (field === "texts") {
        updated.texts[idx][lang] = value;
      }
      return { ...prev, backgroundSection: updated };
    });
  };

  // --- RESİM YÜKLEME FONKSİYONU ---
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok || !result.imageUrl) throw new Error(result.error || "Yükleme başarısız");
      handleChange("image", result.imageUrl);
    } catch (err) {
      setError("Resim yüklenemedi! " + (err?.message || ""));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">Background Section</h3>
      <div className="mb-3">
        <label className="font-semibold block mb-1">Görsel</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {uploading && <p className="text-blue-600">Yükleniyor...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {bg.image && (
          <img
            src={`http://localhost:5001${bg.image}`}
            alt="Background"
            className="w-32 h-24 object-cover rounded mt-2"
          />
        )}
      </div>
      {["span", "header"].map(field => (
        <div key={field} className="mb-3">
          <label className="font-semibold block mb-1">{field}</label>
          <div className="grid grid-cols-2 gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2"
                placeholder={`${field} (${lang})`}
                value={bg[field]?.[lang] || ""}
                onChange={e => handleChange(field, e.target.value, null, lang)}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="mb-3">
        <label className="font-semibold block mb-1">Açıklama Paragrafları</label>
        {bg.texts.map((text, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 mb-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2"
                placeholder={`Açıklama ${i + 1} (${lang})`}
                value={text?.[lang] || ""}
                onChange={e => handleChange("texts", e.target.value, i, lang)}
              />
            ))}
          </div>
        ))}
      </div>
      <input
        className="border p-2 w-full"
        placeholder="Link"
        value={bg.link || ""}
        onChange={e => handleChange("link", e.target.value)}
      />
    </div>
  );
}
