"use client";
import { useState } from "react";
import MultiImageUploadInput from "../../../components/MultiImageUploadInput";

// images: dizi halinde, ekle-sil
export default function SpaHeaderSectionEdit({ data, setData, langs, blockName }) {
  const value = data[blockName] || {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const updateSection = (updates) =>
  setData({
    ...data,
    [blockName]: {
      ...value,
      ...updates,
    },
  });

const handleAddImage = async (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  const uploadedUrls = [];

  for (const file of files) {
    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: form,
      });
      const result = await res.json();
      if (res.ok) {
                 // eğer path '/' ile başlıyorsa apiUrl ekle, değilse direkt kullan
         const url = result.imageUrl.startsWith("/")
           ? `${apiUrl}${result.imageUrl}`
           : result.imageUrl;
         uploadedUrls.push(url);
      } else {
        console.error("Yükleme hatası:", result.error);
      }
    } catch (err) {
      console.error("Yükleme hatası:", err);
    }
  }

  updateSection({
    images: [...(value.images || []), ...uploadedUrls],
  });
};


  const handleImagesChange = (images) => {
    setData({
      ...data,
      [blockName]: {
        ...value,
        images: images
      }
    });
  };

const moveImage = (fromIndex, toIndex) => {
  const imgs = [...(value.images || [])];
  if (toIndex < 0 || toIndex >= imgs.length) return;
  const moved = imgs.splice(fromIndex, 1)[0];
  imgs.splice(toIndex, 0, moved);
  updateSection({ images: imgs });
};



  const handleRemoveImage = (idx) => {
    setData({
      ...data,
      [blockName]: {
        ...value,
        images: (value.images || []).filter((_, i) => i !== idx),
      },
    });
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


  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Spa Header Section</h4>
      {/* Diller */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {langs.map((lang) => (
          <div key={lang}>
            <label className="font-semibold">Alt Başlık ({lang.toUpperCase()})</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-1"
              value={value.subtitle?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  [blockName]: {
                    ...value,
                    subtitle: { ...value.subtitle, [lang]: e.target.value },
                  },
                })
              }
            />
            <label className="font-semibold">Başlık ({lang.toUpperCase()})</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-1"
              value={value.title?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  [blockName]: {
                    ...value,
                    title: { ...value.title, [lang]: e.target.value },
                  },
                })
              }
            />
            <label className="font-semibold">Açıklama ({lang.toUpperCase()})</label>
            <textarea
              className="w-full border rounded p-2"
              value={value.text?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  [blockName]: {
                    ...value,
                    text: { ...value.text, [lang]: e.target.value },
                  },
                })
              }
            />
          </div>
        ))}
      </div>
        <div className="mt-6">
              <MultiImageUploadInput
                value={value.images || []}
                onChange={handleImagesChange}
                label="Galeri Görselleri"
              />
            </div>
    </div>
  );
}
