// components/RoomsInfoSectionEdit.jsx
"use client";
import React from 'react';

const langs = ['tr', 'en', 'de', 'ru'];
const fields = ['subtitle', 'title', 'text', 'checkin', 'checkout'];

export default function RoomsInfoSectionEdit({ data, setData }) {
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
      <h2 className="text-[22px] font-semibold mb-4">Info Section Ayarları</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(field =>
          langs.map(lang => (
            <label key={`${field}-${lang}`} className="block  font-semibold ">
              {field.charAt(0).toUpperCase() + field.slice(1)} ({lang.toUpperCase()})
              {field === 'text' ? (
                <textarea
                  rows={3}
                  className="mt-1 w-full border rounded p-2"
                  value={data?.roomsInfoSection?.[field]?.[lang] ?? ''}
                  onChange={e => handleChange(`roomsInfoSection.${field}.${lang}`, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="mt-1 w-full border rounded p-2"
                  value={data?.roomsInfoSection?.[field]?.[lang] ?? ''}
                  onChange={e => handleChange(`roomsInfoSection.${field}.${lang}`, e.target.value)}
                />
              )}
            </label>
          ))
        )}
      </div>
    </section>
  );
}