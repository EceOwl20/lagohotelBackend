// components/MassageCarouselEdit.jsx
"use client";
import React, { useState } from "react";

const langs = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "English" },
  { key: "de", label: "Deutsch" },
  { key: "ru", label: "Русский" },
];

export default function MassageCarouselEdit({ data, setData }) {
  const section = data.massageCarousel || {};
  const cards   = section.carouselCards || [];
  const apiUrl  = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState({}); // { idx: bool }

  // genel güncelleme
  const updateSection = updates =>
    setData({ ...data, massageCarousel: { ...section, ...updates } });

  // dosya yükleme
  const handleImageUpload = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(u => ({ ...u, [idx]: true }));
    const form = new FormData();
    form.append("image", file);
    try {
      const res    = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form });
      const json   = await res.json();
      if (!res.ok) throw new Error(json.error||"Yükleme başarısız");
      const path   = json.path || json.imageUrl;
      const updated = [...cards];
      updated[idx].image = path;
      updateSection({ carouselCards: updated });
    } catch (err) {
      alert("Yükleme hatası: "+err.message);
    } finally {
      setUploading(u => ({ ...u, [idx]: false }));
    }
  };

  const handleLangChange = (idx, field, lang, val) => {
    const updated = [...cards];
    updated[idx][field] = { ...(updated[idx][field]||{}), [lang]: val };
    updateSection({ carouselCards: updated });
  };

  const addCard = () => {
    const empty = {
      image: "",
      title: langs.reduce((o,{key})=>(o[key]="",o),{}),
      text:  langs.reduce((o,{key})=>(o[key]="",o),{})
    };
    updateSection({ carouselCards: [...cards, empty] });
  };

  const removeCard = idx => {
    const updated = cards.filter((_,i)=>i!==idx);
    updateSection({ carouselCards: updated });
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-4">Massage Carousel Kartları</h3>
      
      {/* Subtitle/Title/Text */}
      {["subtitle","title","text"].map(field=>(
        <div key={field} className="mb-4">
          <label className="font-semibold block mb-1">
            {field.charAt(0).toUpperCase()+field.slice(1)}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {langs.map(({key,label})=>(
              <div key={key}>
                <span className="text-xs text-gray-600">{label}</span>
                {field==="text" ? (
                  <textarea
                    className="border p-2 rounded w-full"
                    rows={2}
                    value={section[field]?.[key]||""}
                    onChange={e=>updateSection({
                      [field]: { ...(section[field]||{}), [key]: e.target.value }
                    })}
                  />
                ) : (
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    value={section[field]?.[key]||""}
                    onChange={e=>updateSection({
                      [field]: { ...(section[field]||{}), [key]: e.target.value }
                    })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Kartlar */}
      <div className="space-y-6">
        {cards.map((card, idx)=>(
          <div key={idx} className="border p-4 rounded bg-white">
            <div className="flex justify-between mb-3">
              <strong>Kart #{idx+1}</strong>
              <button
                className="text-red-600"
                onClick={()=>removeCard(idx)}
              >
                Sil
              </button>
            </div>

            {/* Resim */}
            <div className="mb-3">
              <label className="font-medium block mb-1">Resim</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e=>handleImageUpload(e, idx)}
                  disabled={uploading[idx]}
                />
                {uploading[idx] && <span className="text-blue-600">Yükleniyor…</span>}
                {card.image && (
                  <img
                    src={`${apiUrl}${card.image}`}
                    alt=""
                    className="w-24 h-16 object-cover rounded border"
                  />
                )}
              </div>
            </div>

            {/* Title/Text */}
            {["title","text"].map(field=>(
              <div key={field} className="mb-3">
                <label className="font-medium block mb-1">
                  {field.charAt(0).toUpperCase()+field.slice(1)}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {langs.map(({key,label})=>(
                    <div key={key}>
                      <span className="text-xs text-gray-600">{label}</span>
                      {field==="text" ? (
                        <textarea
                          className="border p-2 rounded w-full"
                          rows={2}
                          value={card[field]?.[key]||""}
                          onChange={e=>handleLangChange(idx, field, key, e.target.value)}
                        />
                      ) : (
                        <input
                          type="text"
                          className="border p-2 rounded w-full"
                          value={card[field]?.[key]||""}
                          onChange={e=>handleLangChange(idx, field, key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={addCard}
        >
          Kart Ekle
        </button>
      </div>
    </div>
  );
}
