"use client";
import { useState } from "react";

export default function MainBannerEdit({ data, setData, langs }) {
  const [uploading, setUploading] = useState(false);

  // Görsel yükleme fonksiyonu (değişmedi)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");

      setData({
        ...data,
        mainBanner: { ...data.mainBanner, image: result.imageUrl },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="border border-gray-300 rounded-md p-4 bg-slate-50">
      <h2 className="text-[22px] font-semibold mb-4">Banner Ayarları</h2>

      {/* Görsel Upload */}
      <label className="block mb-4 font-semibold">
        Banner Görsel
        <input
          type="file"
          accept="image/*"
          className="mt-1 w-full"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
        {data?.mainBanner?.image && (
          <img
            src={`http://localhost:5001${data.mainBanner.image}`}
            alt="Banner Preview"
            className="mt-2 h-32 object-cover border"
          />
        )}
      </label>

      {/* Alt Başlıklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map(lang => (
          <label key={lang} className="block font-semibold">
            Alt Başlık ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={data?.mainBanner?.subtitle?.[lang] ?? ''}
              onChange={e =>
                setData({
                  ...data,
                  mainBanner: {
                    ...data.mainBanner,
                    subtitle: { ...data.mainBanner?.subtitle, [lang]: e.target.value }
                  }
                })
              }
            />
          </label>
        ))}
      </div>

      {/* Başlıklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map(lang => (
          <label key={lang} className="block font-semibold">
            Başlık ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={data?.mainBanner?.title?.[lang] ?? ''}
              onChange={e =>
                setData({
                  ...data,
                  mainBanner: {
                    ...data.mainBanner,
                    title: { ...data.mainBanner?.title, [lang]: e.target.value }
                  }
                })
              }
            />
          </label>
        ))}
      </div>

      {/* Açıklama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        {langs.map(lang => (
          <label key={lang} className="block font-semibold">
            Açıklama ({lang.toUpperCase()})
            <textarea
              className="mt-1 w-full border rounded p-2"
              rows={3}
              value={data?.mainBanner?.text?.[lang] ?? ''}
              onChange={e =>
                setData({
                  ...data,
                  mainBanner: {
                    ...data.mainBanner,
                    text: { ...data.mainBanner?.text, [lang]: e.target.value }
                  }
                })
              }
            />
          </label>
        ))}
      </div>
    </section>
  );
}
