"use client";
import { useState } from "react";

export default function KidsclubCarouselEdit({ data, setData, langs }) {
  const carousel = data.kidsClubCarousel || {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Genel alanlar: subtitle, title, text
  const handleGeneralChange = (field, lang, value) => {
    setData({
      ...data,
      kidsClubCarousel: {
        ...carousel,
        [field]: { ...(carousel[field] || {}), [lang]: value },
      },
    });
  };

  // Slide ekle/sil
  const handleAdd = () => {
    setData({
      ...data,
      kidsClubCarousel: {
        ...carousel,
        slides: [
          ...(carousel.slides || []),
          { image: "", header: { tr: "", en: "", de: "", ru: "" } },
        ],
      },
    });
  };
  const handleRemove = (i) => {
    setData({
      ...data,
      kidsClubCarousel: {
        ...carousel,
        slides: (carousel.slides || []).filter((_, idx) => idx !== i),
      },
    });
  };

  // Slide içi metin değişimi
  const handleSlideTextChange = (key, lang, value, idx) => {
    const slides = [...(carousel.slides || [])];
    slides[idx][key][lang] = value;
    setData({
      ...data,
      kidsClubCarousel: { ...carousel, slides },
    });
  };

  // Slide resmi dosya yükleme
  const [uploading, setUploading] = useState({});
  const uploadImage = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(u => ({ ...u, [idx]: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const imageUrl = result.imageUrl || result.path;
      // slide.image olarak kaydet
      const slides = [...(carousel.slides || [])];
      slides[idx].image = imageUrl;
      setData({
        ...data,
        kidsClubCarousel: { ...carousel, slides },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(u => ({ ...u, [idx]: false }));
    }
  };

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <h3 className="font-bold text-xl mb-4">Kids Club Carousel</h3>

      {/* Subtitle */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Alt Başlıklar</label>
        <div className="flex gap-2 flex-wrap">
          {langs.map((lang) => (
            <input
              key={lang}
              placeholder={`Alt Başlık (${lang.toUpperCase()})`}
              className="border p-2 rounded w-[180px]"
              value={carousel.subtitle?.[lang] || ""}
              onChange={(e) =>
                handleGeneralChange("subtitle", lang, e.target.value)
              }
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Başlıklar</label>
        <div className="flex gap-2 flex-wrap">
          {langs.map((lang) => (
            <input
              key={lang}
              placeholder={`Başlık (${lang.toUpperCase()})`}
              className="border p-2 rounded w-[180px]"
              value={carousel.title?.[lang] || ""}
              onChange={(e) =>
                handleGeneralChange("title", lang, e.target.value)
              }
            />
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Açıklama</label>
        <div className="flex gap-2 flex-wrap">
          {langs.map((lang) => (
            <textarea
              key={lang}
              placeholder={`Açıklama (${lang.toUpperCase()})`}
              className="border p-2 rounded w-[180px] min-h-[64px]"
              value={carousel.text?.[lang] || ""}
              onChange={(e) =>
                handleGeneralChange("text", lang, e.target.value)
              }
            />
          ))}
        </div>
      </div>

      {/* Slides */}
      {(carousel.slides || []).map((slide, idx) => (
        <div key={idx} className="border rounded p-3 mb-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <strong>Slide #{idx + 1}</strong>
            <button
              type="button"
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => handleRemove(idx)}
            >
              Sil
            </button>
          </div>

          {/* Görsel Dosya Yükle */}
          <div className="mb-3">
            <label className="block font-semibold mb-1">Görsel Yükle</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e, idx)}
                disabled={uploading[idx]}
              />
              {uploading[idx] && (
                <span className="text-blue-500">Yükleniyor…</span>
              )}
              {slide.image && (
                <img
                  src={
                    slide.image.startsWith("/")
                      ? `${apiUrl}${slide.image}`
                      : slide.image
                  }
                  alt={`Slide ${idx + 1}`}
                  className="w-24 h-16 object-cover rounded border"
                />
              )}
            </div>
          </div>

          {/* Slide header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {langs.map((lang) => (
              <div key={lang}>
                <label className="text-xs block mb-1">
                  Başlık ({lang.toUpperCase()})
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={slide.header?.[lang] || ""}
                  onChange={(e) =>
                    handleSlideTextChange("header", lang, e.target.value, idx)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleAdd}
      >
        + Slide Ekle
      </button>
    </section>
  );
}
