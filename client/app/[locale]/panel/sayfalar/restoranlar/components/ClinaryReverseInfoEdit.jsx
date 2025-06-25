"use client";
import { useState } from "react";
export default function ClinaryReverseInfoEdit({ data, setData, langs }) {
  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Clinary Reverse Info</h3>
      <label>Sol Görsel URL</label>
      <input
        type="text"
        value={data.clinaryReverseInfo?.image1 || ""}
        onChange={e => setData({
          ...data,
          clinaryReverseInfo: { ...data.clinaryReverseInfo, image1: e.target.value }
        })}
        className="w-full border p-2 rounded mb-2"
      />
      <label>Sağ Görsel URL</label>
      <input
        type="text"
        value={data.clinaryReverseInfo?.image2 || ""}
        onChange={e => setData({
          ...data,
          clinaryReverseInfo: { ...data.clinaryReverseInfo, image2: e.target.value }
        })}
        className="w-full border p-2 rounded mb-2"
      />
      {langs.map(lang => (
        <div key={lang}>
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.clinaryReverseInfo?.subtitle?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                clinaryReverseInfo: {
                  ...data.clinaryReverseInfo,
                  subtitle: { ...data.clinaryReverseInfo?.subtitle, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.clinaryReverseInfo?.title?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                clinaryReverseInfo: {
                  ...data.clinaryReverseInfo,
                  title: { ...data.clinaryReverseInfo?.title, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Açıklama 1 ({lang.toUpperCase()})</label>
          <textarea
            value={data.clinaryReverseInfo?.text1?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                clinaryReverseInfo: {
                  ...data.clinaryReverseInfo,
                  text1: { ...data.clinaryReverseInfo?.text1, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Açıklama 2 ({lang.toUpperCase()})</label>
          <textarea
            value={data.clinaryReverseInfo?.text2?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                clinaryReverseInfo: {
                  ...data.clinaryReverseInfo,
                  text2: { ...data.clinaryReverseInfo?.text2, [lang]: e.target.value }
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
