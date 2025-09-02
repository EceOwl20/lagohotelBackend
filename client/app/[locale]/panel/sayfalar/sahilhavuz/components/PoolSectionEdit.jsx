// app/[locale]/panel/sayfalar/sahilhavuz/components/PoolSectionEdit.jsx
"use client";
import { useState } from "react";

export default function PoolSectionEdit({ data, setData, activeLang = "tr" }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const section = data?.poolSection || {};
  const [uploading, setUploading] = useState(false);

  // ---- helpers (functional updates) ----
  const setField = (field, value) =>
    setData(prev => ({
      ...prev,
      poolSection: {
        ...(prev?.poolSection || {}),
        [field]: {
          ...((prev?.poolSection && prev.poolSection[field]) || {}),
          [activeLang]: value,
        },
      },
    }));

  const setVideo = (value) =>
    setData(prev => ({
      ...prev,
      poolSection: { ...(prev?.poolSection || {}), video: value },
    }));

  const handleVideoUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      // backend: uploadVideo.single("video")
      formData.append("video", file);
      const res = await fetch(`${apiUrl}/api/upload/video`, { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Yükleme başarısız");
      const url = json.videoUrl || json.path;
      if (url) setVideo(url);
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  };

  const videoSrc = section.video
    ? (section.video.startsWith("/") ? `${apiUrl}${section.video}` : section.video)
    : "";

  return (
    <section className="rounded-2xl border bg-white overflow-hidden">
      <div className="px-4 py-3 border-b bg-gradient-to-r from-black/5 to-transparent">
        <h2 className="text-lg font-semibold">🏊 Pool Section (Video arka planlı)</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Video alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
          {/* Sol: Video önizleme & yükleme */}
          <div className="space-y-3">
            <div className="aspect-video w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-gray-50">
              {videoSrc ? (
                <video
                  src={videoSrc}
                  controls
                  className="h-full w-full"
                />
              ) : (
                <div className="h-full w-full grid place-items-center text-gray-400 text-sm">
                  Video önizlemesi yok
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="inline-flex items-center px-3 py-2 rounded-md bg-black text-white text-sm cursor-pointer hover:bg-black/90">
                Dosya Seç (MP4)
                <input
                  type="file"
                  accept="video/mp4"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => handleVideoUpload(e.target.files?.[0] || null)}
                />
              </label>
              <button
                type="button"
                className="px-3 py-2 rounded-md text-sm ring-1 ring-black/10 hover:bg-black/5"
                onClick={() => setVideo("")}
              >
                Kaldır
              </button>
              {uploading && <span className="text-sm text-blue-600">Yükleniyor…</span>}
            </div>

            <input
              type="text"
              value={section.video || ""}
              onChange={(e) => setVideo(e.target.value)}
              placeholder="/uploads/video.mp4 veya tam URL"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {/* Sağ: Aktif dil alanları */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Alt Başlık ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={section?.subtitle?.[activeLang] || ""}
                onChange={(e) => setField("subtitle", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Başlık ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={section?.title?.[activeLang] || ""}
                onChange={(e) => setField("title", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Açıklama ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={4}
                value={section?.text?.[activeLang] || ""}
                onChange={(e) => setField("text", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
