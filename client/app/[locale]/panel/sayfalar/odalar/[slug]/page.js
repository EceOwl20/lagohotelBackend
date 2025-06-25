"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SubRoomBannerEdit from "../superiorroommmm/components/SubRoomBannerEdit";
import SubroomCarouselEdit from "../superiorroommmm/components/SubroomCarouselEdit";
import RoomFeaturesEdit from "../superiorroommmm/components/RoomFeaturesEdit";
import RoomsParallaxSectionEdit from "../../odalar/components/RoomsParallaxSectionEdit";
import RoomTourEdit from "../superiorroommmm/components/RoomTourEdit";

export default function SubRoomEditPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Oda verisini getir (mevcut verilerle doldur)
  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      try {
        const res = await fetch(
      `http://localhost:5001/api/pages/rooms/subrooms/${slug}`
    );
        const json = await res.json();
        
        if (!res.ok) throw new Error(json.error || "Veri alınamadı");
        
        setData(json);
      } catch (err) {
        setError("Sayfa verisi alınamadı.");
      }
    };

    fetchPage();
  }, [slug]);

  // Kaydet
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5001/api/pages/rooms/subrooms/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Güncelleme başarısız");

      setSuccess(`✅ ${slug} odası başarıyla güncellendi!`);
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  if (!data) return <p className="p-6">Yükleniyor...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">{slug} Odası Düzenle</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <SubRoomBannerEdit data={data} setData={setData} />
        <SubroomCarouselEdit data={data} setData={setData} />
        <RoomFeaturesEdit data={data} setData={setData} />
        <RoomsParallaxSectionEdit data={data} setData={setData} />
        <RoomTourEdit data={data} setData={setData} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Kaydet
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
} 