"use client";
import { useState } from "react";

export default function MainBannerEdit({ data, setData, langs }) {
  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Ana Banner</h3>
      <label>Banner Görsel URL</label>
      <input
        type="text"
        value={data.mainBanner?.image || ""}
        onChange={e => setData({
          ...data,
          mainBanner: { ...data.mainBanner, image: e.target.value }
        })}
        className="w-full border p-2 rounded mb-2"
      />
      {langs.map(lang => (
        <div key={lang} className="mb-3">
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.mainBanner?.subtitle?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainBanner: {
                  ...data.mainBanner,
                  subtitle: { ...data.mainBanner?.subtitle, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.mainBanner?.title?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainBanner: {
                  ...data.mainBanner,
                  title: { ...data.mainBanner?.title, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Açıklama ({lang.toUpperCase()})</label>
          <textarea
            value={data.mainBanner?.text?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainBanner: {
                  ...data.mainBanner,
                  text: { ...data.mainBanner?.text, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
    </div>
  );
}
