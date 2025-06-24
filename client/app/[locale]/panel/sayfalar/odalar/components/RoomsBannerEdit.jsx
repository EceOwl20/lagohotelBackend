// components/RoomsBannerEdit.jsx
"use client";
import React, { useState } from 'react';

const langs = ['tr', 'en', 'de', 'ru'];

export default function RoomsBannerEdit({ data, setData }) {
  const [uploading, setUploading] = useState(false);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (res.ok && json.path) {
        handleChange('roomsBanner.bannerImage', json.path);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleButtonAdd = () => {
    setData(prev => ({
      ...prev,
      roomsBanner: {
        ...prev.roomsBanner,
        buttons: [
          ...(prev.roomsBanner?.buttons || []),
          { header: { tr: '', en: '', de: '', ru: '' }, link: '' }
        ]
      }
    }));
  };

  const handleButtonRemove = (index) => {
    setData(prev => {
      const buttons = [...(prev.roomsBanner?.buttons || [])];
      buttons.splice(index, 1);
      return {
        ...prev,
        roomsBanner: {
          ...prev.roomsBanner,
          buttons
        }
      };
    });
  };

  return (
    <section className='border border-gray-300 rounded-md p-4 bg-slate-50'>
      <h2 className="text-[22px] font-semibold mb-4">Banner Ayarları</h2>

      {/* Görsel Upload */}
      <label className="block mb-4 font-semibold">
        Banner Görsel
        <input
          type="file"
          accept="image/*"
          className="mt-1 w-full"
          onChange={handleFileUpload}
        />
        {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
        {data?.roomsBanner?.bannerImage && (
          <img
            src={data.roomsBanner.bannerImage}
            alt="Banner Preview"
            className="mt-2 h-32 object-cover border"
          />
        )}
      </label>

      {/* Başlıklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {langs.map(lang => (
          <label key={lang} className="block font-semibold">
            Başlık ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={data?.roomsBanner?.header?.[lang] ?? ''}
              onChange={e => handleChange(`roomsBanner.header.${lang}`, e.target.value)}
            />
          </label>
        ))}
      </div>

      {/* Dinamik Butonlar */}
      <div>
        <h3 className="text-lg font-medium mb-2">Butonlar</h3>
        {(data?.roomsBanner?.buttons || []).map((btn, idx) => (
          <div key={idx} className="border rounded p-3 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              {langs.map(lang => (
                <label key={lang} className="block font-semibold">
                  Metin ({lang.toUpperCase()})
                  <input
                    type="text"
                    className="mt-1 w-full border rounded p-2"
                    value={btn.header?.[lang] ?? ''}
                    onChange={e => handleChange(`roomsBanner.buttons.${idx}.header.${lang}`, e.target.value)}
                  />
                </label>
              ))}

              <label className="block font-semibold">
                Link
                <input
                  type="text"
                  className="mt-1 w-full border rounded p-2"
                  value={btn.link ?? ''}
                  onChange={e => handleChange(`roomsBanner.buttons.${idx}.link`, e.target.value)}
                />
              </label>
            </div>
            <button
              type="button"
              className="text-red-600 hover:underline"
              onClick={() => handleButtonRemove(idx)}
            >
              Butonu Kaldır
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleButtonAdd}
        >
          Buton Ekle
        </button>
      </div>
    </section>
  );
}
