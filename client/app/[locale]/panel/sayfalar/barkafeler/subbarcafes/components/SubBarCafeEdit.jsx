"use client";
import { useState, useEffect } from "react";
const langs = ["tr", "en", "de", "ru"];
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
            value={value?.[lang] || ""}
            onChange={(e) => onChange(lang, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
  const result = await res.json();
  if (res.ok && result.imageUrl) return result.imageUrl;
  throw new Error(result.error || "Upload failed");
}
export default function SubBarCafeEdit({ data, setData }) {
  const [existingImages, setExistingImages] = useState([]);
  const [uploading, setUploading] = useState({});

  // 1) Mevcut resimleri yükle
  useEffect(() => {
    fetch(`${apiUrl}/api/upload/list`)
      .then(r => r.json())
      .then(files => setExistingImages(files))
      .catch(console.error);
  }, []);


  const setField = (section, field, langOrValue, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value !== undefined
          ? { ...(prev[section]?.[field] || {}), [langOrValue]: value }
          : langOrValue,
      }
    }));
  };

  // Image uploads (mainBanner, infoSection, background)
  const handleImage = async (section, field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [section + field]: true }));
    try {
      const imageUrl = await uploadImage(file);
      setData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: imageUrl }
      }));
    } finally {
      setUploading(prev => ({ ...prev, [section + field]: false }));
    }
  };

  // Carousel
  const handleCarouselChange = (idx, url) => {
    setData(prev => {
      const arr = Array.isArray(prev.carousel) ? [...prev.carousel] : [];
      arr[idx] = url;
      return { ...prev, carousel: arr };
    });
  };
  const handleCarouselImage = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, ["carousel-" + idx]: true }));
    try {
      const imageUrl = await uploadImage(file);
      handleCarouselChange(idx, imageUrl);
    } finally {
      setUploading(prev => ({ ...prev, ["carousel-" + idx]: false }));
    }
  };
  const handleCarouselAdd = () =>
    setData(prev => ({
      ...prev,
      carousel: [...(prev.carousel || []), ""],
    }));
  const handleCarouselRemove = (idx) =>
    setData(prev => ({
      ...prev,
      carousel: (prev.carousel || []).filter((_, i) => i !== idx),
    }));

  // Cafes array (alt bar/cafe seçenekleri)
  const handleCafeChange = (idx, field, langOrValue, value) => {
    setData(prev => {
      const arr = Array.isArray(prev.cafes) ? [...prev.cafes] : [];
      if (!arr[idx]) arr[idx] = {};
      if (["title", "description", "text", "buttonText"].includes(field)) {
        arr[idx][field] = { ...(arr[idx][field] || {}), [langOrValue]: value };
      } else {
        arr[idx][field] = langOrValue;
      }
      return { ...prev, cafes: arr };
    });
  };
  const handleCafeImage = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, ["cafe-" + idx]: true }));
    try {
      const imageUrl = await uploadImage(file);
      handleCafeChange(idx, "image", imageUrl);
    } finally {
      setUploading(prev => ({ ...prev, ["cafe-" + idx]: false }));
    }
  };
  const handleCafeAdd = () =>
    setData(prev => ({
      ...prev,
      cafes: [...(prev.cafes || []), {}],
    }));
  const handleCafeRemove = (idx) =>
    setData(prev => ({
      ...prev,
      cafes: (prev.cafes || []).filter((_, i) => i !== idx),
    }));

    const handleImageUpload = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [idx]: true }));
    const form = new FormData();
    form.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: form,
      });
      const { imageUrl } = await res.json();
      setData(prev => {
        const arr = [...(prev.otheroptions?.cafes || [])];
        arr[idx].image = imageUrl;
        return { ...prev, otheroptions: { ...prev.otheroptions, cafes: arr } };
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(prev => ({ ...prev, [idx]: false }));
    }
  };

  // Panel render
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-xl mb-3">Bar/Cafe Düzenle</h2>
      {/* Banner */}
      <div className="p-4 border rounded mb-2">
        <h3 className="font-semibold mb-2">Ana Banner</h3>
        <MultiLangInputs
          label="Banner Subtitle"
          value={data.mainBanner?.subtitle}
          onChange={(lang, v) => setField("mainBanner", "subtitle", lang, v)}
        />
        <MultiLangInputs
          label="Banner Title"
          value={data.mainBanner?.title}
          onChange={(lang, v) => setField("mainBanner", "title", lang, v)}
        />
        <MultiLangInputs
          label="Banner Text"
          value={data.mainBanner?.text}
          onChange={(lang, v) => setField("mainBanner", "text", lang, v)}
        />
        <div className="flex items-center gap-3 mt-2">
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImage("mainBanner", "image", e)}
            disabled={uploading.mainBannerimage}
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
      {/* Info Section */}
      <div className="p-4 border rounded mb-2">
        <h3 className="font-semibold mb-2">Bilgi Bölümü (Info Section)</h3>
        <MultiLangInputs
          label="Subtitle"
          value={data.infoSection?.subtitle}
          onChange={(lang, v) => setField("infoSection", "subtitle", lang, v)}
        />
        <MultiLangInputs
          label="Title"
          value={data.infoSection?.title}
          onChange={(lang, v) => setField("infoSection", "title", lang, v)}
        />
        <MultiLangInputs
          label="Text 1"
          value={data.infoSection?.text1}
          onChange={(lang, v) => setField("infoSection", "text1", lang, v)}
        />
        <MultiLangInputs
          label="Text 2"
          value={data.infoSection?.text2}
          onChange={(lang, v) => setField("infoSection", "text2", lang, v)}
        />
        <div className="flex items-center gap-3 mt-2">
          <span>Resim 1</span>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleImage("infoSection", "image1", e)}
            disabled={uploading.infoSectionimage1}
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
            onChange={e => handleImage("infoSection", "image2", e)}
            disabled={uploading.infoSectionimage2}
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

      {/* img carousel */}
      {/* Carousel */}
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
      

      <section className="p-4 border rounded bg-gray-50">
  <h3 className="font-semibold mb-2">Other Options</h3>

  {/* Üst seviye title / subtitle / text */}
  <MultiLangInputs
    label="Başlık"
    value={data.otheroptions?.title}
    onChange={(lang, v) =>
      setData(prev => ({
        ...prev,
        otheroptions: {
          ...prev.otheroptions,
          title: { ...(prev.otheroptions?.title || {}), [lang]: v },
        },
      }))
    }
  />
  <MultiLangInputs
    label="Alt Başlık"
    value={data.otheroptions?.subtitle}
    onChange={(lang, v) =>
      setData(prev => ({
        ...prev,
        otheroptions: {
          ...prev.otheroptions,
          subtitle: { ...(prev.otheroptions?.subtitle || {}), [lang]: v },
        },
      }))
    }
  />
  <MultiLangInputs
    label="Açıklama"
    value={data.otheroptions?.text}
    onChange={(lang, v) =>
      setData(prev => ({
        ...prev,
        otheroptions: {
          ...prev.otheroptions,
          text: { ...(prev.otheroptions?.text || {}), [lang]: v },
        },
      }))
    }
  />

  {/* Cafes dizisi */}
  {(data.otheroptions?.cafes || []).map((cafe, idx) => (
    <div key={idx} className="border rounded p-3 mb-3 bg-white">
      <div className="flex justify-between items-center mb-2">
        <strong>Cafe #{idx + 1}</strong>
        <button
          onClick={() =>
            setData(prev => ({
              ...prev,
              otheroptions: {
                ...prev.otheroptions,
                cafes: prev.otheroptions.cafes.filter((_, i) => i !== idx),
              },
            }))
          }
          className="text-red-600"
        >
          Sil
        </button>
      </div>

      <MultiLangInputs
        label="Cafe Başlığı"
        value={cafe.title}
        onChange={(lang, v) =>
          setData(prev => {
            const arr = [...(prev.otheroptions?.cafes || [])];
            arr[idx].title = { ...(arr[idx].title || {}), [lang]: v };
            return { ...prev, otheroptions: { ...prev.otheroptions, cafes: arr } };
          })
        }
      />
      <MultiLangInputs
        label="Açıklama"
        value={cafe.description}
        onChange={(lang, v) =>
          setData(prev => {
            const arr = [...(prev.otheroptions?.cafes || [])];
            arr[idx].description = { ...(arr[idx].description || {}), [lang]: v };
            return { ...prev, otheroptions: { ...prev.otheroptions, cafes: arr } };
          })
        }
      />
      <MultiLangInputs
        label="Ekstra Metin"
        value={cafe.text}
        onChange={(lang, v) =>
          setData(prev => {
            const arr = [...(prev.otheroptions?.cafes || [])];
            arr[idx].text = { ...(arr[idx].text || {}), [lang]: v };
            return { ...prev, otheroptions: { ...prev.otheroptions, cafes: arr } };
          })
        }
      />
      <MultiLangInputs
        label="Buton Metni"
        value={cafe.buttonText}
        onChange={(lang, v) =>
          setData(prev => {
            const arr = [...(prev.otheroptions?.cafes || [])];
            arr[idx].buttonText = { ...(arr[idx].buttonText || {}), [lang]: v };
            return { ...prev, otheroptions: { ...prev.otheroptions, cafes: arr } };
          })
        }
      />

      <input
        type="text"
        placeholder="Link"
        className="border p-1 rounded w-full mb-2"
        value={cafe.link || ""}
        onChange={e =>
          setData(prev => {
            const arr = [...(prev.otheroptions?.cafes || [])];
            arr[idx].link = e.target.value;
            return { ...prev, otheroptions: { ...prev.otheroptions, cafes: arr } };
          })
        }
      />

      <div className="flex items-center gap-2 mb-2">
        <input
          type="file"
          accept="image/*"
          onChange={async e => {
            const file = e.target.files?.[0];
            if (!file) return;
            // uploading state’i kendinize göre yönetin
            const form = new FormData();
            form.append("image", file);
            const res = await fetch(`${apiUrl}/api/upload`, {
              method: "POST",
              body: form,
            });
            const { imageUrl } = await res.json();
            setData(prev => {
              const arr = [...(prev.otheroptions?.cafes || [])];
              arr[idx].image = imageUrl;
              return { ...prev, otheroptions: { ...prev.otheroptions, cafes: arr } };
            });
          }}
        />
        {cafe.image && (
          <img
            src={
              cafe.image.startsWith("/uploads")
                ? `${apiUrl}${cafe.image}`
                : cafe.image
            }
            alt={`Cafe ${idx + 1}`}
            className="w-20 h-auto rounded border"
          />
        )}
      </div>
       <div className="mb-4">
            <label className="block font-semibold mb-1">Mevcut Resim Seç</label>
            <select
              className="border p-2 rounded w-full"
              value={cafe.image || ""}
              onChange={e =>
                setData(prev => {
                  const arr = [...(prev.otheroptions?.cafes || [])];
                  arr[idx].image = e.target.value;
                  return { ...prev, otheroptions: { ...prev.otheroptions, cafes: arr } };
                })
              }
            >
              <option value="">— Seçin —</option>
              {existingImages.map(file => {
                const url = `/uploads/${file}`;
                return (
                  <option key={file} value={url}>
                    {file}
                  </option>
                );
              })}
            </select>
          </div>
    </div>
  ))}

  <button
    onClick={() =>
      setData(prev => ({
        ...prev,
        otheroptions: {
          ...prev.otheroptions,
          cafes: [
            ...(prev.otheroptions?.cafes || []),
            {
              title: {}, description: {}, text: {}, buttonText: {},
              link: "", image: ""
            },
          ],
        },
      }))
    }
    className="px-2 py-1 bg-green-600 text-white rounded"
  >
    + Yeni Cafe Ekle
  </button>
