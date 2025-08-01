// components/RoomsParallaxSectionEdit.jsx
"use client";
import React, { useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const langsParallax = ['tr', 'en', 'de', 'ru'];
const parallaxFields = [
  'subtitle', 'title',
  'feature1', 'desc1',
  'feature2', 'desc2',
  'text',
  'feature3', 'desc3',
  'feature4', 'desc4'
];

// Deep‐update helper
function updateIn(obj, pathArr, value) {
  if (pathArr.length === 0) return value;
  const [key, ...rest] = pathArr;
  // if numeric key, treat as array index
  if (!isNaN(key)) {
    const idx = Number(key);
    const arr = Array.isArray(obj) ? [...obj] : [];
    arr[idx] = updateIn(arr[idx] ?? {}, rest, value);
    return arr;
  }
  return {
    ...obj,
    [key]: updateIn(obj?.[key] ?? {}, rest, value)
  };
}

export default function RoomsParallaxSectionEdit({ data, setData }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // unified deep handleChange
  const handleChange = (path, value) => {
    setData(prev => updateIn(prev, path.split('.'), value));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Yükleme başarısız");
      handleChange('roomsParallaxSection.backgroundImage', result.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="border border-gray-300 rounded-md p-4 bg-slate-50">
      <h2 className="text-[22px] font-semibold mb-4">Parallax Section Ayarları</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Background image */}
        <label className="block font-semibold">
          Background Image
          <input
            type="file"
            accept="image/*"
            className="mt-1 w-full"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {data?.roomsParallaxSection?.backgroundImage && (
            <img
              src={`${apiUrl}${data.roomsParallaxSection.backgroundImage}`}
              alt="Background Preview"
              className="mt-2 h-32 object-cover border rounded"
            />
          )}
        </label>

        {parallaxFields.map(field =>
          langsParallax.map(lang => (
            <label key={`${field}-${lang}`} className="block font-semibold">
              {`${field.charAt(0).toUpperCase() + field.slice(1)} (${lang.toUpperCase()})`}
              <textarea
                rows={field.startsWith('desc') || field === 'text' ? 2 : 1}
                className="mt-1 w-full border rounded p-2"
                value={data?.roomsParallaxSection?.[field]?.[lang] || ""}
                onChange={e =>
                  handleChange(`roomsParallaxSection.${field}.${lang}`, e.target.value)
                }
              />
            </label>
          ))
        )}
      </div>
    </section>
  );
}
