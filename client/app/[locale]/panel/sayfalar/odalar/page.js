"use client";

import React, { useEffect, useState } from "react";
import RoomsBannerEdit from "./components/RoomsBannerEdit";
import RoomsInfoSectionEdit from "./components/RoomsInfoSectionEdit";
import RoomSectionEdit from "./components/RoomSectionEdit";
import RoomsParallaxSectionEdit from "./components/RoomsParallaxSectionEdit";

export default function RoomsPageEdit() {
  const [data, setData] = useState(null);
  const [sections, setSections] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/pages/rooms`);
        const json = await res.json();
        setData(json);
        const keys = Object.keys(json)
          .filter(key => key.startsWith("roomSection"))
          .sort((a, b) =>
            parseInt(a.replace("roomSection", "")) - parseInt(b.replace("roomSection", ""))
          );
        setSections(keys);
      } catch (err) {
        setError("Sayfa verisi alınamadı.");
      }
    };

    fetchPage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${apiUrl}/api/pages/rooms`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Güncelleme başarısız");

      setSuccess("✅ Rooms sayfası başarıyla güncellendi!");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  const handleAddSection = () => {
    const existing = sections;
    const nextIndex =
      existing.length > 0
        ? Math.max(...existing.map(k => parseInt(k.replace("roomSection", "")))) + 1
        : 1;
    const newKey = `roomSection${nextIndex}`;
    setData(prev => ({
      ...prev,
      [newKey]: {
        title: { tr: "", en: "", de: "", ru: "" },
        subtitle: { tr: "", en: "", de: "", ru: "" },
        m: { tr: "", en: "", de: "", ru: "" },
        view: { tr: "", en: "", de: "", ru: "" },
        buttonText: { tr: "", en: "", de: "", ru: "" },
        img: "",
        img2: ""
      }
    }));
    setSections(prev => [...prev, newKey]);
  };

  if (!data) return <p className="p-6">Yükleniyor...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Rooms Page Düzenle</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <RoomsBannerEdit data={data} setData={setData} />
        <RoomsInfoSectionEdit data={data} setData={setData} />

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Oda Bölümleri</h2>
          <button
            type="button"
            className="self-start px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
            onClick={handleAddSection}
          >
            Bölüm Ekle
          </button>
          {sections.map(key => (
            <RoomSectionEdit
              key={key}
              sectionKey={key}
              data={data}
              setData={setData}
            />
          ))}
        </div>

        <RoomsParallaxSectionEdit data={data} setData={setData} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kaydet
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}