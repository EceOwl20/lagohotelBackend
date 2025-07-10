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
  const lists  = data.barCarousel?.lists  || [];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ————— Image Upload —————
  const handleUpload = async e => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const uploaded = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
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

  // ————— Lang Fields —————
  const handleLangChange = (field, lang, value) =>
    setData({
      ...data,
      barCarousel: {
        ...data.barCarousel,
        [field]: { ...(data.barCarousel?.[field] || {}), [lang]: value }
      }
    });

  // ————— Lists Logic —————
  const makeEmptyListItem = () =>
    langs.reduce((obj, { key }) => {
      obj[key] = "";
      return obj;
    }, {});

  const addList = () => {
    setData({
      ...data,
      barCarousel: {
        ...data.barCarousel,
        lists: [...lists, makeEmptyListItem()]
      }
    });
  };

  const removeList = idx => {
    setData({
      ...data,
      barCarousel: {
        ...data.barCarousel,
        lists: lists.filter((_, i) => i !== idx)
      }
    });
  };

  const handleListChange = (idx, lang, value) => {
    const updated = lists.map((item, i) =>
      i === idx ? { ...item, [lang]: value } : item
    );
    setData({
      ...data,
      barCarousel: {
        ...data.barCarousel,
        lists: updated
      }
    });
  };

   const handleGlobalLinkChange = value =>
    setData({
      ...data,
      barCarousel: {
        ...data.barCarousel,
        link: value
      }
    });

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Bar Carousel</h3>

      {/* Images */}
      <label className="font-semibold">Resimler</label>
      <input type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} />
      <div className="flex gap-2 flex-wrap mt-2 mb-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative">
            <img
              src={`http://localhost:5001${img}`}
              alt=""
              className="w-[80px] h-[60px] object-cover rounded"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2"
              onClick={() => removeImg(idx)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Subtitle, Title, Text, ButtonText */}
      {["subtitle", "title", "text", "buttonText"].map(field => (
        <div className="mb-2" key={field}>
          <label className="block font-semibold mt-2 mb-1">
            {field === "buttonText" ? "Buton Metni" : field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="flex flex-wrap gap-2">
            {langs.map(({ key, label }) =>
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
            )}
          </div>
        </div>
      ))}

      {/* ————— Lists Section ————— */}
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Liste Maddeleri</h4>
        {lists.map((item, idx) => (
          <div key={idx} className="border rounded p-3 mb-4 bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Madde #{idx + 1}</span>
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={() => removeList(idx)}
              >
                Sil
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {langs.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm mb-1">{label}</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder={`Liste ${idx + 1} (${key.toUpperCase()})`}
                    value={item[key]}
                    onChange={e => handleListChange(idx, key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={addList}
        >
          Madde Ekle
        </button>

        {/* Global Link */}
        <div className="mt-4">
          <label className="block font-semibold mb-1">Ortak Link</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="link"
            value={data.barCarousel?.link || ""}
            onChange={e => handleGlobalLinkChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
