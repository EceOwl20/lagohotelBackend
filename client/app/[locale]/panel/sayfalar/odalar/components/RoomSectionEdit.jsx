// components/RoomSectionEdit.jsx
"use client";
import React from 'react';

const langsRoom = ['tr', 'en', 'de', 'ru'];
const sectionFields = ['title', 'subtitle', 'm', 'view', 'buttonText'];

export default function RoomSectionEdit({ sectionKey, data, setData }) {
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
      <h2 className="text-[22px] font-semibold mb-4">Bölüm {sectionKey.replace('roomSection', '')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionFields.map(field => (
          langsRoom.map(lang => (
            <label key={`${sectionKey}-${field}-${lang}`} className="block font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)} ({lang.toUpperCase()})
              <input
                type="text"
                className="mt-1 w-full border rounded p-2"
                value={data?.[sectionKey]?.[field]?.[lang] ?? ''}
                onChange={e => handleChange(`${sectionKey}.${field}.${lang}`, e.target.value)}
              />
            </label>
          ))
        ))}
        <label className="block font-semibold">
          Img URL
          <input
            type="text"
            className="mt-1 w-full border rounded p-2"
            value={data?.[sectionKey]?.img ?? ''}
            onChange={e => handleChange(`${sectionKey}.img`, e.target.value)}
          />
        </label>
        <label className="block font-semibold">
          Img2 URL
          <input
            type="text"
            className="mt-1 w-full border rounded p-2"
            value={data?.[sectionKey]?.img2 ?? ''}
            onChange={e => handleChange(`${sectionKey}.img2`, e.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
