"use client";
import { useState } from "react";
const langs = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "İngilizce" },
  { key: "de", label: "Almanca" },
  { key: "ru", label: "Rusça" }
];

export default function BarCarouselEdit({ data, setData }) {
  const [uploading, setUploading] = useState(false);
  const images = data.barCarousel?.images || [];

  const handleUpload = async e => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const uploaded = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();
      if (res.ok && result.imageUrl) uploaded.push(result.imageUrl);
    }
    setData({
      ...data,
      barCarousel: {
        ...data.barCarousel,
        images: [...images, ...uploaded]
      }
    });
    setUploading(false);
  };
  const removeImg = idx => setData({
    ...data,
    barCarousel: {
      ...data.barCarousel,
      images: images.filter((_, i) => i !== idx)
    }
  });
  const handleLangChange = (field, lang, value) =>
    setData({
      ...data,
      barCarousel: {
        ...data.barCarousel,
        [field]: { ...(data.barCarousel?.[field] || {}), [lang]: value }
      }
    });

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Bar Carousel</h3>
      <label className="font-semibold">Resimler</label>
      <input type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} />
      <div className="flex gap-2 flex-wrap mt-2 mb-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative">
            <img src={`http://localhost:5001${img}`} alt="" className="w-[80px] h-[60px] object-cover rounded" />
            <button type="button" className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2" onClick={() => removeImg(idx)}>X</button>
          </div>
        ))}
      </div>
      {["subtitle", "title", "text", "buttonText"].map(field => (
        <div className="mb-2" key={field}>
          <label className="block font-semibold mt-2 mb-1">{field === "buttonText" ? "Buton Metni" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <div className="flex flex-wrap gap-2">
            {langs.map(({ key, label }) => (
              field === "text" ? (
                <textarea
                  key={key}
                  placeholder={label}
                  value={data.barCarousel?.[field]?.[key] || ""}
                  onChange={e => handleLangChange(field, key, e.target.value)}
                  className="border rounded p-2 w-[180px] min-h-[50px]"
                />
              ) : (
                <input
                  key={key}
                  placeholder={label}
                  value={data.barCarousel?.[field]?.[key] || ""}
                  onChange={e => handleLangChange(field, key, e.target.value)}
                  className="border rounded p-2 w-[180px]"
                />
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
