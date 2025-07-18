"use client";
import { useState } from "react";

export default function PoolSectionEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const section = data.poolSection || {};

  // Çokdilli metin güncelleme
  const handleLangChange = (field, lang, value) =>
    setData({
      ...data,
      poolSection: {
        ...section,
        [field]: { ...(section[field] || {}), [lang]: value }
      }
    });

  // Video yükleme handler
const handleVideoUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setUploading(true);
  const formData = new FormData();
  // field name mutlaka "video" olmalı, çünkü backend uploadVideo.single("video") diyor
  formData.append("video", file);
  try {
    // video için doğru endpoint
    const res = await fetch(`${apiUrl}/api/upload/video`, {
      method: "POST",
      body: formData
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
    const videoUrl = result.videoUrl || result.path;
    setData({
      ...data,
      poolSection: {
        ...section,
        video: videoUrl
      }
    });
  } catch (err) {
    alert("Yükleme hatası: " + err.message);
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Pool Section (Video arka planlı)</h3>

      {/* — Video dosya yükleme alanı — */}
      <label className="font-semibold">Video (mp4)</label>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="file"
          accept="video/mp4"
          onChange={handleVideoUpload}
          disabled={uploading}
          className="border p-2 rounded"
        />
        {uploading && <span className="text-blue-600">Yükleniyor…</span>}
      </div>
      {section.video && (
        <video
          src={
            section.video.startsWith("/")
              ? `${apiUrl}${section.video}`
              : section.video
          }
          controls
          className="w-full h-auto mb-6 rounded"
        />
      )}

      {/* — Çokdilli metin alanları — */}
      {["subtitle", "title", "text"].map(field => (
        <div className="mb-4" key={field}>
          <label className="block font-semibold mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <div className="flex flex-wrap gap-2">
            {langs.map(({ key, label }) => (
              <input
                key={key}
                placeholder={`${label}`}
                value={section[field]?.[key] || ""}
                onChange={e => handleLangChange(field, key, e.target.value)}
                className="border rounded p-2 w-[180px]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
