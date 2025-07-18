"use client";
import { useState } from "react";

const dilAdlari = { tr: "Türkçe", en: "İngilizce", de: "Almanca", ru: "Rusça" };

export default function ClinaryInfoEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState({ image1: false, image2: false });

  // Görsel upload fonksiyonu
  const handleImageUpload = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, [key]: true }));
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
        clinaryInfo: { ...prev.clinaryInfo, [key]: result.imageUrl },
      }));
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Eğer DB'de texts yoksa veya içinde null elemanlar varsa, mutlaka en az bir default satır olsun
  const texts = Array.isArray(data.clinaryInfo?.texts) && data.clinaryInfo.texts.length > 0
    ? data.clinaryInfo.texts.map(
        t => t && typeof t === "object"
          ? t
          : { tr: "", en: "", de: "", ru: "" }
      )
    : [{ tr: "", en: "", de: "", ru: "" }];

     // texts dizisine yeni bir satır ekle
  const handleAddText = () => {
    const yeni = [...texts, { tr: "", en: "", de: "", ru: "" }];
    setData((prev) => ({
      ...prev,
      clinaryInfo: { ...prev.clinaryInfo, texts: yeni },
    }));
  };
  // texts dizisinden bir satırı sil
  const handleRemoveText = (idx) => {
    const yeni = texts.filter((_, i) => i !== idx);
    setData((prev) => ({
      ...prev,
      clinaryInfo: { ...prev.clinaryInfo, texts: yeni },
    }));
  };
  // texts içindeki bir alanı güncelle
  const handleTextChange = (idx, lang, value) => {
    const yeni = texts.map((item, i) =>
      i === idx ? { ...item, [lang]: value } : item
    );
    setData((prev) => ({
      ...prev,
      clinaryInfo: { ...prev.clinaryInfo, texts: yeni },
    }));
  };


  return (
    <div className="mb-8">
      <h3 className="font-bold text-2xl mb-2">Clinary Info Section</h3>
      <div className="rounded-md bg-gray-100 p-6">

        {/* Sol Görsel */}
        <label className="font-semibold text-[18px] block">Sol Görsel</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "image1")}
          className="w-full mt-2 mb-1"
        />
        {uploading.image1 && (
          <span className="text-blue-600 text-xs mb-2 block">Yükleniyor...</span>
        )}
        {data.clinaryInfo?.image1 && (
          <img
            src={`http://localhost:5001${data.clinaryInfo.image1}`}
            alt="Sol görsel"
            className="h-24 mb-2 mt-1 border rounded object-cover"
          />
        )}

        {/* Sağ Görsel */}
        <label className="font-semibold text-[18px] block mt-4">Sağ Görsel</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "image2")}
          className="w-full mt-2 mb-1"
        />
        {uploading.image2 && (
          <span className="text-blue-600 text-xs mb-2 block">Yükleniyor...</span>
        )}
        {data.clinaryInfo?.image2 && (
          <img
            src={`http://localhost:5001${data.clinaryInfo.image2}`}
            alt="Sağ görsel"
            className="h-24 mb-2 mt-1 border rounded object-cover"
          />
        )}

        {/* Alt Başlık */}
        <div className="mb-6 mt-5">
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
                  value={data.clinaryInfo?.subtitle?.[lang] || ""}
                  onChange={e =>
                    setData({
                      ...data,
                      clinaryInfo: {
                        ...data.clinaryInfo,
                        subtitle: { ...data.clinaryInfo?.subtitle, [lang]: e.target.value },
                      },
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Başlık */}
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
                  value={data.clinaryInfo?.title?.[lang] || ""}
                  onChange={e =>
                    setData({
                      ...data,
                      clinaryInfo: {
                        ...data.clinaryInfo,
                        title: { ...data.clinaryInfo?.title, [lang]: e.target.value },
                      },
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Açıklamalar */}
         {/* Açıklamalar (Array olarak düzenleniyor) */}
        <div>
          <label className="block font-semibold mb-2 text-[18px]">
            Açıklamalar
          </label>
          {texts.map((txt, idx) => (
            <div key={idx} className="mb-4 border p-4 rounded bg-white">
              <div className="flex justify-between items-center mb-2">
                <strong>Metin #{idx + 1}</strong>
                {texts.length > 1 && (
                  <button
                    onClick={() => handleRemoveText(idx)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Sil
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {langs.map((lang) => (
                  <div key={lang}>
                    <label className="text-xs text-gray-600">
                      {dilAdlari[lang]}
                    </label>
                    <textarea
                      rows={2}
                      value={txt[lang] || ""}
                      onChange={(e) =>
                        handleTextChange(idx, lang, e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleAddText}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Yeni Metin Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
