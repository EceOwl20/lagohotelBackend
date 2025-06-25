"use client";

import React from 'react';

const languages = ['tr', 'en', 'de', 'ru'];

export default function SubRoomBannerEdit({ data = {}, setData }) {
  const banner = data.subRoomBanner || { texts: [] };

  // helper to update deep field
  const updateBanner = (updates) => {
    setData(prev => ({
      ...prev,
      subRoomBanner: {
        ...banner,
        ...updates
      }
    }));
  };

  // update one of the multilingual spans or headers
  const handleLangField = (field, lang, value) => {
    updateBanner({
      [field]: {
        ...banner[field],
        [lang]: value
      }
    });
  };

  // texts array helpers
  const handleTextChange = (idx, lang, value) => {
    const newTexts = [...banner.texts];
    newTexts[idx] = {
      ...newTexts[idx],
      [lang]: value
    };
    updateBanner({ texts: newTexts });
  };

  const addText = () => {
    updateBanner({ texts: [...(banner.texts || []), { tr: '', en: '', de: '', ru: '' }] });
  };

  const removeText = (idx) => {
    const newTexts = [...banner.texts];
    newTexts.splice(idx, 1);
    updateBanner({ texts: newTexts });
  };

  return (
    <section className="border rounded p-4 bg-slate-50">
      <h2 className="font-semibold mb-4">SubRoomBanner Ayarları</h2>

      {/* Görsel URL */}
      <label className="block font-semibold mb-2">
        Görsel URL
        <input
          type="text"
          className="mt-1 w-full border rounded p-2"
          value={banner.img || ''}
          onChange={e => updateBanner({ img: e.target.value })}
        />
      </label>

      <div className="bg-gray-300 h-[1px] w-full my-6" />

      {/* Span metinleri */}
      {languages.map(lang => (
        <label key={`span-${lang}`} className="block font-semibold mb-2">
          Span ({lang.toUpperCase()})
          <input
            type="text"
            className="mt-1 w-full border rounded p-2"
            value={banner.span?.[lang] || ''}
            onChange={e => handleLangField('span', lang, e.target.value)}
          />
        </label>
      ))}

      <div className="bg-gray-300 h-[1px] w-full my-6" />

      {/* Header metinleri */}
      {languages.map(lang => (
        <label key={`hdr-${lang}`} className="block font-semibold mb-2">
          Header ({lang.toUpperCase()})
          <input
            type="text"
            className="mt-1 w-full border rounded p-2"
            value={banner.header?.[lang] || ''}
            onChange={e => handleLangField('header', lang, e.target.value)}
          />
        </label>
      ))}

      <div className="bg-gray-300 h-[1px] w-full my-6" />

      {/* Texts dizisi */}
      <h3 className="font-semibold mb-2">Texts</h3>
      {(banner.texts || []).map((txt, idx) => (
        <div key={idx} className="border p-2 mb-2">
          {languages.map(lang => (
            <label key={`text-${idx}-${lang}`} className="block font-semibold mb-1">
              Text {idx + 1} ({lang.toUpperCase()})
              <input
                type="text"
                className="mt-1 w-full border rounded p-2"
                value={txt[lang] || ''}
                onChange={e => handleTextChange(idx, lang, e.target.value)}
              />
            </label>
          ))}
          <button
            type="button"
            className="text-red-600 mt-1"
            onClick={() => removeText(idx)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="px-3 py-1 bg-green-600 text-white rounded"
        onClick={addText}
      >
        Add Text
      </button>

      <div className="bg-gray-300 h-[1px] w-full my-6" />

      {/* Baby checkbox */}
      <label className="block font-semibold mt-4">
        Baby
        <input
          type="checkbox"
          className="ml-2"
          checked={banner.baby || false}
          onChange={e => updateBanner({ baby: e.target.checked })}
        />
      </label>
    </section>
  );
}