</section>



      {/* Cafes */}
      {/* <div className="p-4 border rounded mb-2">
        <h3 className="font-semibold mb-2">Bar/Cafe Seçenekleri (Diğer opsiyonlar)</h3>
        {(data.cafes || []).map((cafe, idx) => (
          <div key={idx} className="border rounded p-2 mb-2">
            <MultiLangInputs
              label="Başlık"
              value={cafe.title}
              onChange={(lang, v) => handleCafeChange(idx, "title", lang, v)}
            />
            <MultiLangInputs
              label="Açıklama"
              value={cafe.description}
              onChange={(lang, v) => handleCafeChange(idx, "description", lang, v)}
            />
            <MultiLangInputs
              label="Ekstra Text"
              value={cafe.text}
              onChange={(lang, v) => handleCafeChange(idx, "text", lang, v)}
            />
            <MultiLangInputs
              label="Button Text"
              value={cafe.buttonText}
              onChange={(lang, v) => handleCafeChange(idx, "buttonText", lang, v)}
            />
            <input
              className="border p-1 rounded w-full my-1"
              placeholder="Link"
              value={cafe.link || ""}
              onChange={e => handleCafeChange(idx, "link", e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => handleCafeImage(idx, e)}
              disabled={uploading["cafe-" + idx]}
            />
            {cafe.image && (
              <img
                src={
                  cafe.image.startsWith("/uploads")
                    ? "http://localhost:5001" + cafe.image
                    : cafe.image
                }
                alt="cafe"
                className="w-20 h-auto rounded border mt-2"
              />
            )}
            <button onClick={() => handleCafeRemove(idx)} className="text-red-500">Sil</button>
          </div>
        ))}
        <button onClick={handleCafeAdd} className="px-2 py-1 bg-blue-500 text-white rounded">
          + Yeni Cafe
        </button>
      </div> */}


      {/* Background */}
      <div className="p-4 border rounded mb-2">
        <h3 className="font-semibold mb-2">Background Section</h3>
        <MultiLangInputs
          label="Arkaplan Subtitle"
          value={data.background?.subtitle}
          onChange={(lang, v) => setField("background", "subtitle", lang, v)}
        />
        <MultiLangInputs
          label="Arkaplan Title"
          value={data.background?.title}
          onChange={(lang, v) => setField("background", "title", lang, v)}
        />
        <MultiLangInputs
          label="Arkaplan Text"
          value={data.background?.text}
          onChange={(lang, v) => setField("background", "text", lang, v)}
        />
        <MultiLangInputs
          label="Button Text"
          value={data.background?.buttonText}
          onChange={(lang, v) => setField("background", "buttonText", lang, v)}
        />
        <input
          className="border p-1 rounded w-full my-1"
          placeholder="Link"
          value={data.background?.link || ""}
          onChange={e => setData(prev => ({
            ...prev,
            background: { ...prev.background, link: e.target.value }
          }))}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImage("background", "image", e)}
          disabled={uploading.backgroundimage}
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
