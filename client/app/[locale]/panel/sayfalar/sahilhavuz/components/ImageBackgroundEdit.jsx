"use client";
import { useState } from "react";

export default function ImageBackgroundEdit({ data, setData, langs }) {
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [uploading, setUploading] = useState(false);
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
     const res = await fetch(`${apiUrl}/api/upload`, { method: "POST", body: formData });
    const json = await res.json();
    if (res.ok && json.imageUrl) {
      setData({
        ...data,
        imageBackground: { ...data.imageBackground, image: json.imageUrl },
      });
    }
    setUploading(false);
  };
  const handleLangChange = (field, lang, value) =>
    setData({
      ...data,
      imageBackground: {
        ...data.imageBackground,
        [field]: { ...(data.imageBackground?.[field] || {}), [lang]: value },
      },
    });
  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">Beach Arka Plan Bölümü</h3>
      <label className="font-semibold">Arka Plan Görseli</label>
      <div className="flex items-center gap-4 mb-2">
        {data.imageBackground?.image && (
          <img src={`http://localhost:5001${data.imageBackground.image}`} alt="" className="w-[120px] h-[80px] object-cover rounded" />
        )}
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
        {uploading && <span className="text-blue-500 ml-2">Yükleniyor...</span>}
      </div>
      {["subtitle", "title", "text1", "text2", "icon1Text", "icon2Text"].map(field => (
        <div className="mb-2" key={field}>
          <label className="block font-semibold mt-2 mb-1">{field}</label>
          <div className="flex flex-wrap gap-2">
            {langs.map(({ key, label }) => (
              <input
                key={key}
                placeholder={label}
                value={data.imageBackground?.[field]?.[key] || ""}
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
