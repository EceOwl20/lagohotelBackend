"use client";
import { useState, useEffect } from "react";

export default function SectionHero({ data, setData }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [uploading, setUploading] = useState({ desktop: false, mobile: false });
  const [videoOptions, setVideoOptions] = useState([]);

useEffect(() => {
  fetch(`${apiUrl}/api/upload/videos`)
    .then(res => res.json())
    .then(json => {
      console.log("Videolar:", json); // Burası önemli
      setVideoOptions(json.videos || []);
    });
}, []);

  const handleVideoUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [type]: true }));
    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload/videos`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok || !result.videoUrl) throw new Error(result.error || "Yükleme başarısız");

      setData({
        ...data,
        hero: {
          ...data.hero,
          [type]: result.videoUrl,
        },
      });
    } catch (err) {
      alert("Video yüklenemedi: " + err.message);
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleSelectVideo = (type, selected) => {
    if (!selected) return;
    setData({
      ...data,
      hero: {
        ...data.hero,
        [type]: `/uploads/videos/${selected}`,
      },
    });
  };

  const renderVideoField = (type, label) => {
    const currentVideo = data.hero?.[type] || "";
    const fullSrc = currentVideo.startsWith("/")
      ? `${apiUrl}${currentVideo}`
      : currentVideo;

    return (
      <div>
        <label className="font-semibold block mb-1">{label}</label>

        {/* 1 - Manuel URL */}
        <input
          type="text"
          placeholder="https://... "
          value={currentVideo}
          onChange={(e) =>
            setData({
              ...data,
              hero: {
                ...data.hero,
                [type]: e.target.value,
              },
            })
          }
          className="w-full border p-2 rounded mb-2"
        />

        {/* 2 - Videolardan seç */}
        {videoOptions.length > 0 && (
          <select
            className="w-full border p-2 rounded mb-2"
            value=""
            onChange={(e) => handleSelectVideo(type, e.target.value)}
          >
            <option value="">📂 Videolardan Seç</option>
            {videoOptions.map((file, i) => (
              <option key={i} value={file}>
                {file}
              </option>
            ))}
          </select>
        )}

        {/* 3 - Dosyadan yükle */}
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleVideoUpload(e, type)}
          disabled={uploading[type]}
          className="w-full"
        />
        {uploading[type] && <p className="text-sm text-gray-500">Yükleniyor...</p>}

        {/* Önizleme */}
        {currentVideo && (
          <video
            src={fullSrc}
            controls
            className="mt-2 rounded border max-w-full h-40 object-cover"
          />
        )}
      </div>
    );
  };

  return (
    <div className="border p-4 rounded bg-white space-y-6">
      <h2 className="text-xl font-bold">🎬 Hero Video (Arka Plan)</h2>
      {renderVideoField("videoDesktop", "Video (Desktop)")}
      {renderVideoField("videoMobile", "Video (Mobile)")}
    </div>
  );
}
