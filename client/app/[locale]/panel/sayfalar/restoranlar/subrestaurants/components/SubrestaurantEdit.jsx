"use client";
import { useState } from "react";

const langs = ["tr", "en", "de", "ru"];

// Yardımcı multi-lang input fonksiyonu
function MultiLangInputs({ label, value = {}, onChange }) {
  return (
    <div className="mb-2">
      <b className="block mb-1">{label}</b>
      <div className="flex gap-2">
        {langs.map((lang) => (
          <input
            key={lang}
            className="border p-1 rounded w-1/4"
            placeholder={`${label} (${lang})`}
            value={value[lang] || ""}
            onChange={(e) => onChange(lang, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

// Görsel yükleme
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const result = await res.json();
  if (res.ok && result.imageUrl) return result.imageUrl;
  throw new Error(result.error || "Upload failed");
}

export default function SubrestaurantEdit({ data, setData }) {
  const [uploading, setUploading] = useState({});

  // Banner alanı değişikliği
  const handleBannerChange = (field, lang, value) => {
    setData((prev) => ({
      ...prev,
      mainBanner: {
        ...prev.mainBanner,
        [field]: { ...prev.mainBanner?.[field], [lang]: value },
      },
    }));
  };
  const handleBannerImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, mainBanner: true }));
    try {
      const imageUrl = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        mainBanner: { ...prev.mainBanner, image: imageUrl },
      }));
    } finally {
      setUploading((prev) => ({ ...prev, mainBanner: false }));
    }
  };

  // InfoSection değişikliği
  const handleInfoChange = (field, lang, value) => {
    setData((prev) => ({
      ...prev,
      infoSection: {
        ...prev.infoSection,
        [field]: { ...prev.infoSection?.[field], [lang]: value },
      },
    }));
  };
  const handleInfoImage = async (field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, [field]: true }));
    try {
      const imageUrl = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        infoSection: { ...prev.infoSection, [field]: imageUrl },
      }));
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Carousel
  const handleCarouselChange = (idx, url) => {
    setData((prev) => {
      const arr = Array.isArray(prev.carousel) ? [...prev.carousel] : [];
      arr[idx] = url;
      return { ...prev, carousel: arr };
    });
  };
  const handleCarouselImage = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, ["carousel-" + idx]: true }));
    try {
      const imageUrl = await uploadImage(file);
      handleCarouselChange(idx, imageUrl);
    } finally {
      setUploading((prev) => ({ ...prev, ["carousel-" + idx]: false }));
    }
  };
  const handleCarouselAdd = () =>
    setData((prev) => ({
      ...prev,
      carousel: [...(prev.carousel || []), ""],
    }));
  const handleCarouselRemove = (idx) =>
    setData((prev) => ({
      ...prev,
      carousel: (prev.carousel || []).filter((_, i) => i !== idx),
    }));

  // Cuisines array
  const handleCuisineChange = (idx, field, langOrValue, value) => {
    setData((prev) => {
      const arr = Array.isArray(prev.cuisines) ? [...prev.cuisines] : [];
      if (!arr[idx]) arr[idx] = {};
      if (["title", "description", "text", "buttonText"].includes(field)) {
        arr[idx][field] = { ...(arr[idx][field] || {}), [langOrValue]: value };
      } else {
        arr[idx][field] = langOrValue;
      }
      return { ...prev, cuisines: arr };
    });
  };
  const handleCuisineImage = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, ["cuisine-" + idx]: true }));
    try {
      const imageUrl = await uploadImage(file);
      handleCuisineChange(idx, "image", imageUrl);
    } finally {
      setUploading((prev) => ({ ...prev, ["cuisine-" + idx]: false }));
    }
  };
  const handleCuisineAdd = () =>
    setData((prev) => ({
      ...prev,
      cuisines: [...(prev.cuisines || []), {}],
    }));
  const handleCuisineRemove = (idx) =>
    setData((prev) => ({
      ...prev,
      cuisines: (prev.cuisines || []).filter((_, i) => i !== idx),
    }));

  // Background
  const handleBackgroundChange = (field, lang, value) => {
    setData((prev) => ({
      ...prev,
      background: {
        ...prev.background,
        [field]: { ...prev.background?.[field], [lang]: value },
      },
    }));
  };
  const handleBackgroundImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, background: true }));
    try {
      const imageUrl = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        background: { ...prev.background, image: imageUrl },
      }));
    } finally {
      setUploading((prev) => ({ ...prev, background: false }));
    }
  };

  // Panel render
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-xl mb-3">Restaurant Düzenle</h2>
      {/* --- Banner --- */}
      <div className="p-4 border rounded mb-2">
        <h3 className="font-semibold mb-2">Ana Banner</h3>
        <MultiLangInputs
          label="Banner Subtitle"
          value={data.mainBanner?.subtitle}
          onChange={(lang, v) => handleBannerChange("subtitle", lang, v)}
        />
        <MultiLangInputs
          label="Banner Title"
          value={data.mainBanner?.title}
          onChange={(lang, v) => handleBannerChange("title", lang, v)}
        />
        <MultiLangInputs
          label="Banner Text"
          value={data.mainBanner?.text}
          onChange={(lang, v) => handleBannerChange("text", lang, v)}
        />
        <div className="flex items-center gap-3 mt-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerImage}
            disabled={uploading.mainBanner}
          />
          {data.mainBanner?.image && (
            <img
              src={
                data.mainBanner.image.startsWith("/uploads")
                  ? "http://localhost:5001" + data.mainBanner.image
                  : data.mainBanner.image
              }
              alt="Banner"
              className="w-32 h-auto rounded border"
            />
          )}
        </div>
      </div>
      {/* --- Info Section --- */}
      <div className="p-4 border rounded mb-2">
        <h3 className="font-semibold mb-2">Info Section</h3>
        <MultiLangInputs
          label="Subtitle"
          value={data.infoSection?.subtitle}
          onChange={(lang, v) => handleInfoChange("subtitle", lang, v)}
        />
        <MultiLangInputs
          label="Title"
          value={data.infoSection?.title}
          onChange={(lang, v) => handleInfoChange("title", lang, v)}
        />
        <MultiLangInputs
          label="Text 1"
          value={data.infoSection?.text1}
          onChange={(lang, v) => handleInfoChange("text1", lang, v)}
        />
        <MultiLangInputs
          label="Text 2"
          value={data.infoSection?.text2}
          onChange={(lang, v) => handleInfoChange("text2", lang, v)}
        />
        <div className="flex items-center gap-3 mt-2">
          <span>Resim 1</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleInfoImage("image1", e)}
            disabled={uploading.image1}
          />
          {data.infoSection?.image1 && (
            <img
              src={
                data.infoSection.image1.startsWith("/uploads")
                  ? "http://localhost:5001" + data.infoSection.image1
                  : data.infoSection.image1
              }
              alt="img1"
              className="w-16 h-auto rounded border"
            />
          )}
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span>Resim 2</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleInfoImage("image2", e)}
            disabled={uploading.image2}
          />
          {data.infoSection?.image2 && (
            <img
              src={
                data.infoSection.image2.startsWith("/uploads")
                  ? "http://localhost:5001" + data.infoSection.image2
                  : data.infoSection.image2
              }
              alt="img2"
              className="w-16 h-auto rounded border"
            />
          )}
        </div>
      </div>
      {/* --- Carousel --- */}
      <div className="p-4 border rounded mb-2">
        <h3 className="font-semibold mb-2">Carousel</h3>
        {(data.carousel || []).map((img, idx) => (
          <div key={idx} className="flex items-center gap-3 mb-1">
            <input
              className="border p-1 rounded w-full"
              placeholder="Görsel URL"
              value={img || ""}
              onChange={e => handleCarouselChange(idx, e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => handleCarouselImage(idx, e)}
              disabled={uploading["carousel-" + idx]}
            />
            <button onClick={() => handleCarouselRemove(idx)} className="text-red-500">Sil</button>
            {img && (
              <img
                src={
                  img.startsWith("/uploads")
                    ? "http://localhost:5001" + img
                    : img
                }
                alt="carousel"
                className="w-16 h-auto rounded border"
              />
            )}
          </div>
        ))}
        <button onClick={handleCarouselAdd} className="px-2 py-1 bg-blue-500 text-white rounded">
          + Yeni Carousel Görseli
        </button>
      </div>
      {/* --- Cuisines (3 lü array gibi) --- */}
      <div className="p-4 border rounded mb-2">
        <h3 className="font-semibold mb-2">Cuisines (Diğer restoran opsiyonları)</h3>
        {(data.cuisines || []).map((cuisine, idx) => (
          <div key={idx} className="border rounded p-2 mb-2">
            <MultiLangInputs
              label="Başlık"
              value={cuisine.title}
              onChange={(lang, v) => handleCuisineChange(idx, "title", lang, v)}
            />
            <MultiLangInputs
              label="Açıklama"
              value={cuisine.description}
              onChange={(lang, v) => handleCuisineChange(idx, "description", lang, v)}
            />
            <MultiLangInputs
              label="Ekstra Text"
              value={cuisine.text}
              onChange={(lang, v) => handleCuisineChange(idx, "text", lang, v)}
            />
            <MultiLangInputs
              label="Button Text"
              value={cuisine.buttonText}
              onChange={(lang, v) => handleCuisineChange(idx, "buttonText", lang, v)}
            />
            <input
              className="border p-1 rounded w-full my-1"
              placeholder="Link"
              value={cuisine.link || ""}
              onChange={e => handleCuisineChange(idx, "link", e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => handleCuisineImage(idx, e)}
              disabled={uploading["cuisine-" + idx]}
            />
            {cuisine.image && (
              <img
                src={
                  cuisine.image.startsWith("/uploads")
                    ? "http://localhost:5001" + cuisine.image
                    : cuisine.image
                }
                alt="cuisine"
                className="w-20 h-auto rounded border mt-2"
              />
            )}
            <button onClick={() => handleCuisineRemove(idx)} className="text-red-500">Sil</button>
          </div>
        ))}
        <button onClick={handleCuisineAdd} className="px-2 py-1 bg-blue-500 text-white rounded">
          + Yeni Cuisine
        </button>
      </div>
      {/* --- Background --- */}
      <div className="p-4 border rounded mb-2">
        <h3 className="font-semibold mb-2">Background Section</h3>
        <MultiLangInputs
          label="Arkaplan Subtitle"
          value={data.background?.subtitle}
          onChange={(lang, v) => handleBackgroundChange("subtitle", lang, v)}
        />
        <MultiLangInputs
          label="Arkaplan Title"
          value={data.background?.title}
          onChange={(lang, v) => handleBackgroundChange("title", lang, v)}
        />
        <MultiLangInputs
          label="Arkaplan Text"
          value={data.background?.text}
          onChange={(lang, v) => handleBackgroundChange("text", lang, v)}
        />
        <MultiLangInputs
          label="Button Text"
          value={data.background?.buttonText}
          onChange={(lang, v) => handleBackgroundChange("buttonText", lang, v)}
        />
        <input
          className="border p-1 rounded w-full my-1"
          placeholder="Link"
          value={data.background?.link || ""}
          onChange={e => handleBackgroundChange("link", "", e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundImage}
          disabled={uploading.background}
        />
        {data.background?.image && (
          <img
            src={
              data.background.image.startsWith("/uploads")
                ? "http://localhost:5001" + data.background.image
                : data.background.image
            }
            alt="background"
            className="w-32 h-auto rounded border mt-2"
          />
        )}
      </div>
    </div>
  );
}
