"use client";
import { useState } from "react";

const dilAdlari = {
  tr: "Türkçe",
  en: "İngilizce",
  de: "Almanca",
  ru: "Rusça"
};

export default function KidspoolEdit({ data, setData, langs, blockName = "kidspool" }) {
  const sections = data[blockName] || [];
  const [uploading, setUploading] = useState({}); // e.g. { "0-2": true } bölüm 0, öğe 2 yükleniyor
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Yeni bölüm ekle
  const addSection = () => {
    const emptySection = {
      subtitle: langs.reduce((o,l)=>(o[l]="",o), {}),
      title:    langs.reduce((o,l)=>(o[l]="",o), {}),
      text:     langs.reduce((o,l)=>(o[l]="",o), {}),
      carouselItem: []
    };
    setData({ ...data, [blockName]: [...sections, emptySection] });
  };

  // Bölüm sil
  const removeSection = idx => {
    setData({ ...data, [blockName]: sections.filter((_,i)=>i!==idx) });
  };

  // Yeni carousel item (bölüm içinde) ekle
  const addItem = secIdx => {
    const updated = [...sections];
    const emptyItem = {
      image: "",
      subtitle: langs.reduce((o,l)=>(o[l]="",o), {}),
      title:    langs.reduce((o,l)=>(o[l]="",o), {}),
      text:     langs.reduce((o,l)=>(o[l]="",o), {}),
      buttonText:langs.reduce((o,l)=>(o[l]="",o), {}),
      link:     langs.reduce((o,l)=>(o[l]="",o), {})
    };
    updated[secIdx].carouselItem = [...(updated[secIdx].carouselItem||[]), emptyItem];
    setData({ ...data, [blockName]: updated });
  };

  // Carousel item sil
  const removeItem = (secIdx, itemIdx) => {
    const updated = [...sections];
    updated[secIdx].carouselItem = updated[secIdx].carouselItem.filter((_,i)=>i!==itemIdx);
    setData({ ...data, [blockName]: updated });
  };

  // Çokdilli alan değişimi: hem section-level, hem item-level
  const handleFieldChange = (secIdx, field, lang, val, itemIdx = null) => {
    const updated = [...sections];
    if (itemIdx === null) {
      // section-level
      updated[secIdx][field] = { ...(updated[secIdx][field]||{}), [lang]: val };
    } else {
      // carouselItem-level
      updated[secIdx].carouselItem[itemIdx][field] = {
        ...(updated[secIdx].carouselItem[itemIdx][field]||{}),
        [lang]: val
      };
    }
    setData({ ...data, [blockName]: updated });
  };

  // Görsel yükleme: sadece carouselItem.image
  const handleImageUpload = async (secIdx, itemIdx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const key = `${secIdx}-${itemIdx}`;
    setUploading(u => ({ ...u, [key]: true }));
    const form = new FormData();
    form.append("image", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: form
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      const url = result.imageUrl || result.path;
      const updated = [...sections];
      updated[secIdx].carouselItem[itemIdx].image = url;
      setData({ ...data, [blockName]: updated });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(u => ({ ...u, [key]: false }));
    }
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-4">Kids Pool Bölümleri</h3>
      <button
        type="button"
        className="mb-3 px-4 py-1 bg-green-600 text-white rounded"
        onClick={addSection}
      >+ Bölüm Ekle</button>

      {sections.map((sec, secIdx) => (
        <div key={secIdx} className="border rounded p-4 mb-6 bg-gray-50">
          <div className="flex justify-between mb-4">
            <strong>Bölüm #{secIdx+1}</strong>
            <button
              type="button"
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={()=>removeSection(secIdx)}
            >Sil</button>
          </div>

          {/* Section-level çokdilli alanlar: subtitle, title, text */}
          {["subtitle","title","text"].map(field => (
            <div key={field} className="mb-4">
              <label className="font-semibold block mb-1">
                {field.charAt(0).toUpperCase()+field.slice(1)}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {langs.map(lang => (
                  <div key={lang} className="flex flex-col">
                    <span className="text-xs mb-1 text-gray-600">{dilAdlari[lang]}</span>
                    {field==="text" ? (
                      <textarea
                        rows={2}
                        className="border p-2 rounded"
                        value={sec[field]?.[lang]||""}
                        onChange={e=>handleFieldChange(secIdx,field,lang,e.target.value)}
                      />
                    ) : (
                      <input
                        type="text"
                        className="border p-2 rounded"
                        value={sec[field]?.[lang]||""}
                        onChange={e=>handleFieldChange(secIdx,field,lang,e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Carousel Items */}
          <h4 className="font-semibold mb-2">Carousel Öğeleri</h4>
          {(sec.carouselItem||[]).map((item, itemIdx) => {
            const key = `${secIdx}-${itemIdx}`;
            return (
              <div key={itemIdx} className="border rounded p-3 mb-4 bg-white">
                <div className="flex justify-between mb-2">
                  <strong>Öğe #{itemIdx+1}</strong>
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={()=>removeItem(secIdx,itemIdx)}
                  >Sil</button>
                </div>

                {/* Görsel dosya yükle */}
                <label className="block font-semibold mb-1">Görsel</label>
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading[key]}
                    onChange={e=>handleImageUpload(secIdx,itemIdx,e)}
                    className="border p-2 rounded"
                  />
                  {uploading[key] && <span className="text-blue-600">Yükleniyor…</span>}
                  {item.image && (
                    <img
                      src={item.image.startsWith("/")? `${apiUrl}${item.image}`: item.image}
                      alt=""
                      className="w-24 h-16 object-cover rounded border"
                    />
                  )}
                </div>

                {/* Çokdilli item-level alanlar */}
                {["subtitle","title","text","buttonText","link"].map(field => (
                  <div key={field} className="mb-3">
                    <label className="font-semibold block mb-1">
                      {field.charAt(0).toUpperCase()+field.slice(1)}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {langs.map(lang => (
                        <input
                          key={lang}
                          type="text"
                          className="border p-2 rounded w-full"
                          placeholder={`${dilAdlari[lang]}`}
                          value={item[field]?.[lang]||""}
                          onChange={e=>
                            handleFieldChange(secIdx,field,lang,e.target.value,itemIdx)
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={()=>addItem(secIdx)}
          >+ Öğeye Resim/Metin Ekle</button>
        </div>
      ))}
    </div>
  );
}
