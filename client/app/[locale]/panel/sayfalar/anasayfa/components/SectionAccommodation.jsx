"use client";

import { useEffect } from "react";

export default function SectionAccommodation({ data, setData }) {
  const langs = ["tr", "en", "de", "ru"];

  const fillEmptyRoomFields = (rooms) =>
    rooms.map((room) => ({
      ...room,
      title: room.title || { tr: "", en: "", de: "", ru: "" },
      description: room.description || { tr: "", en: "", de: "", ru: "" },
      area: room.area || { tr: "", en: "", de: "", ru: "" },
      view: room.view || { tr: "", en: "", de: "", ru: "" },
      image: room.image || "",
      link: room.link || "",
    }));

    useEffect(() => {
      const fetchPage = async () => {
        const res = await fetch("http://localhost:5001/api/pages/homepage");
        const json = await res.json();
    
        // Odaları eksik alanlara göre düzelt
        if (json.accommodation?.rooms) {
          json.accommodation.rooms = fillEmptyRoomFields(json.accommodation.rooms);
        }
    
        setData(json);
      };
      fetchPage();
    }, []);

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

      {/* Oda listesi */}
      {data.accommodation?.rooms?.map((room, index) => (
        <div key={index} className="border p-4 rounded bg-gray-50 space-y-2">
          <h3 className="font-semibold">Oda #{index + 1}</h3>

          <label>Görsel URL</label>
          <input
            type="text"
            value={room.image}
            onChange={(e) => {
              const updated = [...data.accommodation.rooms];
              updated[index].image = e.target.value;
              setData({
                ...data,
                accommodation: { ...data.accommodation, rooms: updated },
              });
            }}
            className="w-full border p-2 rounded"
          />

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
  );
}