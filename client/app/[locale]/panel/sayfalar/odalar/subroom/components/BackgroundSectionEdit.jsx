"use client";
import { useRef, useState } from "react";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BackgroundSectionEdit({ data, setData }) {
  const bg = data.background || {
    subtitle: { tr: "", en: "", de: "", ru: "" },
    title: { tr: "", en: "", de: "", ru: "" },
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
    if (field === "image" || field === "link") {
      // Direkt field güncellemesi
      setData({
        ...data,
        background: {
          ...bg,
          [field]: value
        }
      });
    } else if (field === "subtitle" || field === "title") {
      // Dil bazlı güncelleme
      setData({
        ...data,
        background: {
          ...bg,
          [field]: {
            ...bg[field],
            [lang]: value
          }
        }
      });
    } else if (field === "texts") {
      // Array içindeki dil bazlı güncelleme
      const newTexts = [...bg.texts];
      newTexts[idx] = {
        ...newTexts[idx],
        [lang]: value
      };
      setData({
        ...data,
        background: {
          ...bg,
          texts: newTexts
        }
      });
    }
  };

  // Resim yükleme fonksiyonu - DEBUG VERSİYONU
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      
      console.log("Upload response:", result); // DEBUG
      
      if (!res.ok || !result.imageUrl) {
        throw new Error(result.error || "Yükleme başarısız");
      }
      
      console.log("Before state update - current bg:", bg); // DEBUG
      
      // Direkt state güncelleme - handleChange yerine
      const newData = {
        ...data,
        background: {
          ...bg,
          image: result.imageUrl
        }
      };
      
      console.log("New data to set:", newData); // DEBUG
      setData(newData);
      
      console.log("State updated successfully"); // DEBUG
      
    } catch (err) {
      console.error("Upload error:", err); // DEBUG
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
            src={`${apiUrl}${bg.image}`}
            alt="Background"
            className="w-32 h-24 object-cover rounded mt-2"
          />
        )}
      </div>

      {/* subtitle alanları */}
      <div className="mb-3">
        <label className="font-semibold block mb-1">subtitle</label>
        <div className="grid grid-cols-2 gap-2">
          {langs.map(lang => (
            <input
              key={lang}
              className="border p-2"
              placeholder={`subtitle (${lang})`}
              value={bg.subtitle?.[lang] || ""}
              onChange={e => handleChange("subtitle", e.target.value, null, lang)}
            />
          ))}
        </div>
      </div>

      {/* title alanları */}
      <div className="mb-3">
        <label className="font-semibold block mb-1">title</label>
        <div className="grid grid-cols-2 gap-2">
          {langs.map(lang => (
            <input
              key={lang}
              className="border p-2"
              placeholder={`title (${lang})`}
              value={bg.title?.[lang] || ""}
              onChange={e => handleChange("title", e.target.value, null, lang)}
            />
          ))}
        </div>
      </div>

      {/* Texts alanları */}
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

      {/* Link alanı */}
      <input
        className="border p-2 w-full"
        placeholder="Link"
        value={bg.link || ""}
        onChange={e => handleChange("link", e.target.value)}
      />
    </div>
  );
}