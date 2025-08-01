"use client";
import { useEffect, useState } from "react";
import SubRoomBannerEdit from "./components/SubRoomBannerEdit";
import SubroomCarouselEdit from "./components/SubroomCarouselEdit";
import RoomFeaturesEdit from "./components/RoomFeaturesEdit";
import BackgroundSectionEdit from "./components/BackgroundSectionEdit";
import RoomTourEdit from "./components/RoomTourEdit";
import OtherOptionsEdit from "./components/OtherOptionsEdit";

const langs = ["tr", "en", "de", "ru"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function RoomPanelPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Oda listesini çek
  useEffect(() => {
    console.log("Fetching rooms..."); // DEBUG
    fetch(`${apiUrl}/api/pages/rooms/subroom`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched rooms:", data); // DEBUG
        setRooms(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err); // DEBUG
        setLoading(false);
      });
  }, []);

  // Seçilen oda objesi
  const selectedRoom = rooms.find((room) => room.slug === selectedSlug) || {
    carousel: [],
  };

  // DEBUG: selectedRoom değişikliklerini takip et
  useEffect(() => {
    if (selectedRoom) {
      console.log("Selected room changed:", selectedRoom); // DEBUG
      console.log("Selected room carousel:", selectedRoom.carousel); // DEBUG
    }
  }, [selectedRoom]);

  // Oda güncelleme (component'lar içinden çağrılır)
  // Şu fonksiyonu child'lara gönder:
  const setRoomData = (updateFnOrObject) => {
    setRooms((prevRooms) =>
      prevRooms.map((r) =>
        r.slug === selectedSlug
          ? typeof updateFnOrObject === "function"
            ? updateFnOrObject(r)
            : { ...r, ...updateFnOrObject }
          : r
      )
    );
  };

  // Kaydet butonu fonksiyonu
  const handleSave = async () => {
    if (!selectedSlug) return;
    // HER ZAMAN en güncel rooms array’inden ilgili odayı bul
    const roomToSave = rooms.find((r) => r.slug === selectedSlug);
    if (!roomToSave) return alert("Oda bulunamadı");

    setSaving(true);

    try {
      const response = await fetch(
        `${apiUrl}/api/pages/rooms/subroom/${selectedSlug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roomToSave), // EN GÜNCEL HALİ
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Save failed");
      alert("Kaydedildi!");
    } catch (error) {
      alert("Kaydetme hatası: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Oda Sayfaları Paneli</h1>

      {/* DEBUG BİLGİLERİ */}
      <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
        <p>
          <strong>Selected Slug:</strong> {selectedSlug || "None"}
        </p>
        <p>
          <strong>Selected Room Carousel Length:</strong>{" "}
          {selectedRoom?.carousel?.length || 0}
        </p>
        <p>
          <strong>Selected Room Carousel:</strong>{" "}
          {JSON.stringify(selectedRoom?.carousel || [])}
        </p>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          <div className="flex gap-3 mb-6 flex-wrap">
            {rooms.map((room) => (
              <button
                key={room.slug}
                className={`px-4 py-2 rounded transition-all duration-150
                  ${
                    room.slug === selectedSlug
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
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
              {selectedRoom ? (
                <SubroomCarouselEdit
                  data={selectedRoom}
                  setData={setRoomData}
                />
              ) : (
                <div>Bir oda seçiniz</div>
              )}
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
