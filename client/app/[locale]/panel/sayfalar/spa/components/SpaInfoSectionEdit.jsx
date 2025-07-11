"use client";
import { useState } from "react";

// Eğer parent’ten langs props’u geliyorsa onu; yoksa aşağıdaki default’u kullanabilirsiniz:
const langs = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "English" },
  { key: "de", label: "Deutsch" },
  { key: "ru", label: "Русский" },
];

export default function SpaInfoSectionEdit({ data, setData }) {
  // Modelde 'SpaInfoSection' olarak tanımlı
  const section = data.SpaInfoSection || {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState({ img1: false, img2: false });

  // Genel updater fonksiyonu
  const updateSection = (updates) =>
    setData({
      ...data,
      SpaInfoSection: {
        ...section,
        ...updates,
      },
    });

  // Dosya yükleme handler'ı
  const handleImageUpload = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((u) => ({ ...u, [key]: true }));
    const form = new FormData();
    form.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: form,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      // result.imageUrl veya result.path kullanın
      updateSection({ [key]: result.imageUrl });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };

  // Çok dilli alan güncellemesi
  const handleTextChange = (group, lang, val) => {
    const block = section[group] || {};
    updateSection({ [group]: { ...block, [lang]: val } });
  };

  // Sol/sağ overlay güncellerken iç blokları da 
  const handleOverlayChange = (side, group, lang, val) => {
    const overlay = section[side] || {};
    const block = overlay[group] || {};
    updateSection({
      [side]: {
        ...overlay,
        [group]: { ...block, [lang]: val },
      },
    });
  };

  // Dynamic lists (sağ overlay içinde)
  const lists = section.right?.lists || [];
  const addList = () => {
    const empty = langs.reduce((o, { key }) => ({ ...o, [key]: "" }), {});
    updateSection({
      right: {
        ...section.right,
        lists: [...lists, empty],
      },
    });
  };
  const removeList = (i) => {
    updateSection({
      right: {
        ...section.right,
        lists: lists.filter((_, idx) => idx !== i),
      },
    });
  };
  const handleListChange = (i, lang, val) => {
    const updated = lists.map((it, idx) =>
      idx === i ? { ...it, [lang]: val } : it
    );
    updateSection({
      right: {
        ...section.right,
        lists: updated,
      },
    });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-6">
      <h3 className="font-bold text-xl mb-4">Spa Info Section Düzenle</h3>

      {/* Ana subtitle, title, text */}
      {["subtitle", "title", "text"].map((field) => (
        <div key={field} className="mb-6">
          <label className="font-semibold block mb-2">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {langs.map(({ key, label }) => (
              <div key={key}>
                <span className="text-xs text-gray-600">{label}</span>
                {field === "text" ? (
                  <textarea
                    rows={2}
                    className="border p-2 rounded w-full"
                    value={section[field]?.[key] || ""}
                    onChange={(e) =>
                      handleTextChange(field, key, e.target.value)
                    }
                  />
                ) : (
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    value={section[field]?.[key] || ""}
                    onChange={(e) =>
                      handleTextChange(field, key, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* İki arka plan görseli */}
      {["img1", "img2"].map((key) => (
        <div key={key} className="mb-6">
          <label className="font-semibold block mb-2">
            {key === "img1" ? "Sol Görsel" : "Sağ Görsel"}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, key)}
              disabled={uploading[key]}
            />
            {uploading[key] && <span className="text-blue-600">Yükleniyor…</span>}
            {section[key] && (
              <img
                src={`${apiUrl}${section[key]}`}
                alt={key}
                className="h-20 w-32 object-cover rounded border"
              />
            )}
          </div>
        </div>
      ))}

      {/* Sol overlay */}
      <div className="mb-8 p-4 bg-white rounded border">
        <h4 className="font-semibold mb-3">Sol Görsel Üstü Metinler</h4>
        {["subtitle", "title", "text"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block font-medium mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {langs.map(({ key, label }) => (
                <div key={key}>
                  <span className="text-xs text-gray-600">{label}</span>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    value={section.left?.[field]?.[key] || ""}
                    onChange={(e) =>
                      handleOverlayChange("left", field, key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sağ overlay + dynamic lists */}
      <div className="p-4 bg-white rounded border">
        <h4 className="font-semibold mb-3">Sağ Görsel Üstü Metinler & Listeler</h4>
        {["subtitle", "title", "text"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block font-medium mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {langs.map(({ key, label }) => (
                <div key={key}>
                  <span className="text-xs text-gray-600">{label}</span>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    value={section.right?.[field]?.[key] || ""}
                    onChange={(e) =>
                      handleOverlayChange("right", field, key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Dinamik listeler */}
        <div className="mt-6">
          {lists.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mb-3 p-2 border rounded"
            >
              <span className="font-medium">#{i + 1}</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-1">
                {langs.map(({ key, label }) => (
                  <div key={key}>
                    <span className="text-xs text-gray-600">{label}</span>
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      value={item[key] || ""}
                      onChange={(e) =>
                        handleListChange(i, key, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="text-red-600"
                onClick={() => removeList(i)}
              >
                Sil
              </button>
            </div>
          ))}

          <button
            type="button"
            className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
            onClick={addList}
          >
            Madde Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
