"use client";
import { useState } from "react";

export default function CuisinesEdit({ data, setData, langs, blockName = "cuisines" }) {
  const cuisines = data[blockName] || [];

  const addCuisine = () => {
    const emptyCuisine = {
      image: "",
      title: { tr: "", en: "", de: "", ru: "" },
      description: { tr: "", en: "", de: "", ru: "" },
      text: { tr: "", en: "", de: "", ru: "" },
      link: "",
      buttonText: { tr: "", en: "", de: "", ru: "" }
    };
    setData({
      ...data,
      [blockName]: [...cuisines, emptyCuisine]
    });
  };

  const removeCuisine = (i) => {
    setData({
      ...data,
      [blockName]: cuisines.filter((_, idx) => idx !== i)
    });
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">
        {blockName === "cuisines" ? "Cuisines Carousel" : "Cuisines Carousel 2"}
      </h3>
      <button
        type="button"
        className="mb-3 px-4 py-1 bg-green-600 text-white rounded"
        onClick={addCuisine}
      >+ Cuisine Ekle</button>
      {cuisines.map((item, idx) => (
        <div key={idx} className="border p-3 rounded mb-2 bg-gray-50 space-y-1">
          <button
            type="button"
            className="mb-2 px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => removeCuisine(idx)}
          >Sil</button>
          <label>Görsel URL</label>
          <input
            type="text"
            value={item.image || ""}
            onChange={e => {
              const updated = [...cuisines];
              updated[idx].image = e.target.value;
              setData({ ...data, [blockName]: updated });
            }}
            className="w-full border p-2 rounded mb-2"
          />
          {langs.map(lang => (
            <div key={lang}>
              <label>Başlık ({lang.toUpperCase()})</label>
              <input
                type="text"
                value={item.title?.[lang] || ""}
                onChange={e => {
                  const updated = [...cuisines];
                  updated[idx].title = { ...item.title, [lang]: e.target.value };
                  setData({ ...data, [blockName]: updated });
                }}
                className="w-full border p-2 rounded mb-1"
              />
              <label>Açıklama ({lang.toUpperCase()})</label>
              <input
                type="text"
                value={item.description?.[lang] || ""}
                onChange={e => {
                  const updated = [...cuisines];
                  updated[idx].description = { ...item.description, [lang]: e.target.value };
                  setData({ ...data, [blockName]: updated });
                }}
                className="w-full border p-2 rounded mb-1"
              />
              <label>Ek Açıklama (text) ({lang.toUpperCase()})</label>
              <textarea
                value={item.text?.[lang] || ""}
                onChange={e => {
                  const updated = [...cuisines];
                  updated[idx].text = { ...item.text, [lang]: e.target.value };
                  setData({ ...data, [blockName]: updated });
                }}
                className="w-full border p-2 rounded mb-1"
              />
              <label>Buton Metni ({lang.toUpperCase()})</label>
              <input
                type="text"
                value={item.buttonText?.[lang] || ""}
                onChange={e => {
                  const updated = [...cuisines];
                  updated[idx].buttonText = { ...item.buttonText, [lang]: e.target.value };
                  setData({ ...data, [blockName]: updated });
                }}
                className="w-full border p-2 rounded mb-1"
              />
            </div>
          ))}
          <label>Link</label>
          <input
            type="text"
            value={item.link || ""}
            onChange={e => {
              const updated = [...cuisines];
              updated[idx].link = e.target.value;
              setData({ ...data, [blockName]: updated });
            }}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
    </div>
  );
}
