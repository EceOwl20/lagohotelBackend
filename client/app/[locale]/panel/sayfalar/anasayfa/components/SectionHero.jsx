"use client";

export default function SectionHero({ data, setData }) {
  const handleVideoUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await fetch("http://localhost:5001/api/upload/video", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");

      setData({
        ...data,
        hero: {
          ...data.hero,
          [type]: result.videoUrl,
        },
      });
    } catch (err) {
      alert("Video yüklenemedi: " + err.message);
    }
  };

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-2">🎬 Hero Video (Arka Plan)</h2>

      {/* Masaüstü Video */}
      <label className="block font-semibold">Video (Desktop)</label>
      <input
        type="text"
        value={data.hero?.videoDesktop || ""}
        onChange={(e) =>
          setData({
            ...data,
            hero: {
              ...data.hero,
              videoDesktop: e.target.value,
            },
          })
        }
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => handleVideoUpload(e, "videoDesktop")}
        className="w-full"
      />

      {/* Mobil Video */}
      <label className="block font-semibold mt-4">Video (Mobile)</label>
      <input
        type="text"
        value={data.hero?.videoMobile || ""}
        onChange={(e) =>
          setData({
            ...data,
            hero: {
              ...data.hero,
              videoMobile: e.target.value,
            },
          })
        }
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => handleVideoUpload(e, "videoMobile")}
        className="w-full"
      />
    </div>
  );
}