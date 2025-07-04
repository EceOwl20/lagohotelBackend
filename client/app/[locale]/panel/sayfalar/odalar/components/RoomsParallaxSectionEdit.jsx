// components/RoomsParallaxSectionEdit.jsx
"use client";
import React, { useState } from 'react';

const langsParallax = ['tr', 'en', 'de', 'ru'];
const parallaxFields = [
  'subtitle', 'title',
  'feature1', 'desc1',
  'feature2', 'desc2',
  'text',
  'feature3', 'desc3',
  'feature4', 'desc4'
];

export default function RoomsParallaxSectionEdit({ data, setData }) {
   const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");


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
        roomsParallaxSection: { ...data.roomsParallaxSection, backgroundImage: result.imageUrl },
      });
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (path, value) => {
    setData(prev => {
      const updated = { ...prev };
      const keys = path.split('.');
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj?.[keys[i]] ?? {};
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  return (
    <section className="border border-gray-300 rounded-md p-4 bg-slate-50">
      <h2 className="text-[22px] font-semibold mb-4">Parallax Section Ayarları</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            src={`http://localhost:5001${data.roomsParallaxSection.backgroundImage}`}
            alt="Background Image Preview"
            className="mt-2 h-32 object-cover border rounded"
          />
        )}
      </label>
          {/* <input
            type="text"
            className="mt-1 w-full border rounded p-2"
            value={data?.roomsParallaxSection?.backgroundImage ?? ''}
            onChange={e => handleChange('roomsParallaxSection.backgroundImage', e.target.value)}
          />
        </label> */}
        
        {parallaxFields.map(field => (
          langsParallax.map(lang => (
            <label key={`${field}-${lang}`} className="block font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)} ({lang.toUpperCase()})
              <textarea
                rows={field.startsWith('desc') || field === 'text' ? 2 : 1}
                className="mt-1 w-full border rounded p-2"
                value={data?.roomsParallaxSection?.[field]?.[lang] ?? ''}
                onChange={e => handleChange(`roomsParallaxSection.${field}.${lang}`, e.target.value)}
              />
            </label>
            
          ))
        ))}
      </div>
    </section>
  );
}