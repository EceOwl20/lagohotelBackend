"use client";
import { useEffect, useState } from "react";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function MainBannerEdit({ data, setData, langs }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLangChange = (field, lang, value) =>
    setData({
      ...data,
      imageBackground: {
        ...data.imageBackground,
        [field]: { ...(data.imageBackground?.[field] || {}), [lang]: value },
      },
    });

  const updateImage = (value) => {
    setData({
      ...data,
      mainBanner: { ...data.mainBanner, image: value },
    });
  };

  const mainImg = data.mainBanner?.image
    ? data.mainBanner.image.startsWith("/")
      ? `${apiUrl}${data.mainBanner.image}`
      : data.mainBanner.image
    : null;

  return (
    <section className="border border-gray-300 rounded-md p-4 bg-slate-50">
      <h2 className="text-[22px] font-semibold mb-4">Banner Ayarları</h2>

      {/* Görsel Upload */}
      <label className="block mb-4 font-semibold">
        Banner Görsel
        <ImageUploadInput
          value={data.mainBanner?.image || ""}
          onChange={updateImage}
          apiPath="/api/upload"
          previewHeight={32}
        />
      </label>

      {/* Alt Başlıklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map((lang) => (
          <label key={lang} className="block font-semibold">
            Alt Başlık ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={data?.mainBanner?.subtitle?.[lang] ?? ""}
              onChange={(e) =>
                setData({
                  ...data,
                  mainBanner: {
                    ...data.mainBanner,
                    subtitle: {
                      ...data.mainBanner?.subtitle,
                      [lang]: e.target.value,
                    },
                  },
                })
              }
            />
          </label>
        ))}
      </div>

      {/* Başlıklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map((lang) => (
          <label key={lang} className="block font-semibold">
            Başlık ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={data?.mainBanner?.title?.[lang] ?? ""}
              onChange={(e) =>
                setData({
                  ...data,
                  mainBanner: {
                    ...data.mainBanner,
                    title: {
                      ...data.mainBanner?.title,
                      [lang]: e.target.value,
                    },
                  },
                })
              }
            />
          </label>
        ))}
      </div>

      {/* Açıklama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        {langs.map((lang) => (
          <label key={lang} className="block font-semibold">
            Açıklama ({lang.toUpperCase()})
            <textarea
              className="mt-1 w-full border rounded p-2"
              rows={3}
              value={data?.mainBanner?.text?.[lang] ?? ""}
              onChange={(e) =>
                setData({
                  ...data,
                  mainBanner: {
                    ...data.mainBanner,
                    text: {
                      ...data.mainBanner?.text,
                      [lang]: e.target.value,
                    },
                  },
                })
              }
            />
          </label>
        ))}
      </div>
    </section>
  );
}
