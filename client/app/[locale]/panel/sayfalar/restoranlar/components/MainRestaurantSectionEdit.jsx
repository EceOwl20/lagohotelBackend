"use client";
import { useState } from "react";

const dilAdlari = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function MainRestaurantSectionEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState(false);

  // Görsel upload fonksiyonu
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      setData((prev) => ({
        ...prev,
        mainRestaurantSection: { ...prev.mainRestaurantSection, image: result.imageUrl },
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-2xl mb-2">Main Restaurant Section</h3>
     <div className="bg-gray-100 p-6 rounded-md">
       {/* Görsel yükleme */}
      <label className="font-semibold text-[18px] block">Arka Plan Görseli</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full mt-2 mb-5"
        disabled={uploading}
      />
      {uploading && <span className="text-blue-600 text-xs mb-2 block">Yükleniyor...</span>}
      {data.mainRestaurantSection?.image && (
        <img
          src={`http://localhost:5001${data.mainRestaurantSection.image}`}
          alt="Arka Plan"
          className="h-24 mb-2 mt-1 border rounded object-cover"
        />
      )}
      {/* <input
        type="text"
        value={data.mainRestaurantSection?.image || ""}
        readOnly
        className="w-full border p-2 rounded mb-2 bg-gray-100 cursor-not-allowed"
      /> */}

      {/* Alt Başlık tüm diller */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[18px]">Alt Başlıklar</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {langs.map((lang) => (
            <div key={lang} className="flex flex-col">
              <label className="text-xs mb-1 text-gray-600">
                {dilAdlari[lang] || lang.toUpperCase()}
              </label>
              <input
                type="text"
                placeholder={`Alt Başlık (${lang.toUpperCase()})`}
                value={data.mainRestaurantSection?.subtitle?.[lang] || ""}
                onChange={e =>
                  setData({
                    ...data,
                    mainRestaurantSection: {
                      ...data.mainRestaurantSection,
                      subtitle: {
                        ...data.mainRestaurantSection?.subtitle,
                        [lang]: e.target.value,
                      },
                    },
                  })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Başlık tüm diller */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[18px]">Başlıklar</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {langs.map((lang) => (
            <div key={lang} className="flex flex-col">
              <label className="text-xs mb-1 text-gray-600">
                {dilAdlari[lang] || lang.toUpperCase()}
              </label>
              <input
                type="text"
                placeholder={`Başlık (${lang.toUpperCase()})`}
                value={data.mainRestaurantSection?.title?.[lang] || ""}
                onChange={e =>
                  setData({
                    ...data,
                    mainRestaurantSection: {
                      ...data.mainRestaurantSection,
                      title: {
                        ...data.mainRestaurantSection?.title,
                        [lang]: e.target.value,
                      },
                    },
                  })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Açıklama tüm diller */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[18px]">Açıklamalar</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {langs.map((lang) => (
            <div key={lang} className="flex flex-col">
              <label className="text-xs mb-1 text-gray-600">
                {dilAdlari[lang] || lang.toUpperCase()}
              </label>
              <textarea
                rows={3}
                placeholder={`Açıklama (${lang.toUpperCase()})`}
                value={data.mainRestaurantSection?.text?.[lang] || ""}
                onChange={e =>
                  setData({
                    ...data,
                    mainRestaurantSection: {
                      ...data.mainRestaurantSection,
                      text: {
                        ...data.mainRestaurantSection?.text,
                        [lang]: e.target.value,
                      },
                    },
                  })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Liste (her satır ayrı) */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[18px]">Liste (her satır ayrı madde)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {langs.map((lang) => (
            <div key={lang} className="flex flex-col">
              <label className="text-xs mb-1 text-gray-600">
                {dilAdlari[lang] || lang.toUpperCase()}
              </label>
              <textarea
                rows={3}
                placeholder={`Liste (${lang.toUpperCase()})`}
                value={data.mainRestaurantSection?.list?.[lang]?.join("\n") || ""}
                onChange={e =>
                  setData({
                    ...data,
                    mainRestaurantSection: {
                      ...data.mainRestaurantSection,
                      list: {
                        ...data.mainRestaurantSection?.list,
                        [lang]: e.target.value.split("\n"),
                      },
                    },
                  })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buton metni tüm diller */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[18px]">Buton Metni</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {langs.map((lang) => (
            <div key={lang} className="flex flex-col">
              <label className="text-xs mb-1 text-gray-600">
                {dilAdlari[lang] || lang.toUpperCase()}
              </label>
              <input
                type="text"
                placeholder={`Buton Metni (${lang.toUpperCase()})`}
                value={data.mainRestaurantSection?.buttonText?.[lang] || ""}
                onChange={e =>
                  setData({
                    ...data,
                    mainRestaurantSection: {
                      ...data.mainRestaurantSection,
                      buttonText: {
                        ...data.mainRestaurantSection?.buttonText,
                        [lang]: e.target.value,
                      },
                    },
                  })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buton linki */}
      <label className="block font-semibold mb-2 text-[18px]">Buton Linki</label>
      <input
        type="text"
        value={data.mainRestaurantSection?.buttonLink || ""}
        onChange={e => setData({
          ...data,
          mainRestaurantSection: { ...data.mainRestaurantSection, buttonLink: e.target.value }
        })}
        className="w-full border p-2 rounded"
      />
     </div>
    </div>
  );
}
