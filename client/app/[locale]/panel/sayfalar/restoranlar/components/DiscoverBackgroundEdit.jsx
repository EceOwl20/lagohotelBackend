"use client";
import { useState } from "react";

export default function DiscoverBackgroundEdit({ data, setData, langs }) {
  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Discover Background</h3>
      <label>Arka Plan Görseli</label>
      <input
        type="text"
        value={data.discoverBackground?.image || ""}
        onChange={e => setData({
          ...data,
          discoverBackground: { ...data.discoverBackground, image: e.target.value }
        })}
        className="w-full border p-2 rounded mb-2"
      />
      {langs.map(lang => (
        <div key={lang}>
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.discoverBackground?.subtitle?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                discoverBackground: {
                  ...data.discoverBackground,
                  subtitle: { ...data.discoverBackground?.subtitle, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.discoverBackground?.title?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                discoverBackground: {
                  ...data.discoverBackground,
                  title: { ...data.discoverBackground?.title, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Açıklama ({lang.toUpperCase()})</label>
          <textarea
            value={data.discoverBackground?.text?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                discoverBackground: {
                  ...data.discoverBackground,
                  text: { ...data.discoverBackground?.text, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Buton Metni ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.discoverBackground?.buttonText?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                discoverBackground: {
                  ...data.discoverBackground,
                  buttonText: { ...data.discoverBackground?.buttonText, [lang]: e.target.value }
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
        value={data.discoverBackground?.link || ""}
        onChange={e => setData({
          ...data,
          discoverBackground: { ...data.discoverBackground, link: e.target.value }
        })}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}
