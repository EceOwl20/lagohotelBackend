// components/OtherOptions4Edit.jsx
"use client";
import React, { useState } from "react";

const langs = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "İngilizce" },
  { key: "de", label: "Almanca" },
  { key: "ru", label: "Rusça" }
];

export default function OtherOptions4Edit({ data, setData, blockName }) {
  const arr = data[blockName] || [];
  const [uploading, setUploading] = useState({});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Alt öğe şablonu (cuisinesItemSchema'ye göre)
  const makeEmptySub = () => {
    const sub = { image: "", link: "" };
    langs.forEach(({ key }) => {
      sub.title    = { ...(sub.title    || {}), [key]: "" };
      sub.subtitle = { ...(sub.subtitle || {}), [key]: "" };
      sub.text     = { ...(sub.text     || {}), [key]: "" };
    });
    return sub;
  };

  // Alt öge görsel yükleme - CuisinesEdit mantığına göre düzeltildi
  const handleSubImageUpload = async (e, idx, subIdx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const key = `${idx}-${subIdx}`;
    setUploading(u => ({ ...u, [key]: true }));
    
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData
      });
      const result = await res.json();
      
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      
      // Local state güncelleme
      const updated = [...arr];
      // Alt öğe dizisini her zaman 4 elemanlı tut
      if (!Array.isArray(updated[idx].cuisine) || updated[idx].cuisine.length !== 4) {
        updated[idx].cuisine = Array.from({ length: 4 }, makeEmptySub);
      }
      
      // CuisinesEdit'teki gibi imageUrl kullan
      updated[idx].cuisine[subIdx].image = result.imageUrl;
      
      // State'i güncelle
      setData({ ...data, [blockName]: updated });
      
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(u => ({ ...u, [key]: false }));
    }
  };

  // Ana seviye çokdilli alan değişimi
  const handleMainLangChange = (idx, field, lang, value) => {
    const updated = [...arr];
    updated[idx][field] = { ...(updated[idx][field] || {}), [lang]: value };
    setData({ ...data, [blockName]: updated });
  };

  // Alt öğe çokdilli değişimi
  const handleSubLangChange = (idx, subIdx, field, lang, value) => {
    const updated = [...arr];
    if (!Array.isArray(updated[idx].cuisine) || updated[idx].cuisine.length !== 4) {
      updated[idx].cuisine = Array.from({ length: 4 }, makeEmptySub);
    }
    updated[idx].cuisine[subIdx][field] = {
      ...(updated[idx].cuisine[subIdx][field] || {}),
      [lang]: value
    };
    setData({ ...data, [blockName]: updated });
  };

  // Alt öğe link değişimi
  const handleSubLinkChange = (idx, subIdx, value) => {
    const updated = [...arr];
    if (!Array.isArray(updated[idx].cuisine) || updated[idx].cuisine.length !== 4) {
      updated[idx].cuisine = Array.from({ length: 4 }, makeEmptySub);
    }
    updated[idx].cuisine[subIdx].link = value;
    setData({ ...data, [blockName]: updated });
  };

  // Yeni ana öğe ekle
  const addItem = () => {
    const empty = {
      title:    {},
      subtitle: {},
      text:     {},
      cuisine:  Array.from({ length: 4 }, makeEmptySub)
    };
    langs.forEach(({ key }) => {
      empty.title[key]    = "";
      empty.subtitle[key] = "";
      empty.text[key]     = "";
    });
    setData({ ...data, [blockName]: [...arr, empty] });
  };

  // Ana öğe sil
  const removeItem = idx => {
    setData({ ...data, [blockName]: arr.filter((_, i) => i !== idx) });
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">{blockName}</h3>
      <button
        type="button"
        className="mb-3 px-4 py-1 bg-green-600 text-white rounded"
        onClick={addItem}
      >
        + Ekle
      </button>

      {arr.map((item, idx) => {
        // Alt öğe dizisini her zaman 4 elemanlı tut
        const subs = Array.isArray(item.cuisine) && item.cuisine.length === 4
          ? item.cuisine
          : Array.from({ length: 4 }, makeEmptySub);

        return (
          <div key={idx} className="border rounded p-4 mb-6 bg-gray-50">
            <div className="flex justify-between mb-4">
              <strong>Öğe #{idx + 1}</strong>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => removeItem(idx)}
              >
                Sil
              </button>
            </div>

            {/* Ana metin alanları */}
            {["title","subtitle","text"].map(field => (
              <div key={field} className="mb-4">
                <label className="font-semibold block mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {langs.map(({ key, label }) => (
                    <input
                      key={key}
                      type="text"
                      placeholder={label}
                      value={item[field]?.[key] || ""}
                      onChange={e => handleMainLangChange(idx, field, key, e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Alt öğeler */}
            <div className="mt-6 space-y-6">
              <h4 className="font-semibold mb-2">Alt Öğeler (Tam 4 adet)</h4>
              {subs.map((sub, subIdx) => (
                <div key={subIdx} className="p-3 bg-white rounded border">
                  <strong className="block mb-2">Alt #{subIdx + 1}</strong>

                  {/* Görsel - CuisinesEdit mantığına göre düzeltildi */}
                  <div className="mb-3">
                    <label className="font-semibold block mb-1">Görsel Yükle</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleSubImageUpload(e, idx, subIdx)}
                        disabled={uploading[`${idx}-${subIdx}`]}
                      />
                      {uploading[`${idx}-${subIdx}`] && (
                        <span className="text-blue-500">Yükleniyor...</span>
                      )}
                      {sub.image && (
                        <img
                          src={`${apiUrl}${sub.image}`}
                          alt="sub-item"
                          className="w-24 h-16 object-cover border rounded"
                        />
                      )}
                    </div>
                  </div>

                  {/* Alt metin alanları */}
                  {["title","subtitle","text"].map(field => (
                    <div key={field} className="mb-3">
                      <label className="font-semibold block mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {langs.map(({ key, label }) => (
                          <input
                            key={key}
                            type="text"
                            placeholder={label}
                            value={sub[field]?.[key] || ""}
                            onChange={e =>
                              handleSubLangChange(idx, subIdx, field, key, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Alt link */}
                  <div className="mb-3">
                    <label className="font-semibold block mb-1">Link</label>
                    <input
                      type="text"
                      value={sub.link || ""}
                      onChange={e => handleSubLinkChange(idx, subIdx, e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}