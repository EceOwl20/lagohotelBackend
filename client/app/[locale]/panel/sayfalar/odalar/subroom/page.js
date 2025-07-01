"use client";
import { useEffect, useState } from "react";
import SubRoomBannerEdit from "./components/SubRoomBannerEdit";
import SubroomCarouselEdit from "./components/SubroomCarouselEdit";
import RoomFeaturesEdit from "./components/RoomFeaturesEdit";
import BackgroundSectionEdit from "./components/BackgroundSectionEdit";
import RoomTourEdit from "./components/RoomTourEdit";
import OtherOptionsEdit from "./components/OtherOptionsEdit";

const langs = ["tr", "en", "de", "ru"];

export default function RoomPanelPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Oda listesini çek
  useEffect(() => {
    console.log("Fetching rooms..."); // DEBUG
    fetch("http://localhost:5001/api/pages/rooms/subroom")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched rooms:", data); // DEBUG
        setRooms(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching rooms:", err); // DEBUG
        setLoading(false);
      });
  }, []);

  // Seçilen oda objesi
  const selectedRoom = rooms.find(room => room.slug === selectedSlug);

  // DEBUG: selectedRoom değişikliklerini takip et
  useEffect(() => {
    if (selectedRoom) {
      console.log("Selected room changed:", selectedRoom); // DEBUG
      console.log("Selected room carousel:", selectedRoom.carousel); // DEBUG
    }
  }, [selectedRoom]);

  // Oda güncelleme (component'lar içinden çağrılır)
  const setRoomData = (nextData) => {
    console.log("setRoomData called with:", nextData); // DEBUG
    console.log("Current selectedSlug:", selectedSlug); // DEBUG
    
    setRooms((prev) => {
      const newRooms = prev.map((r) =>
        r.slug === selectedSlug ? { ...r, ...nextData } : r
      );
      
      console.log("Updated rooms:", newRooms); // DEBUG
      
      // Güncellenmiş odayı bul ve carousel'ını logla
      const updatedRoom = newRooms.find(room => room.slug === selectedSlug);
      console.log("Updated selected room:", updatedRoom); // DEBUG
      console.log("Updated selected room carousel:", updatedRoom?.carousel); // DEBUG
      
      return newRooms;
    });
  };

  // Kaydet butonu fonksiyonu
  const handleSave = async () => {
    if (!selectedRoom) return;
    
    console.log("Saving room data:", selectedRoom); // DEBUG
    console.log("Carousel data being saved:", selectedRoom.carousel); // DEBUG
    
    setSaving(true);
    
    try {
      const response = await fetch(`http://localhost:5001/api/pages/rooms/subroom/${selectedRoom.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedRoom),
      });
      
      const result = await response.json();
      console.log("Save response:", result); // DEBUG
      
      if (!response.ok) {
        throw new Error(result.error || "Save failed");
      }
      
      setSaving(false);
      alert("Kaydedildi!");
      
    } catch (error) {
      console.error("Save error:", error); // DEBUG
      setSaving(false);
      alert("Kaydetme hatası: " + error.message);
    }
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Oda Sayfaları Paneli</h1>
      
      {/* DEBUG BİLGİLERİ */}
      <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
        <p><strong>Selected Slug:</strong> {selectedSlug || "None"}</p>
        <p><strong>Selected Room Carousel Length:</strong> {selectedRoom?.carousel?.length || 0}</p>
        <p><strong>Selected Room Carousel:</strong> {JSON.stringify(selectedRoom?.carousel || [])}</p>
      </div>
      
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          <div className="flex gap-3 mb-6 flex-wrap">
            {rooms.map(room => (
              <button
                key={room.slug}
                className={`px-4 py-2 rounded transition-all duration-150
                  ${room.slug === selectedSlug
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={() => {
                  console.log("Selecting room:", room.slug); // DEBUG
                  setSelectedSlug(room.slug);
                }}
              >
                {room.banner?.title?.tr || room.title?.tr || room.slug}
              </button>
            ))}
          </div>
          {selectedRoom ? (
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
              <SubRoomBannerEdit
                data={selectedRoom}
                setData={setRoomData}
                langs={langs}
              />
              <SubroomCarouselEdit
                data={selectedRoom}
                setData={setRoomData}
              />
              <RoomFeaturesEdit
                data={selectedRoom}
                setData={setRoomData}
                langs={langs}
              />
              <BackgroundSectionEdit
                data={selectedRoom}
                setData={setRoomData}
                langs={langs}
              /> 
              <RoomTourEdit
                data={selectedRoom}
                setData={setRoomData}
                langs={langs}
              />
              <OtherOptionsEdit
                data={selectedRoom}
                setData={setRoomData}
                langs={langs}
              />
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-lagoBlack text-white rounded text-lg mt-4"
                disabled={saving}
              >
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          ) : (
            <div className="text-gray-500">Bir oda seçiniz.</div>
          )}
        </>
      )}
    </div>
  );
}