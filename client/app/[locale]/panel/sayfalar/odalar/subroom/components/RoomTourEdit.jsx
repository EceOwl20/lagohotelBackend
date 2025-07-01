"use client";
import { useState } from "react";

const langs = ["tr", "en", "de", "ru"];

export default function RoomTourEdit({ data, setData }) {
  // Eğer tours yoksa en az bir boş nesneyle başlat
  const tours = data.tours?.length
    ? data.tours
    : [
        {
          subtitle: { tr: "", en: "", de: "", ru: "" },
          title: { tr: "", en: "", de: "", ru: "" },
          text: { tr: "", en: "", de: "", ru: "" },
          link: ""
        }
      ];

  // Her field için controlled update
  const handleChange = (field, value, idx, lang) => {
    const newTours = [...tours];
    if (field === "link") {
      newTours[idx][field] = value;
    } else {
      newTours[idx][field][lang] = value;
    }
    setData({
      ...data,
      tours: newTours
    });
  };

  // Yeni tur ekle
  const handleAdd = () => {
    setData({
      ...data,
      tours: [
        ...tours,
        {
          subtitle: { tr: "", en: "", de: "", ru: "" },
          title: { tr: "", en: "", de: "", ru: "" },
          text: { tr: "", en: "", de: "", ru: "" },
          link: ""
        }
      ]
    });
  };

  // Tur sil
  const handleDelete = (idx) => {
    setData({
      ...data,
      tours: tours.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">Room Tours</h3>
      {tours.map((tour, idx) => (
        <div key={idx} className="border-b pb-4 mb-4">
          {/* subtitle alanları */}
          <div className="mb-3">
            <label className="font-semibold block mb-1">subtitle</label>
            <div className="grid grid-cols-2 gap-2">
              {langs.map(lang => (
                <input
                  key={lang}
                  className="border p-2"
                  placeholder={`subtitle (${lang})`}
                  value={tour.subtitle?.[lang] || ""}
                  onChange={e => handleChange("subtitle", e.target.value, idx, lang)}
                />
              ))}
            </div>
          </div>
          {/* title alanları */}
          <div className="mb-3">
            <label className="font-semibold block mb-1">title</label>
            <div className="grid grid-cols-2 gap-2">
              {langs.map(lang => (
                <input
                  key={lang}
                  className="border p-2"
                  placeholder={`title (${lang})`}
                  value={tour.title?.[lang] || ""}
                  onChange={e => handleChange("title", e.target.value, idx, lang)}
                />
              ))}
            </div>
          </div>
          {/* text alanları */}
          <div className="mb-3">
            <label className="font-semibold block mb-1">text</label>
            <div className="grid grid-cols-2 gap-2">
              {langs.map(lang => (
                <input
                  key={lang}
                  className="border p-2"
                  placeholder={`text (${lang})`}
                  value={tour.text?.[lang] || ""}
                  onChange={e => handleChange("text", e.target.value, idx, lang)}
                />
              ))}
            </div>
          </div>
          {/* link alanı */}
          <input
            className="border p-2 w-full"
            placeholder="Tour Link"
            value={tour.link || ""}
            onChange={e => handleChange("link", e.target.value, idx)}
          />
          {/* Sil butonu */}
          <button
            className="text-red-600 mt-2"
            type="button"
            onClick={() => handleDelete(idx)}
          >
            Sil
          </button>
        </div>
      ))}
      <button
        className="mt-2 px-4 py-1 border rounded"
        type="button"
        onClick={handleAdd}
      >
        + Yeni Tour Ekle
      </button>
    </div>
  );
}
