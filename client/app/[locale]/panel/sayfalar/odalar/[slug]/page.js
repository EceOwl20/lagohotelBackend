// pages/admin/rooms/[slug].jsx

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const langs = ["tr", "en", "de", "ru"];
const emptyLangField = { tr: "", en: "", de: "", ru: "" };

const defaultRoom = {
  slug: "",
  subRoomBanner: {
    img: "",
    span: { ...emptyLangField },
    header: { ...emptyLangField },
    texts: [{ ...emptyLangField }],
    baby: false
  },
  carouselImages: [],
  roomFeatures: {
    span: { ...emptyLangField },
    header: { ...emptyLangField },
    text: { ...emptyLangField },
    header2: { ...emptyLangField },
    header3: { ...emptyLangField },
    text2: { ...emptyLangField },
    iconsTexts: [{ ...emptyLangField }],
    pool: false
  },
  roomsParallaxSection: {
    backgroundImage: "",
    subtitle: { ...emptyLangField },
    title: { ...emptyLangField },
    feature1: { ...emptyLangField },
    desc1: { ...emptyLangField },
    feature2: { ...emptyLangField },
    desc2: { ...emptyLangField },
    text: { ...emptyLangField },
    feature3: { ...emptyLangField },
    desc3: { ...emptyLangField },
    feature4: { ...emptyLangField },
    desc4: { ...emptyLangField }
  },
  roomTours: []
};

export default function RoomAdminPage() {
  const { slug } = useParams();
  const [room, setRoom] = useState(defaultRoom);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Veri Çek
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`http://localhost:5001/api/rooms/subrooms/${slug}`)
      .then(res => res.json())
      .then(data => setRoom(data))
      .catch(() => setRoom({ ...defaultRoom, slug }))
      .finally(() => setLoading(false));
  }, [slug]);

  // Alan değişimi örneği (tüm alanlar için benzer mantık)
  const handleLangField = (obj, key, lang, value) => {
    setRoom(prev => ({
      ...prev,
      [obj]: {
        ...prev[obj],
        [key]: { ...prev[obj][key], [lang]: value }
      }
    }));
  };

  // Kaydet
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/rooms/subrooms/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(room),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Update failed");
      setSuccess("Başarıyla güncellendi!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold">Oda Paneli: <span className="text-blue-600">{slug}</span></h1>
      {/* örnek alan */}
      <div>
        <h2>SubRoomBanner / Başlık</h2>
        {langs.map(lang => (
          <input
            key={lang}
            placeholder={`Başlık (${lang})`}
            value={room.subRoomBanner.header?.[lang] || ""}
            onChange={e => handleLangField("subRoomBanner", "header", lang, e.target.value)}
            className="border p-2 m-1"
          />
        ))}
      </div>
      {/* Diğer alanlar için de benzer inputlar... */}

      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Kaydet
      </button>
      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
