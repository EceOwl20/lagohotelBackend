"use client";
import { useState } from "react";
const langs = ["tr", "en", "de", "ru"];

export default function SectionAccommodation({ data, setData }) {
  // Oda ekle
  const addRoom = () => {
    const emptyRoom = {
      image: "",
      title: { tr: "", en: "", de: "", ru: "" },
      description: { tr: "", en: "", de: "", ru: "" },
      area: { tr: "", en: "", de: "", ru: "" },
      view: { tr: "", en: "", de: "", ru: "" },
      buttonText: { tr: "", en: "", de: "", ru: "" }, // <-- EKLENDİ
      link: "",
    };
    setData({
      ...data,
      accommodation: {
        ...data.accommodation,
        rooms: [...(data.accommodation?.rooms || []), emptyRoom],
      },
    });
  };

  // Oda sil
  const removeRoom = (index) => {
    const updatedRooms = [...(data.accommodation?.rooms || [])];
    updatedRooms.splice(index, 1);
    setData({
      ...data,
      accommodation: { ...data.accommodation, rooms: updatedRooms },
    });
  };

  // Oda görsel upload fonksiyonu
  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");

      // Sonuçta gelen imageUrl'yi ilgili oda kaydına ekle
      const updated = [...data.accommodation.rooms];
      updated[index].image = result.imageUrl; // "/uploads/..."
      setData({
        ...data,
        accommodation: { ...data.accommodation, rooms: updated },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    }
  };

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-4">🛏️ Odalar Bölümü</h2>

      <label className="block font-semibold">Alt Başlık</label>
      {langs.map((lang) => (
        <input
          key={`subtitle-${lang}`}
          type="text"
          placeholder={`Alt Başlık (${lang.toUpperCase()})`}
          value={data.accommodation?.subtitle?.[lang] || ""}
          onChange={(e) =>
            setData({
              ...data,
              accommodation: {
                ...data.accommodation,
                subtitle: {
                  ...data.accommodation?.subtitle,
                  [lang]: e.target.value,
                },
              },
            })
          }
          className="w-full border p-2 rounded mb-2"
        />
      ))}

      <label className="block font-semibold">Başlık</label>
      {langs.map((lang) => (
        <input
          key={`title-${lang}`}
          type="text"
          placeholder={`Başlık (${lang.toUpperCase()})`}
          value={data.accommodation?.title?.[lang] || ""}
          onChange={(e) =>
            setData({
              ...data,
              accommodation: {
                ...data.accommodation,
                title: {
                  ...data.accommodation?.title,
                  [lang]: e.target.value,
                },
              },
            })
          }
          className="w-full border p-2 rounded mb-2"
        />
      ))}

      {/* Oda Listesi */}
      <div className="space-y-6">
        {(data.accommodation?.rooms || []).map((room, index) => (
          <div key={index} className="border p-4 rounded bg-gray-50 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Oda #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeRoom(index)}
                className="text-red-500 font-bold px-2 py-1 rounded hover:bg-red-100"
              >
                Odayı Sil
              </button>
            </div>

            {/* Dosya Yükleme Alanı */}
            <label>Görsel Yükle</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, index)}
              className="w-full border p-2 rounded mb-2"
            />
            {/* Önizleme */}
            {room.image && (
              <img
                src={`http://localhost:5001${room.image}`}
                alt="Oda görseli"
                className="w-[180px] h-[120px] object-cover rounded mb-2"
              />
            )}

            {langs.map((lang) => (
              <div key={lang}>
                <label>Oda Adı ({lang.toUpperCase()})</label>
                <input
                  type="text"
                  value={room.title?.[lang] || ""}
                  onChange={(e) => {
                    const updated = [...data.accommodation.rooms];
                    updated[index].title = {
                      ...room.title,
                      [lang]: e.target.value,
                    };
                    setData({
                      ...data,
                      accommodation: { ...data.accommodation, rooms: updated },
                    });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />

                <label>Açıklama ({lang.toUpperCase()})</label>
                <textarea
                  rows={2}
                  value={room.description?.[lang] || ""}
                  onChange={(e) => {
                    const updated = [...data.accommodation.rooms];
                    updated[index].description = {
                      ...room.description,
                      [lang]: e.target.value,
                    };
                    setData({
                      ...data,
                      accommodation: { ...data.accommodation, rooms: updated },
                    });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />

                <label>Alan (m²) ({lang.toUpperCase()})</label>
                <input
                  type="text"
                  value={room.area?.[lang] || ""}
                  onChange={(e) => {
                    const updated = [...data.accommodation.rooms];
                    updated[index].area = {
                      ...room.area,
                      [lang]: e.target.value,
                    };
                    setData({
                      ...data,
                      accommodation: { ...data.accommodation, rooms: updated },
                    });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />

                <label>Manzara ({lang.toUpperCase()})</label>
                <input
                  type="text"
                  value={room.view?.[lang] || ""}
                  onChange={(e) => {
                    const updated = [...data.accommodation.rooms];
                    updated[index].view = {
                      ...room.view,
                      [lang]: e.target.value,
                    };
                    setData({
                      ...data,
                      accommodation: { ...data.accommodation, rooms: updated },
                    });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />

                {/* 4 Dilde Buton Text */}
                <label>Buton Metni ({lang.toUpperCase()})</label>
                <input
                  type="text"
                  value={room.buttonText?.[lang] || ""}
                  onChange={(e) => {
                    const updated = [...data.accommodation.rooms];
                    updated[index].buttonText = {
                      ...room.buttonText,
                      [lang]: e.target.value,
                    };
                    setData({
                      ...data,
                      accommodation: { ...data.accommodation, rooms: updated },
                    });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />
              </div>
            ))}

            <label>Detay Sayfası Linki</label>
            <input
              type="text"
              value={room.link}
              onChange={(e) => {
                const updated = [...data.accommodation.rooms];
                updated[index].link = e.target.value;
                setData({
                  ...data,
                  accommodation: { ...data.accommodation, rooms: updated },
                });
              }}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRoom}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Oda Ekle
      </button>
    </div>
  );
}
