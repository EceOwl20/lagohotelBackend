"use client";
import { useState } from "react";

export default function MainRestaurantSectionEdit({ data, setData, langs }) {
  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Main Restaurant Section</h3>
      <label>Arka Plan Görseli</label>
      <input
        type="text"
        value={data.mainRestaurantSection?.image || ""}
        onChange={e => setData({
          ...data,
          mainRestaurantSection: { ...data.mainRestaurantSection, image: e.target.value }
        })}
        className="w-full border p-2 rounded mb-2"
      />
      {langs.map(lang => (
        <div key={lang} className="mb-3">
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.mainRestaurantSection?.subtitle?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainRestaurantSection: {
                  ...data.mainRestaurantSection,
                  subtitle: { ...data.mainRestaurantSection?.subtitle, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.mainRestaurantSection?.title?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainRestaurantSection: {
                  ...data.mainRestaurantSection,
                  title: { ...data.mainRestaurantSection?.title, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Açıklama ({lang.toUpperCase()})</label>
          <textarea
            value={data.mainRestaurantSection?.text?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainRestaurantSection: {
                  ...data.mainRestaurantSection,
                  text: { ...data.mainRestaurantSection?.text, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Liste (her satır ayrı bir madde)</label>
          <textarea
            value={data.mainRestaurantSection?.list?.[lang]?.join("\n") || ""}
            onChange={e =>
              setData({
                ...data,
                mainRestaurantSection: {
                  ...data.mainRestaurantSection,
                  list: {
                    ...data.mainRestaurantSection?.list,
                    [lang]: e.target.value.split("\n"),
                  }
                }
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
      {langs.map(lang => (
        <div key={lang + "-btn"}>
          <label>Buton Metni ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.mainRestaurantSection?.buttonText?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainRestaurantSection: {
                  ...data.mainRestaurantSection,
                  buttonText: { ...data.mainRestaurantSection?.buttonText, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
        </div>
      ))}
      <label>Buton Linki</label>
      <input
        type="text"
        value={data.mainRestaurantSection?.buttonLink || ""}
        onChange={e => setData({
          ...data,
          mainRestaurantSection: { ...data.mainRestaurantSection, buttonLink: e.target.value }
        })}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}
