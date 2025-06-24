// components/edit/SubRoomBannerEdit.jsx
"use client";
import React from 'react';

const langs = ['tr', 'en', 'de', 'ru'];

export default function SubRoomBannerEdit({ data = {}, setData }) {
  const banner = data.subRoomBanner || {};

  const handleChange = (path, value) => {
    setData(prev => {
      const updated = { ...prev };
      const keys = path.split('.');
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleTextChange = (idx, lang, value) => 
    handleChange(`subRoomBanner.texts.${idx}.${lang}`, value);

  const handleAddText = () => 
    setData(prev => ({
      ...prev,
      subRoomBanner: {
        ...banner,
        texts: [...(banner.texts || []), { tr: '', en: '', de: '', ru: '' }]
      }
    }));

  const handleRemoveText = idx =>
    setData(prev => {
      const newTexts = [...(banner.texts || [])];
      newTexts.splice(idx, 1);
      return { ...prev, subRoomBanner: { ...banner, texts: newTexts } };
    });

  return (
    <section className="border rounded p-4 bg-slate-50">
      <h2 className="font-semibold mb-4">SubRoomBanner Ayarları</h2>

      <label className="block font-semibold mb-2">
        Görsel URL
        <input
          type="text"
          className="mt-1 w-full border rounded p-2"
          value={banner.img ?? ''}
          onChange={e => handleChange('subRoomBanner.img', e.target.value)}
        />
      </label>
<div className='bg-gray-300 h-[1px] w-full flex my-6'></div>
      {langs.map(lang => (
        <label key={lang} className="block font-semibold mb-2">
          Span ({lang.toUpperCase()})
          <input
            type="text"
            className="mt-1 w-full border rounded p-2"
            value={banner.span?.[lang] ?? ''}
            onChange={e => handleChange(`subRoomBanner.span.${lang}`, e.target.value)}
          />
        </label>
      ))}
<div className='bg-gray-300 h-[1px] w-full flex my-6'></div>
      {langs.map(lang => (
        <label key={lang + "hdr"} className="block font-semibold mb-2">
          Header ({lang.toUpperCase()})
          <input
            type="text"
            className="mt-1 w-full border rounded p-2"
            value={banner.header?.[lang] ?? ''}
            onChange={e => handleChange(`subRoomBanner.header.${lang}`, e.target.value)}
          />
        </label>
      ))}
<div className='bg-gray-300 h-[1px] w-full flex my-6'></div>
      <h3 className="font-semibold mt-4">Texts</h3>
      {(banner.texts || []).map((txt, idx) => (
        <div key={idx} className="border p-2 mb-2">
          {langs.map(lang => (
            <label key={idx + lang} className="block font-semibold mb-1">
              Text {idx + 1} ({lang.toUpperCase()})
              <input
                type="text"
                className="mt-1 w-full border rounded p-2"
                value={txt[lang] ?? ''}
                onChange={e => handleTextChange(idx, lang, e.target.value)}
              />
            </label>
          ))}
          <button
            type="button"
            className="text-red-600"
            onClick={() => handleRemoveText(idx)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="px-3 py-1 bg-green-600 text-white rounded"
        onClick={handleAddText}
      >
        Add Text
      </button>
<div className='bg-gray-300 h-[1px] w-full flex my-6'></div>
      <label className="block font-semibold mt-4">
        Baby
        <input
          type="checkbox"
          className="ml-2"
          checked={banner.baby ?? false}
          onChange={e => handleChange('subRoomBanner.baby', e.target.checked)}
        />
      </label>
    </section>
  );
}