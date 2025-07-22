"use client";
import { useState } from "react";

export default function Connect2Edit({ data, setData, langs }) {
  const value = data.connect2 || {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState(false);

  // Görsel yükleme handler
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const imageUrl = result.imageUrl || result.url;
      setData({
        ...data,
        connect2: { ...value, image: imageUrl },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Çokdilli alan güncelleme helper
  const handleLang = (field, lang, val) => {
    setData({
      ...data,
      connect2: {
        ...value,
        [field]: { ...(value[field] || {}), [lang]: val },
      },
    });
  };

  return (
    <div className="mb-8 p-4 rounded bg-gray-50">
      <h3 className="font-bold text-lg mb-4">Bölüm 2 (İletişim Formu)</h3>

      {/* Form arka plan görseli */}
      <label className="block font-semibold mb-1">Form Arka Plan Görseli</label>
      <div className="flex items-center gap-3 mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="border p-2 rounded"
        />
        {uploading && <span className="text-blue-600">Yükleniyor…</span>}
        {value.image && (
          <img
            src={
              value.image.startsWith("/")
                ? `${apiUrl}${value.image}`
                : value.image
            }
            alt="Form Arka Plan"
            className="h-12 w-12 object-cover rounded border"
          />
        )}
      </div>

      {/* Çokdilli metin alanları */}
      {[
        ["formTitle", "Form Başlığı"],
        ["formText",  "Form Açıklaması"],
        ["policyText", "Gizlilik Politikası Metni"],
        ["nameLabel", "İsim Etiketi"],
        ["emailLabel", "E-posta Etiketi"],
        ["message",   "Mesaj Alanı Etiketi"],
        ["buttonText","Buton Metni"],
      ].map(([field, label]) => (
        <div key={field} className="mb-6">
          <label className="block font-semibold mb-1">{label}</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {langs.map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`${label} (${lang.toUpperCase()})`}
                value={value[field]?.[lang] || ""}
                onChange={(e) => handleLang(field, lang, e.target.value)}
                className="border rounded p-2 w-full"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
