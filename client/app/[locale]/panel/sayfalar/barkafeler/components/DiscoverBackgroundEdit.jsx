"use client";
import { useState } from "react";
const langs = [
  { key: "tr", label: "Türkçe" },
  { key: "en", label: "İngilizce" },
  { key: "de", label: "Almanca" },
  { key: "ru", label: "Rusça" }
];
export default function DiscoverBackgroundEdit({ data, setData }) {
  const [uploading, setUploading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleUpload = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
    const json = await res.json();
    if (res.ok && json.imageUrl) {
      setData({ ...data, discoverBackground: { ...data.discoverBackground, image: json.imageUrl } });
    }
    setUploading(false);
  };

  const handleLangChange = (field, lang, value) =>
    setData({
      ...data,
      discoverBackground: {
        ...data.discoverBackground,
        [field]: { ...(data.discoverBackground?.[field] || {}), [lang]: value }
      }
    });

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Discover Background</h3>
      <label className="font-semibold">Arka Plan Görseli</label>
      <div className="flex items-center gap-4 mb-2">
        {data.discoverBackground?.image && (
          <img src={`http://localhost:5001${data.discoverBackground.image}`} alt="" className="w-[120px] h-[70px] object-cover rounded" />
        )}
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
        {uploading && <span className="text-blue-500 ml-2">Yükleniyor...</span>}
      </div>
      {["subtitle", "title", "text", "buttonText"].map(field => (
        <div className="mb-2" key={field}>
          <label className="block font-semibold mt-2 mb-1">{field === "buttonText" ? "Buton Metni" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <div className="flex flex-wrap gap-2">
            {langs.map(({ key, label }) => (
              field === "text" ? (
                <textarea
                  key={key}
                  placeholder={label}
                  value={data.discoverBackground?.[field]?.[key] || ""}
                  onChange={e => handleLangChange(field, key, e.target.value)}
                  className="border rounded p-2 w-[180px] min-h-[50px]"
                />
              ) : (
                <input
                  key={key}
                  placeholder={label}
                  value={data.discoverBackground?.[field]?.[key] || ""}
                  onChange={e => handleLangChange(field, key, e.target.value)}
                  className="border rounded p-2 w-[180px]"
                />
              )
            ))}
          </div>
        </div>
      ))}
      <label className="font-semibold mt-2 mb-1 block">Buton Linki</label>
      <input
        type="text"
        value={data.discoverBackground?.link || ""}
        onChange={e => setData({ ...data, discoverBackground: { ...data.discoverBackground, link: e.target.value } })}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}
