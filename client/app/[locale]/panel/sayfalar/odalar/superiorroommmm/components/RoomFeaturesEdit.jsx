
import React from 'react';

const langs = ['tr','en','de','ru'];
const fields = ['span','header','text','header2','header3','text2'];

export default function RoomFeaturesEdit({ data, setData }) {
  const hf = data.roomFeatures || {};

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

  const handleIconText = (idx, lang, val) =>
    handleChange(`roomFeatures.iconsTexts.${idx}.${lang}`, val);

  const handleAddIcon = () =>
    setData(prev => ({
      roomFeatures: {
        ...prev.roomFeatures,
        iconsTexts: [...(prev.roomFeatures.iconsTexts || []), { tr:'',en:'',de:'',ru:'' }]
      }
    }));

  const handleRemoveIcon = i =>
    setData(prev => {
      const arr = [...(prev.roomFeatures.iconsTexts || [])];
      arr.splice(i, 1);
      return { ...prev, roomFeatures: { ...prev.roomFeatures, iconsTexts: arr } };
    });

  return (
    <section className="border rounded p-4 bg-slate-50">
      <h2 className="font-semibold mb-4">RoomFeatures Ayarları</h2>

      {fields.map(f =>
        langs.map(lang => (
          <label key={f+lang} className="block font-semibold mb-2">
            {f.charAt(0).toUpperCase()+f.slice(1)} ({lang.toUpperCase()})
            <input
              type="text"
              className="mt-1 w-full border rounded p-2"
              value={hf[f]?.[lang] || ''}
              onChange={e => handleChange(`roomFeatures.${f}.${lang}`, e.target.value)}
            />
          </label>
          
        ))
      )}
<div className='bg-gray-300 h-[1px] w-full flex my-6'></div>
      <label className="block font-semibold mb-4">
        Pool
        <input
          type="checkbox"
          className="ml-2"
          checked={hf.pool}
          onChange={e => handleChange('roomFeatures.pool', e.target.checked)}
        />
      </label>
<div className='bg-gray-300 h-[1px] w-full flex my-6'></div>
      <h3 className="font-semibold mb-2">Icons Texts</h3>
      {(hf.iconsTexts || []).map((it, idx) => (
        <div key={idx} className="border p-2 mb-2">
          {langs.map(lang => (
            <label key={idx+lang} className="block font-semibold mb-1">
              IconText {idx+1} ({lang.toUpperCase()})
              <input
                type="text"
                className="mt-1 w-full border rounded p-2"
                value={it[lang]}
                onChange={e => handleIconText(idx, lang, e.target.value)}
              />
            </label>
          ))}
          <button
            type="button"
            className="text-red-600"
            onClick={() => handleRemoveIcon(idx)}
          >
            Remove IconText
          </button>
        </div>
      ))}
      <button
        type="button"
        className="px-3 py-1 bg-green-600 text-white rounded"
        onClick={handleAddIcon}
      >
        Add IconText
      </button>
    </section>
  );
}