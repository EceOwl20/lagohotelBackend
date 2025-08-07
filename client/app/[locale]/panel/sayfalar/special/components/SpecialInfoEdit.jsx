"use client";
import React, { useState } from "react";
import ImageUploadInput from "../../../components/ImageUploadInput";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SpecialInfoEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState({});
  const info = data.infoSection || { subtitle: {}, title: {}, texts: [], image1: "", image2: "" };

  // Çok dilli alan değişiklikleri
  const handleChange = (field, lang, value) => {
    setData((prev) => ({
      ...prev,
      infoSection: {
        ...info,
        [field]: {
          ...info[field],
          [lang]: value,
        },
      },
    }));
  };

  // texts dizisini güncelle
  const handleTextsChange = (index, lang, value) => {
    const newTexts = [...(info.texts || [])];
    newTexts[index] = {
      ...(newTexts[index] || {}),
      [lang]: value,
    };
    setData((prev) => ({
      ...prev,
      infoSection: {
        ...info,
        texts: newTexts,
      },
    }));
  };

  const addTextBlock = () => {
    const empty = langs.reduce((acc, l) => ({ ...acc, [l]: "" }), {});
    setData((prev) => ({
      ...prev,
      infoSection: {
        ...info,
        texts: [...(info.texts || []), empty],
      },
    }));
  };

  const removeTextBlock = (index) => {
    const newTexts = [...(info.texts || [])];
    newTexts.splice(index, 1);
    setData((prev) => ({
      ...prev,
      infoSection: {
        ...info,
        texts: newTexts,
      },
    }));
  };

  // Image alanı değiştir
  const handleImageChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      infoSection: {
        ...info,
        [field]: value,
      },
    }));
  };

  // Image upload
  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((u) => ({ ...u, [field]: true }));

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Yükleme başarısız");

      const path = json.path || json.imageUrl;
      handleImageChange(field, path);
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading((u) => ({ ...u, [field]: false }));
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-bold text-2xl mb-4">Special Info Section</h3>

      {/* Subtitle ve Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {["subtitle", "title"].map((field) => (
          <div key={field}>
            <h4 className="font-semibold mb-2">{field}</h4>
            {langs.map((lang) => (
              <input
                key={lang}
                type="text"
                className="border rounded w-full p-2 mb-2"
                placeholder={`${field} (${lang})`}
                value={info[field]?.[lang] || ""}
                onChange={(e) => handleChange(field, lang, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>

      <hr className="my-6" />

      {/* Text blokları */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-xl">Texts</h4>
        <button
          className="px-4 py-2 rounded bg-green-600 text-white"
          onClick={addTextBlock}
        >
          + Text Ekle
        </button>
      </div>

      {(info.texts || []).map((block, index) => (
        <div key={index} className="border p-4 mb-4 rounded">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-semibold">Text {index + 1}</h5>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => removeTextBlock(index)}
            >
              Sil
            </button>
          </div>

          {langs.map((lang) => (
            <textarea
              key={lang}
              className="border rounded w-full p-2 mb-2"
              placeholder={`Text (${lang})`}
              rows={3}
              value={block?.[lang] || ""}
              onChange={(e) => handleTextsChange(index, lang, e.target.value)}
            />
          ))}
        </div>
      ))}

      <hr className="my-6" />

      {/* Image 1 ve 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["image1", "image2"].map((field) => (
          <div key={field}>
            <h6 className="font-semibold mb-2">{field}</h6>
            <ImageUploadInput
  value={info[field]}
  onChange={(url) => handleImageChange(field, url)}
  label={`Görsel (${field})`}
  className="mb-4"
/>

          </div>
        ))}
      </div>
    </div>
  );
}
