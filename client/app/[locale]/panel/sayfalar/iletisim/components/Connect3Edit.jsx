"use client";
export default function Connect3Edit({ data, setData, langs }) {
  const value = data.connect3 || {};
  const handleLang = (field, lang, val) => {
    setData({
      ...data,
      connect3: {
        ...value,
        [field]: { ...value[field], [lang]: val },
      },
    });
  };
  return (
    <div className="mb-8 p-4 rounded bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Bölüm 3 (Adres & Harita)</h3>
      {langs.map(lang => (
        <div key={lang}>
          <label>Adres Başlığı ({lang})</label>
          <input type="text" value={value.addressHeader?.[lang] || ""} onChange={e => handleLang("addressHeader", lang, e.target.value)} className="w-full border p-2 mb-1 rounded"/>
          <label>Adres Açıklama ({lang})</label>
          <input type="text" value={value.addressText?.[lang] || ""} onChange={e => handleLang("addressText", lang, e.target.value)} className="w-full border p-2 mb-1 rounded"/>
        </div>
      ))}
      <label>Google Maps Embed URL</label>
      <input type="text" value={value.mapEmbedUrl || ""} onChange={e => setData({ ...data, connect3: { ...value, mapEmbedUrl: e.target.value } })} className="w-full border p-2 mb-1 rounded"/>
    </div>
  );
}
