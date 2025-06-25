// components/edit/SubroomCarouselEdit.jsx
"use client";
import React, { useState } from 'react';

export default function SubroomCarouselEdit({ data = {}, setData }) {
  const imgs = data.carouselImages || [];
  const [uploading, setUploading] = useState({});

  const handleFileUpload = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [idx]: true }));
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (res.ok && json.path) {
        setData(prev => {
          const arr = [...(prev.carouselImages || [])];
          arr[idx] = json.path;
          return { ...prev, carouselImages: arr };
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(prev => ({ ...prev, [idx]: false }));
    }
  };

  const handleAdd = () =>
    setData(prev => ({
      ...prev,
      carouselImages: [...(prev.carouselImages || []), '']
    }));

  const handleRemove = idx =>
    setData(prev => {
      const arr = [...(prev.carouselImages || [])];
      arr.splice(idx, 1);
      return { ...prev, carouselImages: arr };
    });

  return (
    <section className="border rounded p-4 bg-slate-50">
      <h2 className="font-semibold mb-4">Carousel Images</h2>
      {imgs.map((url, idx) => (
        <div key={idx} className="flex flex-col mb-4">
          {url && (
            <img src={url} alt={`Carousel ${idx}`} className="h-24 mb-2 object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            className="mb-2"
            onChange={e => handleFileUpload(e, idx)}
          />
          {uploading[idx] && <p className="text-sm text-gray-500">Yükleniyor...</p>}
          <button
            type="button"
            className="w-max text-red-600 hover:underline"
            onClick={() => handleRemove(idx)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handleAdd}
      >
        Add Image
      </button>
    </section>
  );
}