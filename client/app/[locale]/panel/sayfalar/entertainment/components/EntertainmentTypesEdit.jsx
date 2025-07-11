"use client";
import React, { useState } from "react";

export default function EntertainmentTypesEdit({ data, setData, langs }) {
  // Başlangıç yapısı
  const ent = data.entertainmentTypes || {
    subtitle: {}, title: {}, text: {}, activities: []
  };
 const activities = Array.isArray(ent.activities) ? ent.activities : [];

  const [uploading, setUploading] = useState({}); // { [idx]: bool }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Üst düzey çoklu dil alanları güncelleme
  const updateMainField = (field, lang, value) => {
    const updated = {
      ...ent,
      [field]: { ...ent[field], [lang]: value }
    };
    setData({ ...data, entertainmentTypes: updated });
  };

  // Yeni aktivite ekle
  const addActivity = () => {
    const empty = {
      image: "",
      title:       {}, category:    {},
      description: {}, link:       ""
    };
    langs.forEach(lang => {
      empty.title[lang]       = "";
      empty.category[lang]    = "";
      empty.description[lang] = "";
    });
    setData({
      ...data,
      entertainmentTypes: {
        ...ent,
        activities: [...activities, empty]
      }
    });
  };

  // Aktivite sil
  const removeActivity = idx => {
    setData({
      ...data,
      entertainmentTypes: {
        ...ent,
        activities: activities.filter((_,i) => i!==idx)
      }
    });
  };

  // Dosya yükleme
  const handleImageUpload = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(u => ({ ...u, [idx]: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error||"Yükleme başarısız");
      const imagePath = result.path || result.imageUrl;
      // güncelle
      const updatedActs = activities.map((act,i) =>
        i===idx ? { ...act, image: imagePath } : act
      );
      setData({
        ...data,
        entertainmentTypes: { ...ent, activities: updatedActs }
      });
    } catch(err) {
      alert("Resim yükleme hatası: "+err.message);
    } finally {
      setUploading(u => ({ ...u, [idx]: false }));
    }
  };

  // Aktivite içindeki çoklu dil alanı
  const updateActivityLang = (idx, field, lang, value) => {
    const updated = activities.map((act,i) =>
      i===idx
        ? { ...act, [field]: { ...(act[field]||{}), [lang]: value } }
        : act
    );
    setData({ ...data, entertainmentTypes: { ...ent, activities: updated } });
  };

  // Aktivite içindeki düz string alan: link
  const updateActivityLink = (idx, value) => {
    const updated = activities.map((act,i) =>
      i===idx ? { ...act, link: value } : act
    );
    setData({ ...data, entertainmentTypes: { ...ent, activities: updated } });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-6 space-y-6">
      <h4 className="font-bold text-xl">Eğlence Tipleri Bölümü</h4>

      {/* Üst düzey subtitle / title / text */}
      {["subtitle","title","text"].map(field => (
        <div key={field}>
          <h5 className="font-semibold mb-2">
            {field.charAt(0).toUpperCase()+field.slice(1)}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {langs.map(lang => (
              field === "text" ? (
                <textarea
                  key={lang}
                  rows={2}
                  placeholder={`${field} (${lang.toUpperCase()})`}
                  value={ent[field]?.[lang]||""}
                  onChange={e => updateMainField(field, lang, e.target.value)}
                  className="border p-2 rounded"
                />
              ) : (
                <input
                  key={lang}
                  type="text"
                  placeholder={`${field} (${lang.toUpperCase()})`}
                  value={ent[field]?.[lang]||""}
                  onChange={e => updateMainField(field, lang, e.target.value)}
                  className="border p-2 rounded"
                />
              )
            ))}
          </div>
        </div>
      ))}

      {/* “Aktivite Kartı Ekle” */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addActivity}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Aktivite Kartı Ekle
        </button>
      </div>

      {/* Her bir aktivite kartı */}
      {activities.map((act, idx) => (
        <div key={idx} className="border rounded p-4 bg-white space-y-4">
          <div className="flex justify-between items-center">
            <strong>Kart #{idx+1}</strong>
            <button
              type="button"
              onClick={() => removeActivity(idx)}
              className="text-red-600 hover:underline"
            >
              Sil
            </button>
          </div>

          {/* Resim yükleme */}
          <div>
            <label className="block font-semibold mb-1">Resim Yükle</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageUpload(e, idx)}
                disabled={uploading[idx]}
                className="block"
              />
              {uploading[idx] && <span className="text-blue-500">Yükleniyor…</span>}
              {act.image && (
                <img
                  src={act.image.startsWith("/") ? `${apiUrl}${act.image}` : act.image}
                  alt=""
                  className="w-24 h-16 object-cover rounded border"
                />
              )}
            </div>
          </div>

          {/* title / category / description */}
          {["title","category","description"].map(field => (
            <div key={field}>
              <label className="block font-semibold mb-1">
                {field.charAt(0).toUpperCase()+field.slice(1)}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {langs.map(lang => (
                  <input
                    key={lang}
                    type="text"
                    placeholder={`${field} (${lang.toUpperCase()})`}
                    value={act[field]?.[lang]||""}
                    onChange={e =>
                      updateActivityLang(idx, field, lang, e.target.value)
                    }
                    className="border p-2 rounded"
                  />
                ))}
              </div>
            </div>
          ))}

          {/* link */}
          <div>
            <label className="block font-semibold mb-1">Link</label>
            <input
              type="text"
              placeholder="https://..."
              value={act.link||""}
              onChange={e => updateActivityLink(idx, e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
