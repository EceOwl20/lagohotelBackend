"use client";
import { useRef, useState } from "react";

const langs = ["tr", "en", "de", "ru"];

export default function SubRoomBannerEdit({ data, setData, langs }) {
  const banner = data.banner || {};
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Çoklu dil için nesne şablonu
  const emptyLangs = langs.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {});

  // texts alanı hazır yoksa boş diziye çekelim
  const texts = Array.isArray(banner.texts) && banner.texts.length > 0
    ? banner.texts
    : [{ ...emptyLangs }];

  const handleChange = (field, langOrValue, value, idx) => {
    if (field === "title" || field === "span" || field === "subtitle") {
      setData({
        ...data,
        banner: {
          ...banner,
          [field]: { ...(banner[field] || {}), [langOrValue]: value }
        }
      });
    } else if (field === "texts") {
      // texts: idx'li şekilde
      const newTexts = [...texts];
      newTexts[idx][langOrValue] = value;
      setData({
        ...data,
        banner: { ...banner, texts: newTexts }
      });
    } else {
      setData({
        ...data,
        banner: { ...banner, [field]: value }
      });
    }
  };

  const handleAddText = () => {
    setData({
      ...data,
      banner: { ...banner, texts: [...texts, { ...emptyLangs }] }
    });
  };

  const handleRemoveText = (idx) => {
    const newTexts = texts.filter((_, i) => i !== idx);
    setData({
      ...data,
      banner: { ...banner, texts: newTexts }
    });
  };

  // Dosya yükleme fonksiyonu
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok || !result.imageUrl) throw new Error(result.error || "Yükleme başarısız");
      // Backend imageUrl'i /uploads/... olarak döndürmeli.
      setData({
        ...data,
        banner: { ...banner, image: result.imageUrl }
      });
    } catch (err) {
      setError("Resim yüklenemedi! " + (err?.message || ""));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border p-4 rounded bg-white mb-8 ">
      <h3 className="font-bold mb-3">Banner</h3>

      <label className="block mb-2 font-semibold">Resim Yükle</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
      />
      {uploading && <p className="text-blue-600">Yükleniyor...</p>}
      {banner.image && (
        <img
          src={`http://localhost:5001${banner.image}`}
          alt="Banner"
          className="w-32 h-24 object-cover rounded my-2"
        />
      )}
      {error && <p className="text-red-600">{error}</p>}

      {/* Çoklu dil: başlık */}
      {langs.map(lang => (
        <div key={`title-${lang}`} className="mb-2">
          <input
            className="border p-2 w-full"
            placeholder={`Başlık (${lang})`}
            value={banner.title?.[lang] || ""}
            onChange={e => handleChange("title", lang, e.target.value)}
          />
        </div>
      ))}

      {/* Çoklu dil: span/subtitle */}
      {langs.map(lang => (
        <div key={`span-${lang}`} className="mb-2">
          <input
            className="border p-2 w-full"
            placeholder={`Span/SubTitle (${lang})`}
            value={banner.span?.[lang] || ""}
            onChange={e => handleChange("span", lang, e.target.value)}
          />
        </div>
      ))}

      {/* Çoklu dil: Texts array */}
      <div className="mb-2">
        <label className="block font-bold mb-1">Açıklama Metinleri</label>
        {texts.map((textObj, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2 flex-1"
                placeholder={`Text (${lang})`}
                value={textObj?.[lang] || ""}
                onChange={e => handleChange("texts", lang, e.target.value, idx)}
              />
            ))}
            {texts.length > 1 && (
              <button
                className="ml-2 text-red-500"
                type="button"
                onClick={() => handleRemoveText(idx)}
              >
                Sil
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="text-blue-600 underline mt-1"
          onClick={handleAddText}
        >
          + Yeni Metin Ekle
        </button>
      </div>

      <label className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={!!banner.baby}
          onChange={e => handleChange("baby", null, e.target.checked)}
        />
        Bebekli Oda mı?
      </label>
    </div>
  );
}
