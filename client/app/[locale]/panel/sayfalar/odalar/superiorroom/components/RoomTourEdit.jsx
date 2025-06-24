// components/edit/RoomTourEdit.jsx
"use client";
import React from 'react';

const langs = ['tr','en','de','ru'];

export default function RoomTourEdit({ data, setData }) {
  const tours = data.roomTours || [];

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

  const handleAdd = () =>
    setData(prev => ({
      roomTours: [
        ...(prev.roomTours || []),
        { span: { tr:'',en:'',de:'',ru:'' }, header:{tr:'',en:'',de:'',ru:''}, text:{tr:'',en:'',de:'',ru:''}, link:'' }
      ]
    }));

  const handleRemove = idx =>
    setData(prev => {
      const arr = [...(prev.roomTours || [])];
      arr.splice(idx, 1);
      return { ...prev, roomTours: arr };
    });

  return (
    <section className="border rounded p-4 bg-slate-50">
      <h2 className="font-semibold mb-4">RoomTours Ayarları</h2>

      {tours.map((tour, idx) => (
        <div key={idx} className="border p-2 mb-2">
          {langs.map(lang => (
            <label key={idx+lang} className="block font-semibold mb-1">
              Span {idx+1} ({lang.toUpperCase()})
              <input
                type="text"
                className="mt-1 w-full border rounded p-2"
                value={tour.span?.[lang] || ''}
                onChange={e => handleChange(`roomTours.${idx}.span.${lang}`, e.target.value)}
              />
            </label>
          ))}
          {langs.map(lang => (
            <label key={idx+lang+"hdr"} className="block font-semibold mb-1">
              Header {idx+1} ({lang.toUpperCase()})
              <input
                type="text"
                className="mt-1 w-full border rounded p-2"
                value={tour.header?.[lang] || ''}
                onChange={e => handleChange(`roomTours.${idx}.header.${lang}`, e.target.value)}
              />
            </label>
          ))}
          {langs.map(lang => (
            <label key={idx+lang+"txt"} className="block font-semibold mb-1">
              Text {idx+1} ({lang.toUpperCase()})
              <input
                type="text"
                className="mt-1 w-full border rounded p-2"
                value={tour.text?.[lang] || ''}
                onChange={e => handleChange(`roomTours.${idx}.text.${lang}`, e.target.value)}
              />
            </label>
          ))}
          <label className="block font-semibold mb-1">
            Link {idx+1}
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={tour.link || ''}
              onChange={e => handleChange(`roomTours.${idx}.link`, e.target.value)}
            />
          </label>
          <button
            type="button"
            className="text-red-600"
            onClick={() => handleRemove(idx)}
          >
            Remove Tour
          </button>
        </div>
      ))}

      <button
        type="button"
        className="px-3 py-1 bg-green-600 text-white rounded"
        onClick={handleAdd}
      >
        Add RoomTour
      </button>
    </section>
  );
}