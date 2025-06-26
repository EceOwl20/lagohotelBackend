"use client";
import { useState } from "react";

const dilAdlari = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function CuisinesEdit({ data, setData, langs, blockName = "cuisines" }) {
  const cuisines = data[blockName] || [];
  const [uploadingIdx, setUploadingIdx] = useState(null);

  const addCuisine = () => {
    const emptyCuisine = {
      image: "",
      title: { tr: "", en: "", de: "", ru: "" },
      description: { tr: "", en: "", de: "", ru: "" },
      text: { tr: "", en: "", de: "", ru: "" },
      link: "",
      buttonText: { tr: "", en: "", de: "", ru: "" }
    };
    setData({
      ...data,
      [blockName]: [...cuisines, emptyCuisine]
    });
  };

  const removeCuisine = (i) => {
    setData({
      ...data,
      [blockName]: cuisines.filter((_, idx) => idx !== i)
    });
  };

  // Görsel upload fonksiyonu
  const handleImageUpload = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIdx(idx);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const updated = [...cuisines];
      updated[idx].image = result.imageUrl;
      setData({ ...data, [blockName]: updated });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploadingIdx(null);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">
        {blockName === "cuisines" ? "Cuisines Carousel" : "Cuisines Carousel 2"}
      </h3>
      <button
        type="button"
        className="mb-3 px-4 py-1 bg-green-600 text-white rounded"
        onClick={addCuisine}
      >+ Cuisine Ekle</button>
      {cuisines.map((item, idx) => (
        <div key={idx} className="border p-3 rounded mb-6 bg-gray-50 space-y-3">
          <button
            type="button"
            className="mb-2 px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => removeCuisine(idx)}
          >Sil</button>

          {/* Görsel yükleme */}
          <label className="font-semibold">Görsel Yükle</label>
          <div className="flex items-center gap-4 mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={e => handleImageUpload(e, idx)}
              disabled={uploadingIdx === idx}
              className="block"
            />
            {uploadingIdx === idx && <span className="text-blue-500">Yükleniyor...</span>}
            {item.image && (
              <img
                src={`http://localhost:5001${item.image}`}
                alt="Görsel"
                className="w-24 h-16 object-cover border rounded"
              />
            )}
          </div>
          <input
            type="text"
            value={item.image || ""}
            readOnly
            className="w-full border p-2 rounded mb-2 bg-gray-100 cursor-not-allowed"
          />

          {/* Başlık, Açıklama, Text ve Buton metni tüm diller aynı şekilde */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            {langs.map(lang => (
              <div key={lang} className="flex flex-col border border-gray-200 rounded-md p-2">
                <span className="text-xs font-semibold text-gray-600 mb-2">{dilAdlari[lang]}</span>
                <label className="text-xs mb-1">Başlık</label>
                <input
                  type="text"
                  value={item.title?.[lang] || ""}
                  onChange={e => {
                    const updated = [...cuisines];
                    updated[idx].title = { ...item.title, [lang]: e.target.value };
                    setData({ ...data, [blockName]: updated });
                  }}
                  className="w-full border p-2 rounded mb-1"
                />

                <label className="text-xs mb-1">Açıklama</label>
                <input
                  type="text"
                  value={item.description?.[lang] || ""}
                  onChange={e => {
                    const updated = [...cuisines];
                    updated[idx].description = { ...item.description, [lang]: e.target.value };
                    setData({ ...data, [blockName]: updated });
                  }}
                  className="w-full border p-2 rounded mb-1"
                />

                <label className="text-xs mb-1">Ek Açıklama</label>
                <textarea
                  rows={2}
                  value={item.text?.[lang] || ""}
                  onChange={e => {
                    const updated = [...cuisines];
                    updated[idx].text = { ...item.text, [lang]: e.target.value };
                    setData({ ...data, [blockName]: updated });
                  }}
                  className="w-full border p-2 rounded mb-1"
                />

                <label className="text-xs mb-1">Buton Metni</label>
                <input
                  type="text"
                  value={item.buttonText?.[lang] || ""}
                  onChange={e => {
                    const updated = [...cuisines];
                    updated[idx].buttonText = { ...item.buttonText, [lang]: e.target.value };
                    setData({ ...data, [blockName]: updated });
                  }}
                  className="w-full border p-2 rounded mb-1"
                />
              </div>
            ))}
          </div>

          <label>Link</label>
          <input
            type="text"
            value={item.link || ""}
            onChange={e => {
              const updated = [...cuisines];
              updated[idx].link = e.target.value;
              setData({ ...data, [blockName]: updated });
            }}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
    </div>
  );
}
