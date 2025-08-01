"use client";
import React, { useState } from "react";

const langs = ["tr", "en", "de", "ru"];

export default function RoomsBannerEdit({ data, setData }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");

      setData({
        ...data,
        roomsBanner: { ...data.roomsBanner, bannerImage: result.imageUrl },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };


  // Multi-lang başlık
  const handleHeaderChange = (lang, value) => {
    setData((prev) => ({
      ...prev,
      roomsBanner: {
        ...prev.roomsBanner,
        header: { ...(prev.roomsBanner?.header || {}), [lang]: value },
      },
    }));
  };

  // Dinamik butonlar (multi-lang)
  const handleButtonChange = (idx, lang, value) => {
    setData((prev) => {
      const buttons = [...(prev.roomsBanner?.buttons || [])];
      buttons[idx] = {
        ...buttons[idx],
        header: { ...(buttons[idx]?.header || {}), [lang]: value },
      };
      return { ...prev, roomsBanner: { ...prev.roomsBanner, buttons } };
    });
  };

  const handleButtonLinkChange = (idx, value) => {
    setData((prev) => {
      const buttons = [...(prev.roomsBanner?.buttons || [])];
      buttons[idx] = { ...buttons[idx], link: value };
      return { ...prev, roomsBanner: { ...prev.roomsBanner, buttons } };
    });
  };

  const handleButtonAdd = () => {
    setData((prev) => ({
      ...prev,
      roomsBanner: {
        ...prev.roomsBanner,
        buttons: [
          ...(prev.roomsBanner?.buttons || []),
          { header: { tr: "", en: "", de: "", ru: "" }, link: "" },
        ],
      },
    }));
  };

  const handleButtonRemove = (idx) => {
    setData((prev) => {
      const buttons = [...(prev.roomsBanner?.buttons || [])];
      buttons.splice(idx, 1);
      return { ...prev, roomsBanner: { ...prev.roomsBanner, buttons } };
    });
  };

  const bannerImgSrc = data?.roomsBanner?.bannerImage
    ? data.roomsBanner.bannerImage.startsWith("/uploads")
      ? apiUrl + data.roomsBanner.bannerImage
      : data.roomsBanner.bannerImage
    : "";

  return (
    <section className="border border-gray-300 rounded-md p-4 bg-slate-50">
      <h2 className="text-[22px] font-semibold mb-4">Banner Ayarları</h2>

      {/* Görsel Upload */}
      <label className="block mb-4 font-semibold">
        Banner Görsel
        <input
          type="file"
          accept="image/*"
          className="mt-1 w-full"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
       {data?.roomsBanner?.bannerImage && (
          <img
            src={`${apiUrl}${data.roomsBanner.bannerImage}`}
            alt="Banner Preview"
            className="mt-2 h-32 object-cover border rounded"
          />
        )}
      </label>

      {/* Başlıklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map((lang) => (
          <label key={lang} className="block font-semibold">
            Başlık ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={data?.roomsBanner?.header?.[lang] ?? ""}
              onChange={(e) => handleHeaderChange(lang, e.target.value)}
            />
          </label>
        ))}
      </div>

      {/* Dinamik Butonlar */}
      <div>
        <h3 className="text-lg font-medium mb-2">Butonlar</h3>
        {(data?.roomsBanner?.buttons || []).map((btn, idx) => (
          <div key={idx} className="border rounded p-3 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              {langs.map((lang) => (
                <label key={lang} className="block font-semibold">
                  Metin ({lang.toUpperCase()})
                  <input
                    type="text"
                    className="mt-1 w-full border rounded p-2"
                    value={btn.header?.[lang] ?? ""}
                    onChange={(e) =>
                      handleButtonChange(idx, lang, e.target.value)
                    }
                  />
                </label>
              ))}
              <label className="block font-semibold">
                Link
                <input
                  type="text"
                  className="mt-1 w-full border rounded p-2"
                  value={btn.link ?? ""}
                  onChange={(e) =>
                    handleButtonLinkChange(idx, e.target.value)
                  }
                />
              </label>
            </div>
            <button
              type="button"
              className="text-red-600 hover:underline"
              onClick={() => handleButtonRemove(idx)}
            >
              Butonu Kaldır
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleButtonAdd}
        >
          Buton Ekle
        </button>
      </div>
    </section>
  );
}
