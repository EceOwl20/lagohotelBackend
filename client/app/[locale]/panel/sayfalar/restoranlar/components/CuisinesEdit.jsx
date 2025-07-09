"use client";
import { useState } from "react";

const dilAdlari = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function CuisinesEdit({ data, setData, langs, blockName = "cuisines" }) {
  const cuisines = data[blockName] || [];
  const [uploadingInfo, setUploadingInfo] = useState({}); // { `${idx}-main`: bool, `${idx}-sub-${j}`: bool }

  // Yemek ekle
  const addCuisine = () => {
    const emptyCuisine = {
      image: "",
      title: langs.reduce((o,l)=>(o[l]="",o), {}),
      description: langs.reduce((o,l)=>(o[l]="",o), {}),
      text: langs.reduce((o,l)=>(o[l]="",o), {}),
      link: "",
      buttonText: langs.reduce((o,l)=>(o[l]="",o), {}),
      cuisine: Array.from({ length: 3 }, () => ({
        image: "",
        title: langs.reduce((o,l)=>(o[l]="",o), {}),
        description: langs.reduce((o,l)=>(o[l]="",o), {}),
        subtitle: langs.reduce((o,l)=>(o[l]="",o), {}),
        link: ""
      }))
    };
    setData({ ...data, [blockName]: [...cuisines, emptyCuisine] });
  };

  // Yemek sil
  const removeCuisine = i => {
    setData({ ...data, [blockName]: cuisines.filter((_, idx) => idx !== i) });
  };

  // Görsel yükle (main veya alt)
  const handleImageUpload = async (e, idx, subIdx = null) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const key = subIdx === null ? `${idx}-main` : `${idx}-sub-${subIdx}`;
    setUploadingInfo(prev => ({ ...prev, [key]: true }));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const updated = [...cuisines];
      if (subIdx === null) {
        updated[idx].image = result.imageUrl;
      } else {
        updated[idx].cuisine[subIdx].image = result.imageUrl;
      }
      setData({ ...data, [blockName]: updated });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploadingInfo(prev => ({ ...prev, [key]: false }));
    }
  };

  // Çok dilli alan güncelle
  const handleFieldChange = (idx, field, lang, value, subIdx = null) => {
    const updated = [...cuisines];
    if (subIdx === null) {
      updated[idx][field] = { ...updated[idx][field], [lang]: value };
    } else {
      updated[idx].cuisine[subIdx][field] = { 
        ...updated[idx].cuisine[subIdx][field], 
        [lang]: value 
      };
    }
    setData({ ...data, [blockName]: updated });
  };

  // Düz string alan güncelle
  const handleStringChange = (idx, field, value, subIdx = null) => {
    const updated = [...cuisines];
    if (subIdx === null) {
      updated[idx][field] = value;
    } else {
      updated[idx].cuisine[subIdx][field] = value;
    }
    setData({ ...data, [blockName]: updated });
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">
        {blockName === "cuisines" ? "Cuisines Carousel" : blockName}
      </h3>
      <button
        type="button"
        className="mb-3 px-4 py-1 bg-green-600 text-white rounded"
        onClick={addCuisine}
      >
        + Cuisine Ekle
      </button>

      {cuisines.map((item, idx) => {
        // Eğer cuisine alt dizi yok veya uzunluğu 3 değilse başlat
        if (!Array.isArray(item.cuisine) || item.cuisine.length !== 3) {
          item.cuisine = Array.from({ length: 3 }, () => ({
            image: "",
            title: langs.reduce((o,l)=>(o[l]="",o), {}),
            description: langs.reduce((o,l)=>(o[l]="",o), {}),
            subtitle: langs.reduce((o,l)=>(o[l]="",o), {}),
            link: ""
          }));
        }

        return (
          <div key={idx} className="border p-3 rounded mb-6 bg-gray-50 space-y-4">
            <div className="flex justify-between">
              <strong>Cuisine #{idx + 1}</strong>
              <button
                type="button"
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => removeCuisine(idx)}
              >
                Sil
              </button>
            </div>

            {/* Ana Görsel */}
         

            {/* Ana Metinler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["title","description","text","buttonText"].map(field =>
                langs.map(lang => (
                  <div key={`${field}-${lang}`} className="flex flex-col">
                    <label className="text-xs text-gray-600">
                      {dilAdlari[lang]} {field}
                    </label>
                    {field === "text" ? (
                      <textarea
                        rows={2}
                        value={item.text?.[lang] || ""}
                        onChange={e =>
                          handleFieldChange(idx, field, lang, e.target.value)
                        }
                        className="w-full border p-2 rounded"
                      />
                    ) : (
                      <input
                        type="text"
                        value={item[field]?.[lang] || ""}
                        onChange={e =>
                          handleFieldChange(idx, field, lang, e.target.value)
                        }
                        className="w-full border p-2 rounded"
                      />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Alt Cuisine Items (tam 3 adet) */}
            <div className="mt-4 border-t pt-4 space-y-4">
              <h4 className="font-semibold mb-2">Alt Cuisine Öğeleri</h4>
              {item.cuisine.map((sub, subIdx) => (
                <div key={subIdx} className="p-3 bg-white rounded border">
                  <strong className="block mb-2">Öğe #{subIdx + 1}</strong>

                  {/* Alt Görsel */}
                  <div className="mb-2">
                    <label className="font-semibold">Görsel Yükle</label>
                    <div className="flex items-center gap-4 mt-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageUpload(e, idx, subIdx)}
                        disabled={uploadingInfo[`${idx}-sub-${subIdx}`]}
                      />
                      {uploadingInfo[`${idx}-sub-${subIdx}`] && (
                        <span className="text-blue-500">Yükleniyor...</span>
                      )}
                      {sub.image && (
                        <img
                          src={`http://localhost:5001${sub.image}`}
                          alt="sub-cuisine"
                          className="w-24 h-16 object-cover border rounded"
                        />
                      )}
                    </div>
                  </div>

                  {/* Alt Metinler ve Link */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["title","description","subtitle"].map(field =>
                      langs.map(lang => (
                        <div key={`${field}-${lang}`} className="flex flex-col">
                          <label className="text-xs text-gray-600">
                            {dilAdlari[lang]} {field}
                          </label>
                          <input
                            type="text"
                            value={sub[field]?.[lang] || ""}
                            onChange={e =>
                              handleFieldChange(
                                idx,
                                field,
                                lang,
                                e.target.value,
                                subIdx
                              )
                            }
                            className="w-full border p-2 rounded"
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-2">
                    <label className="font-semibold">Link</label>
                    <input
                      type="text"
                      value={sub.link || ""}
                      onChange={e =>
                        handleStringChange(idx, "link", e.target.value, subIdx)
                      }
                      className="w-full border p-2 rounded mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
