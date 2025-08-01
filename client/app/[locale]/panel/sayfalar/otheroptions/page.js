"use client";
import { useState, useEffect } from "react";

const langs = ["tr", "en", "de", "ru"];

export default function OtherOptionsEdit() {
  const [data, setData] = useState({
    span: {},
    title: {},
    buttonText: {},
    rooms: [
      { img: "", title: {}, description: {}, size: {}, capacity: {}, text: {}, link: "" },
      { img: "", title: {}, description: {}, size: {}, capacity: {}, text: {}, link: "" },
      { img: "", title: {}, description: {}, size: {}, capacity: {}, text: {}, link: "" },
    ]
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState({});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  // Resim upload
  const handleImageUpload = async (idx, file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(prev => ({ ...prev, [idx]: true }));
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.imageUrl) {
        setData(prev => {
          const rooms = [...prev.rooms];
          rooms[idx].img = result.imageUrl;
          return { ...prev, rooms };
        });
      }
    } finally {
      setUploading(prev => ({ ...prev, [idx]: false }));
    }
  };

  // Panel veri çek
  useEffect(() => {
    fetch(`${apiUrl}/api/otherOptions`)
      .then(res => res.json())
      .then(resData => {
        // rooms sayısı 3'ten fazlaysa ilk 3'ü al!
        if (resData?.rooms && resData.rooms.length > 3) {
          resData.rooms = resData.rooms.slice(0, 3);
        }
        setData(prev => ({
          ...prev,
          ...resData,
          rooms: (resData.rooms && resData.rooms.length === 3)
            ? resData.rooms
            : [
                { img: "", title: {}, description: {}, size: {}, capacity: {}, text: {}, link: "" },
                { img: "", title: {}, description: {}, size: {}, capacity: {}, text: {}, link: "" },
                { img: "", title: {}, description: {}, size: {}, capacity: {}, text: {}, link: "" },
              ]
        }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Multi-lang alan güncelle
  const handleLangChange = (roomIdx, field, lang, value) => {
    setData(prev => {
      const rooms = [...prev.rooms];
      rooms[roomIdx][field] = { ...rooms[roomIdx][field], [lang]: value };
      return { ...prev, rooms };
    });
  };

  // Tekil alan (link gibi) güncelle
  const handleFieldChange = (roomIdx, field, value) => {
    setData(prev => {
      const rooms = [...prev.rooms];
      rooms[roomIdx][field] = value;
      return { ...prev, rooms };
    });
  };

  // Ana başlık alanı
  const handleMainLangChange = (field, lang, value) => {
    setData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value }
    }));
  };

  // Kaydet
  const handleSave = async () => {
    await fetch(`${apiUrl}/api/otherOptions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Kaydedildi!");
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">OtherOptions Panel (3 Oda Sabit)</h2>

      {/* Ana başlıklar */}
      {["span", "title", "buttonText"].map(field => (
        <div key={field} className="mb-4">
          <b>{field}</b>
          <div className="flex gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-1 rounded w-1/4"
                placeholder={`${field} (${lang})`}
                value={data[field]?.[lang] || ""}
                onChange={e => handleMainLangChange(field, lang, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Oda kartları */}
      <h3 className="mt-6 mb-2 font-semibold">Odalar (3 adet)</h3>
      {data.rooms.map((room, idx) => (
        <div key={idx} className="border rounded p-4 mb-4">
          <div className="mb-2 flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              disabled={uploading[idx]}
              onChange={e => {
                if (e.target.files?.[0]) handleImageUpload(idx, e.target.files[0]);
              }}
            />
            {room.img && (
              <img
                src={
                  room.img.startsWith("/uploads")
                    ? apiUrl + room.img
                    : room.img
                }
                className="w-20 h-14 rounded border"
                alt="Room"
              />
            )}
          </div>
          {["title", "description", "size", "capacity", "text"].map(field => (
            <div key={field} className="mb-1 flex gap-2">
              <b className="w-24">{field}</b>
              {langs.map(lang => (
                <input
                  key={lang}
                  className="border p-1 rounded w-1/4"
                  placeholder={`${field} (${lang})`}
                  value={room[field]?.[lang] || ""}
                  onChange={e => handleLangChange(idx, field, lang, e.target.value)}
                />
              ))}
            </div>
          ))}
          <div className="mb-1 flex gap-2">
            <b className="w-24">link</b>
            <input
              className="border p-1 rounded w-full"
              value={room.link || ""}
              placeholder="Oda linki (örn: /rooms/familyroom)"
              onChange={e => handleFieldChange(idx, "link", e.target.value)}
            />
          </div>
        </div>
      ))}

      <button onClick={handleSave} className="mt-4 px-6 py-2 bg-black text-white rounded">Kaydet</button>
    </div>
  );
}
