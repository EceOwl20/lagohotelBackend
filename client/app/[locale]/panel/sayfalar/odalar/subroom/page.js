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
    fetch("http://localhost:5001/api/pages/rooms/subroom")
      .then(res => res.json())
      .then(data => {
        setRooms(data || []);
        setLoading(false);
      });
  }, []);

  // Seçilen oda objesi
  const selectedRoom = rooms.find(room => room.slug === selectedSlug);

  // Oda güncelleme (component'lar içinden çağrılır)
  const setRoomData = (nextData) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.slug === selectedSlug ? { ...r, ...nextData } : r
      )
    );
  };

  // Kaydet butonu fonksiyonu
  const handleSave = async () => {
    if (!selectedRoom) return;
    setSaving(true);
    await fetch(`http://localhost:5001/api/pages/rooms/subroom/${selectedRoom.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedRoom),
    });
    setSaving(false);
    alert("Kaydedildi!");
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Oda Sayfaları Paneli</h1>
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
                onClick={() => setSelectedSlug(room.slug)}
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
              {/* Eğer iki RoomTour olacaksa iki defa ekleyebilirsin, ör: */}
              {/* <RoomTourEdit data={selectedRoom} setData={setRoomData} langs={langs} index={1}/> */}
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
