"use client";
import { useState } from "react";

export default function Connect1Edit({ data, setData, langs }) {
  const value = data.connect1 || {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Görsel yükleme handler
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const imageUrl = result.imageUrl || result.url;
      setData({ 
        ...data, 
        connect1: { ...value, image: imageUrl } 
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    }
  };

  // Çok dilli alan güncelleme helper
  const handleLang = (field, lang, val) => {
    setData({
      ...data,
      connect1: {
        ...value,
        [field]: { ...(value[field] || {}), [lang]: val }
      }
    });
  };

  // Düz array güncelleme helper
  const handleArrayField = (field, raw) => {
    const arr = raw.split(",").map(s => s.trim()).filter(s => s);
    setData({
      ...data,
      connect1: {
        ...value,
        [field]: arr
      }
    });
  };

  return (
    <div className="mb-8 p-4 rounded bg-gray-50">
      <h3 className="font-bold text-lg mb-4">Connect1 Bölümü</h3>

      {/* Görsel */}
      <label className="block font-semibold mb-2">Görsel</label>
      <div className="flex items-center gap-3 mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded"
        />
        {value.image && (
          <img
            src={value.image.startsWith("/") ? `${apiUrl}${value.image}` : value.image}
            alt="Connect1 Görsel"
            className="h-12 w-12 object-cover rounded border"
          />
        )}
      </div>

      {/* Çok Dilli Alanlar */}
      {["subtitle","title","addressLabel","address","phoneLabel","emailLabel"].map(field => (
        <div key={field} className="mb-6">
          <label className="block font-semibold mb-2">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                type="text"
                placeholder={`${field} (${lang.toUpperCase()})`}
                value={value[field]?.[lang] || ""}
                onChange={e => handleLang(field, lang, e.target.value)}
                className="border rounded p-2 w-full"
              />
            ))}
          </div>
        </div>
      ))}

      {/* Telefonlar */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Telefonlar (virgülle ayırınız)</label>
        <input
          type="text"
          value={(value.phones || []).join(", ")}
          onChange={e => handleArrayField("phones", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* E-mailler */}
      <div>
        <label className="block font-semibold mb-1">E-mailler (virgülle ayırınız)</label>
        <input
          type="text"
          value={(value.emails || []).join(", ")}
          onChange={e => handleArrayField("emails", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
    </div>
  );
}
