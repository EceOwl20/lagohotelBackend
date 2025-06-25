"use client";
import { useState } from "react";
export default function ClinaryInfoEdit({ data, setData, langs }) {
  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Clinary Info Section</h3>
      <label>Sol Görsel URL</label>
      <input
        type="text"
        value={data.clinaryInfo?.image1 || ""}
        onChange={e => setData({
          ...data,
          clinaryInfo: { ...data.clinaryInfo, image1: e.target.value }
        })}
        className="w-full border p-2 rounded mb-2"
      />
      <label>Sağ Görsel URL</label>
      <input
        type="text"
        value={data.clinaryInfo?.image2 || ""}
        onChange={e => setData({
          ...data,
          clinaryInfo: { ...data.clinaryInfo, image2: e.target.value }
        })}
        className="w-full border p-2 rounded mb-2"
      />
      {langs.map(lang => (
        <div key={lang} className="mb-3">
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.clinaryInfo?.subtitle?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                clinaryInfo: {
                  ...data.clinaryInfo,
                  subtitle: { ...data.clinaryInfo?.subtitle, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.clinaryInfo?.title?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                clinaryInfo: {
                  ...data.clinaryInfo,
                  title: { ...data.clinaryInfo?.title, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Açıklamalar (her satır ayrı)</label>
          <textarea
            value={data.clinaryInfo?.texts?.[lang]?.join("\n") || ""}
            onChange={e =>
              setData({
                ...data,
                clinaryInfo: {
                  ...data.clinaryInfo,
                  texts: {
                    ...data.clinaryInfo?.texts,
                    [lang]: e.target.value.split("\n"),
                  }
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
