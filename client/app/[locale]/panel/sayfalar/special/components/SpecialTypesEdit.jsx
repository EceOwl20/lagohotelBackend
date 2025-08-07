"use client";
import React, { useState } from "react";
import ImageUploadInput from "../../../components/ImageUploadInput";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SpecialTypesEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState({});
  const types = data.types || { subtitle: {}, title: {}, text: {}, items: [] };

  // Genel alan değişiklikleri
  const handleChange = (field, lang, value) => {
    setData((prev) => ({
      ...prev,
      types: {
        ...types,
        [field]: {
          ...types[field],
          [lang]: value,
        },
      },
    }));
  };

  // Item alan değişiklikleri
  const handleItemChange = (index, field, lang, value) => {
    const newItems = [...(types.items || [])];
    // çok dilli alanlar
    if (["subtitle", "title", "text", "key"].includes(field)) {
      newItems[index] = {
        ...newItems[index],
        [field]: {
          ...(newItems[index][field] || {}),
          [lang]: value,
        },
      };
    }
    // tekil alanlar
    else if (field === "image") {
      newItems[index] = {
        ...newItems[index],
        image: value,
      };
    }

    setData((prev) => ({
      ...prev,
      types: {
        ...types,
        items: newItems,
      },
    }));
  };

  const addItem = () => {
    const emptyLang = langs.reduce((acc, l) => ({ ...acc, [l]: "" }), {});
    const newItem = {
      subtitle: { ...emptyLang },
      title: { ...emptyLang },
      text: { ...emptyLang },
      key: { ...emptyLang },
      image: "",
    };
    setData((prev) => ({
      ...prev,
      types: {
        ...types,
        items: [...(types.items || []), newItem],
      },
    }));
  };

  const removeItem = (index) => {
    const newItems = [...(types.items || [])];
    newItems.splice(index, 1);
    setData((prev) => ({
      ...prev,
      types: {
        ...types,
        items: newItems,
      },
    }));
  };

  // --- handleImageUpload ---
  const handleImageUpload = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((u) => ({ ...u, [idx]: true }));

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Yükleme başarısız");

      const path = json.path || json.imageUrl; // backend'in döndürdüğü isimlerden biri
      handleItemChange(idx, "image", null, path);
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading((u) => ({ ...u, [idx]: false }));
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-bold text-2xl mb-4">Special Types Section</h3>

      {/* Üst alan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["subtitle", "title", "text"].map((field) => (
          <div key={field}>
            <h4 className="font-semibold mb-2">{field}</h4>
            {langs.map((lang) => (
              <input
                key={lang}
                type="text"
                className="border rounded w-full p-2 mb-2"
                placeholder={`${field} (${lang})`}
                value={types[field]?.[lang] || ""}
                onChange={(e) => handleChange(field, lang, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>

      <hr className="my-6" />

      {/* Items alanı */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-xl">Items</h4>
        <button
          className="px-4 py-2 rounded bg-green-600 text-white"
          onClick={addItem}
        >
          + Item Ekle
        </button>
      </div>

      {(types.items || []).map((item, index) => (
        <div key={index} className="border p-4 mb-4 rounded">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-semibold">Item {index + 1}</h5>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => removeItem(index)}
            >
              Sil
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["subtitle", "title", "text", "key"].map((field) => (
              <div key={field}>
                <h6 className="font-semibold mb-1">{field}</h6>
                {langs.map((lang) => (
                  <input
                    key={lang}
                    type="text"
                    className="border rounded w-full p-2 mb-2"
                    placeholder={`${field} (${lang})`}
                    value={item[field]?.[lang] || ""}
                    onChange={(e) =>
                      handleItemChange(index, field, lang, e.target.value)
                    }
                  />
                ))}
              </div>
            ))}

            <div>
              <h6 className="font-semibold mb-1">Image</h6>
             <ImageUploadInput
  value={item.image}
  onChange={(url) => handleItemChange(index, "image", null, url)}
  label={`Item ${index + 1} - Görsel`}
  className="mt-2"
/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
