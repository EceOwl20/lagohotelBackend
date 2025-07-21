"use client";
import { useState } from "react";

const clubDefault = {
  image: "",
  ageGroup: { tr: "", en: "", de: "", ru: "" },
  title: { tr: "", en: "", de: "", ru: "" },
  description: { tr: "", en: "", de: "", ru: "" }
};

export default function KidsBambooEdit({ data, setData, langs }) {
  const value = data.kidsBamboo || {};
  const [uploading, setUploading] = useState({}); // { section: bool, [idx]: bool }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Bölüm seviyesi görsel yükleme
  const handleSectionImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, section: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const imageUrl = result.imageUrl || result.path;
      setData(prev => ({
        ...prev,
        kidsBamboo: {
          ...prev.kidsBamboo,
          image: imageUrl
        }
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(prev => ({ ...prev, section: false }));
    }
  };

  // Kulüp kartı görsel upload handler (item-level)
  const handleImageUpload = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [idx]: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const imageUrl = result.imageUrl || result.path;
      const arr = [...(value.clubData || [])];
      arr[idx].image = imageUrl;
      setData(prev => ({
        ...prev,
        kidsBamboo: {
          ...prev.kidsBamboo,
          clubData: arr
        }
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(prev => ({ ...prev, [idx]: false }));
    }
  };

  // Genel multi-lang alan değişimi
  const handleChange = (path, val) => {
    const keys = path.split(".");
    setData(prev => {
      const updated = { ...prev };
      let ref = updated.kidsBamboo = { ...prev.kidsBamboo };
      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...(ref[keys[i]] || {}) };
        ref = ref[keys[i]];
      }
      ref[keys.at(-1)] = val;
      return updated;
    });
  };

  // Kulüp kartı ekle/sil
  const handleClubAdd = () => {
    setData(prev => ({
      ...prev,
      kidsBamboo: {
        ...prev.kidsBamboo,
        clubData: [...(prev.kidsBamboo.clubData || []), { ...clubDefault }]
      }
    }));
  };
  const handleClubRemove = i => {
    setData(prev => ({
      ...prev,
      kidsBamboo: {
        ...prev.kidsBamboo,
        clubData: prev.kidsBamboo.clubData.filter((_, idx) => idx !== i)
      }
    }));
  };

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <h3 className="font-bold text-xl mb-2">Kids Bamboo</h3>

      {/* Bölüm seviyesi tek görsel */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Bölüm Görseli</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleSectionImageUpload}
            disabled={uploading.section}
            className="border p-2 rounded"
          />
          {uploading.section && <span className="text-blue-600">Yükleniyor…</span>}
          {value.image && (
            <img
              src={value.image.startsWith("/") ? `${apiUrl}${value.image}` : value.image}
              alt="Section"
              className="h-20 w-32 object-cover rounded border"
            />
          )}
        </div>
      </div>

      {/* Çokdilli metin alanları (subtitle, title, text, span, note) */}
      {["subtitle", "title", "text", "span", "note"].map(key => (
        <div key={key} className="mb-4">
          <label className="block font-semibold mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <div className="flex flex-col md:flex-row gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                placeholder={lang.toUpperCase()}
                className="border p-2 rounded w-full"
                value={value?.[key]?.[lang] || ""}
                onChange={e => handleChange(`${key}.${lang}`, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Kulüp Kartları */}
      <h4 className="font-semibold text-lg mt-6 mb-2">Kulüp Kartları</h4>
      {(value.clubData || []).map((club, idx) => (
        <div key={idx} className="border p-4 rounded mb-4 bg-white">
          <button
            className="text-red-600 hover:underline text-sm mb-2"
            onClick={() => handleClubRemove(idx)}
          >
            Kaldır
          </button>

          {/* Kart Görseli */}
          <div className="mb-3">
            <label className="block font-semibold mb-1">Görsel</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageUpload(e, idx)}
                disabled={uploading[idx]}
                className="border p-2 rounded"
              />
              {uploading[idx] && <span className="text-blue-600">Yükleniyor…</span>}
              {club.image && (
                <img
                  src={
                    club.image.startsWith("/")
                      ? `${apiUrl}${club.image}`
                      : club.image
                  }
                  alt="Kulüp"
                  className="h-16 w-24 object-cover rounded border"
                />
              )}
            </div>
          </div>

          {/* Kart çokdilli alanlar */}
          {["ageGroup", "title", "description"].map(key => (
            <div key={key} className="mb-3">
              <label className="block font-semibold mb-1">{key}</label>
              <div className="flex gap-2">
                {langs.map(lang => (
                  <input
                    key={lang}
                    placeholder={lang.toUpperCase()}
                    className="border p-2 rounded w-full"
                    value={club[key]?.[lang] || ""}
                    onChange={e => {
                      const arr = [...(value.clubData || [])];
                      arr[idx][key][lang] = e.target.value;
                      setData(prev => ({
                        ...prev,
                        kidsBamboo: {
                          ...prev.kidsBamboo,
                          clubData: arr
                        }
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      <button
        type="button"
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleClubAdd}
      >
        + Kulüp Kartı Ekle
      </button>
    </section>
  );
}
