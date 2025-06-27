"use client";
export default function SpaReverseEdit({ data, setData, langs }) {
  const value = data.spaReverse || {};

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Spa Reverse Alanı</h4>
      <label>Görsel</label>
      <input
        type="text"
        value={value.img || ""}
        onChange={e => setData({ ...data, spaReverse: { ...value, img: e.target.value }})}
        className="w-full border p-2 rounded mb-2"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {langs.map((lang) => (
          <div key={lang}>
            <label className="font-semibold">Alt Başlık ({lang.toUpperCase()})</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-1"
              value={value.subtitle?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  spaReverse: {
                    ...value,
                    subtitle: { ...value.subtitle, [lang]: e.target.value },
                  },
                })
              }
            />
            <label className="font-semibold">Başlık ({lang.toUpperCase()})</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-1"
              value={value.title?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  spaReverse: {
                    ...value,
                    title: { ...value.title, [lang]: e.target.value },
                  },
                })
              }
            />
            <label className="font-semibold">Açıklama ({lang.toUpperCase()})</label>
            <textarea
              className="w-full border rounded p-2"
              value={value.text?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  spaReverse: {
                    ...value,
                    text: { ...value.text, [lang]: e.target.value },
                  },
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
