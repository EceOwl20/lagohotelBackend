"use client";
import { useState } from "react";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Çok dilli input bileşeni
function MultiLangInputs({ label, value = {}, onChange }) {
  return (
    <div className="mb-2">
      <b className="block mb-1">{label}</b>
      <div className="flex gap-2">
        {langs.map((lang) => (
          <input
            key={lang}
            className="border p-1 rounded w-1/4"
            defaultValue={value[lang] ?? ""}
            placeholder={value[lang] != null ? value[lang] : `${label} (${lang})`}
            onChange={(e) => onChange(lang, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

// Görsel yükleme helper
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${apiUrl}/api/upload`, {
    method: "POST",
    body: formData,
  });
  const result = await res.json();
  if (res.ok && result.imageUrl) return result.imageUrl;
  throw new Error(result.error || "Upload failed");
}

export default function SubrestaurantEdit({ data, setData }) {
  const [uploading, setUploading] = useState({});

  // Çok dilli alan güncelleme
  const setField = (section, field, lang, val) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...(prev[section]?.[field] || { tr: "", en: "", de: "", ru: "" }),
          [lang]: val,
        },
      },
    }));
  };

  // Tek görsel alanı yükle
  const handleImage = async (section, field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const key = `${section}.${field}`;
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const url = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: url },
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };

  // Carousel işlemleri
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
    const key = `carousel-${idx}`;
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const url = await uploadImage(file);
      handleCarouselChange(idx, url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };
  const addCarousel = () =>
    setData((prev) => ({ ...prev, carousel: [...(prev.carousel || []), ""] }));
  const removeCarousel = (idx) =>
    setData((prev) => ({
      ...prev,
      carousel: (prev.carousel || []).filter((_, i) => i !== idx),
    }));

  // Cuisines işlemleri
  const handleCuisineChange = (idx, field, lang, val) => {
    setData((prev) => {
      const arr = Array.isArray(prev.cuisines) ? [...prev.cuisines] : [];
      if (!arr[idx]) arr[idx] = {};
      if (["title", "description", "text", "buttonText"].includes(field)) {
        arr[idx][field] = { ...(arr[idx][field] || {}), [lang]: val };
      } else {
        arr[idx][field] = val;
      }
      return { ...prev, cuisines: arr };
    });
  };
  const handleCuisineImage = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const key = `cuisine-${idx}`;
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const url = await uploadImage(file);
      handleCuisineChange(idx, "image", null, url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };
  const addCuisine = () =>
    setData((prev) => ({ ...prev, cuisines: [...(prev.cuisines || []), {}] }));
  const removeCuisine = (idx) =>
    setData((prev) => ({
      ...prev,
      cuisines: (prev.cuisines || []).filter((_, i) => i !== idx),
    }));


    const handleOptionChange = (idx, field, lang, val) => {
    setData((prev) => {
      const arr = [...(prev.otheroptions?.restaurants || [])];
      if (!arr[idx]) arr[idx] = {};
      if (["title", "description", "text", "buttonText"].includes(field)) {
        arr[idx][field] = { ...(arr[idx][field] || {}), [lang]: val };
      } else {
        arr[idx][field] = val;
      }
      return {
        ...prev,
        otheroptions: { ...prev.otheroptions, restaurants: arr },
      };
    });
  };

  const handleOptionImage = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const key = `opt-img-${idx}`;
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const url = await uploadImage(file);
      // metodu yukarıdakine benzer şekilde çağır
      handleOptionChange(idx, "image", null, url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };

  const addOption = () => {
    setData((prev) => ({
      ...prev,
      otheroptions: {
        ...prev.otheroptions,
        restaurants: [
          ...(prev.otheroptions?.restaurants || []),
          { title: {}, description: {}, text: {}, buttonText: {}, link: "", image: "" },
        ],
      },
    }));
  };
  const opts = data.otheroptions || {};

  const removeOption = (idx) => {
    setData((prev) => ({
      ...prev,
      otheroptions: {
        ...prev.otheroptions,
        restaurants: prev.otheroptions.restaurants.filter((_, i) => i !== idx),
      },
    }));
  };


  // Banner verilerini hazırla
  const banner = data.mainBanner || {};
  const bannerSubtitle = banner.subtitle   || { tr: "", en: "", de: "", ru: "" };
  const bannerTitle    = banner.title      || { tr: "", en: "", de: "", ru: "" };
  const bannerText     = banner.text       || { tr: "", en: "", de: "", ru: "" };
  const bannerButton   = banner.buttonText|| { tr: "", en: "", de: "", ru: "" };
  const bannerImage    = banner.image      || "";

  // Info Section
  const info = data.infoSection || {};
  const infoSubtitle = info.subtitle || { tr: "", en: "", de: "", ru: "" };
  const infoTitle    = info.title    || { tr: "", en: "", de: "", ru: "" };
  const infoText1    = info.text1    || { tr: "", en: "", de: "", ru: "" };
  const infoText2    = info.text2    || { tr: "", en: "", de: "", ru: "" };
  const infoImg1     = info.image1   || "";
  const infoImg2     = info.image2   || "";

  // Background Section
  const bg = data.background || {};
  const bgSubtitle = bg.subtitle   || { tr: "", en: "", de: "", ru: "" };
  const bgTitle    = bg.title      || { tr: "", en: "", de: "", ru: "" };
  const bgText     = bg.text       || { tr: "", en: "", de: "", ru: "" };
  const bgButton   = bg.buttonText || { tr: "", en: "", de: "", ru: "" };
  const bgLink     = bg.link       || "";
  const bgImage    = bg.image      || "";

  return (
    <div className="flex flex-col gap-6">

      {/* --- Ana Banner --- */}
      <section className="p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Ana Banner</h3>
        <MultiLangInputs
          label="Banner Subtitle"
          value={bannerSubtitle}
          onChange={(lang, v) => setField("mainBanner", "subtitle", lang, v)}
        />
        <MultiLangInputs
          label="Banner Title"
          value={bannerTitle}
          onChange={(lang, v) => setField("mainBanner", "title", lang, v)}
        />
        <MultiLangInputs
          label="Banner Text"
          value={bannerText}
          onChange={(lang, v) => setField("mainBanner", "text", lang, v)}
        />
        <MultiLangInputs
          label="Banner Button Text"
          value={bannerButton}
          onChange={(lang, v) => setField("mainBanner", "buttonText", lang, v)}
        />
        <div className="mt-2 flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImage("mainBanner","image",e)}
            disabled={uploading["mainBanner.image"]}
          />
          {bannerImage && (
            <img
              src={
                bannerImage.startsWith("/uploads")
                  ? `${apiUrl}` + bannerImage
                  : bannerImage
              }
              alt="Banner"
              className="w-32 h-auto rounded border"
            />
          )}
        </div>
      </section>

      {/* --- Info Section --- */}
      <section className="p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Info Section</h3>
        <MultiLangInputs
          label="Subtitle"
          value={infoSubtitle}
          onChange={(lang, v) => setField("infoSection","subtitle",lang,v)}
        />
        <MultiLangInputs
          label="Title"
          value={infoTitle}
          onChange={(lang, v) => setField("infoSection","title",lang,v)}
        />
        <MultiLangInputs
          label="Text 1"
          value={infoText1}
          onChange={(lang, v) => setField("infoSection","text1",lang,v)}
        />
        <MultiLangInputs
          label="Text 2"
          value={infoText2}
          onChange={(lang, v) => setField("infoSection","text2",lang,v)}
        />
        <div className="mt-2 flex items-center gap-3">
          <label className="font-medium">Resim 1</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImage("infoSection","image1",e)}
            disabled={uploading["infoSection.image1"]}
          />
          {infoImg1 && (
            <img
              src={
                infoImg1.startsWith("/uploads")
                  ? `${apiUrl}` + infoImg1
                  : infoImg1
              }
              alt="Info1"
              className="w-16 h-auto rounded border"
            />
          )}
        </div>
        <div className="mt-2 flex items-center gap-3">
          <label className="font-medium">Resim 2</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImage("infoSection","image2",e)}
            disabled={uploading["infoSection.image2"]}
          />
          {infoImg2 && (
            <img
              src={
                infoImg2.startsWith("/uploads")
                  ? `${apiUrl}` + infoImg2
                  : infoImg2
              }
              alt="Info2"
              className="w-16 h-auto rounded border"
            />
          )}
        </div>
      </section>

      {/* --- Carousel --- */}
      <section className="p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Carousel</h3>
        {(data.carousel || []).map((url, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              className="border p-1 rounded flex-1"
              placeholder="Görsel URL"
              value={url}
              onChange={e => handleCarouselChange(idx, e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => handleCarouselImage(idx, e)}
              disabled={uploading[`carousel-${idx}`]}
            />
            <button onClick={() => removeCarousel(idx)} className="text-red-500">
              Sil
            </button>
            {url && (
              <img
                src={
                  url.startsWith("/uploads")
                    ? `${apiUrl}` + url
                    : url
                }
                alt="Carousel"
                className="w-16 h-auto rounded border"
              />
            )}
          </div>
        ))}
        <button onClick={addCarousel} className="px-2 py-1 bg-green-600 text-white rounded">
          + Yeni Görsel Ekle
        </button>
      </section>

      {/* --- Cuisines --- */}
      <section className="p-4 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2">Other Options</h3>

      {/* Üst seviye başlık/alt başlık/text */}
      <MultiLangInputs
        label="Başlık"
        value={opts.title}
        onChange={(lang, v) => setField("otheroptions", "title", lang, v)}
      />
      <MultiLangInputs
        label="Alt Başlık"
        value={opts.subtitle}
        onChange={(lang, v) => setField("otheroptions", "subtitle", lang, v)}
      />
      <MultiLangInputs
        label="Açıklama"
        value={opts.text}
        onChange={(lang, v) => setField("otheroptions", "text", lang, v)}
      />

      {/* Alt öğeler */}
      {(opts.restaurants || []).map((item, idx) => (
        <div key={idx} className="border rounded p-3 mb-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <strong>Restaurant #{idx + 1}</strong>
            <button
              className="text-red-600"
              onClick={() => removeOption(idx)}
            >
              Sil
            </button>
          </div>
          <MultiLangInputs
            label="Başlık"
            value={item.title}
            onChange={(lang, v) => handleOptionChange(idx, "title", lang, v)}
          />
          <MultiLangInputs
            label="Açıklama"
            value={item.description}
            onChange={(lang, v) => handleOptionChange(idx, "description", lang, v)}
          />
          <MultiLangInputs
            label="Ekstra Metin"
            value={item.text}
            onChange={(lang, v) => handleOptionChange(idx, "text", lang, v)}
          />
          <MultiLangInputs
            label="Buton Metni"
            value={item.buttonText}
            onChange={(lang, v) => handleOptionChange(idx, "buttonText", lang, v)}
          />
          <div className="mb-2">
            <label className="block font-semibold">Link</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={item.link || ""}
              onChange={(e) =>
                handleOptionChange(idx, "link", null, e.target.value)
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleOptionImage(idx, e)}
              disabled={uploading[`opt-img-${idx}`]}
            />
            {item.image && (
              <img
                src={
                  item.image.startsWith("/uploads")
                    ? `${apiUrl}${item.image}`
                    : item.image
                }
                alt={`Option ${idx}`}
                className="w-24 h-auto rounded border"
              />
            )}
          </div>
        </div>
      ))}

      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={addOption}
      >
        + Yeni Restaurant Ekle
      </button>
    </section>

      {/* --- Background --- */}
      <section className="p-4 border rounded bg-gray-50 mb-6">
        <h3 className="font-semibold mb-2">Background Section</h3>
        <MultiLangInputs
          label="Subtitle"
            value={data.background?.subtitle}
          onChange={(lang, v) => setField("background", "subtitle", lang, v)}
        />
        <MultiLangInputs
          label="Title"
          value={bgTitle}
          onChange={(lang, v) => setField("background", "title", lang, v)}
        />
        <MultiLangInputs
          label="Text"
          value={bgText}
          onChange={(lang, v) => setField("background", "text", lang, v)}
        />
        <MultiLangInputs
          label="Button Text"
          value={bgButton}
          onChange={(lang, v) => setField("background", "buttonText", lang, v)}
        />
        <input
          type="text"
          placeholder="Link"
          className="border p-1 rounded w-full mb-2"
          value={bgLink}
          onChange={e =>
            setData((prev) => ({
              ...prev,
              background: { ...prev.background, link: e.target.value },
            }))
          }
        />
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage("background","image",e)}
            disabled={uploading["background.image"]}
          />
          {bgImage && (
            <img
              src={
                bgImage.startsWith("/uploads")
                  ? `${apiUrl}` + bgImage
                  : bgImage
              }
              alt="Background"
              className="w-32 h-auto rounded border"
            />
          )}
        </div>
      </section>
    </div>
  );
}
