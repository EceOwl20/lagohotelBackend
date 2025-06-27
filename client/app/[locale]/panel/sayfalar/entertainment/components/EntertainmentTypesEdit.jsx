"use client";
export default function EntertainmentTypesEdit({ data, setData, langs }) {
  const types = data.entertainmentTypes || [];

  const addType = () => {
    setData({
      ...data,
      entertainmentTypes: [
        ...types,
        {
          image: "",
          title: { tr: "", en: "", de: "", ru: "" },
          category: { tr: "", en: "", de: "", ru: "" },
          description: { tr: "", en: "", de: "", ru: "" },
          link: "",
        },
      ]
    });
  };

  const removeType = idx => {
    setData({
      ...data,
      entertainmentTypes: types.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Aktivite Kartları</h4>
      <button type="button" className="mb-3 px-4 py-1 bg-green-600 text-white rounded" onClick={addType}>+ Kart Ekle</button>
      {types.map((item, idx) => (
        <div key={idx} className="border p-3 rounded mb-2 bg-white space-y-1">
          <button type="button" className="mb-2 px-3 py-1 bg-red-500 text-white rounded" onClick={() => removeType(idx)}>Sil</button>
          <label>Görsel URL</label>
          <input
            type="text"
            value={item.image || ""}
            onChange={e => {
              const updated = [...types];
              updated[idx].image = e.target.value;
              setData({ ...data, entertainmentTypes: updated });
            }}
            className="w-full border p-2 rounded mb-2"
          />
          {langs.map(lang => (
            <div key={lang}>
              <label>Başlık ({lang.toUpperCase()})</label>
              <input
                type="text"
                value={item.title?.[lang] || ""}
                onChange={e => {
                  const updated = [...types];
                  updated[idx].title = { ...item.title, [lang]: e.target.value };
                  setData({ ...data, entertainmentTypes: updated });
                }}
                className="w-full border p-2 rounded mb-1"
              />
              <label>Kategori ({lang.toUpperCase()})</label>
              <input
                type="text"
                value={item.category?.[lang] || ""}
                onChange={e => {
                  const updated = [...types];
                  updated[idx].category = { ...item.category, [lang]: e.target.value };
                  setData({ ...data, entertainmentTypes: updated });
                }}
                className="w-full border p-2 rounded mb-1"
              />
              <label>Açıklama ({lang.toUpperCase()})</label>
              <textarea
                value={item.description?.[lang] || ""}
                onChange={e => {
                  const updated = [...types];
                  updated[idx].description = { ...item.description, [lang]: e.target.value };
                  setData({ ...data, entertainmentTypes: updated });
                }}
                className="w-full border p-2 rounded mb-1"
              />
            </div>
          ))}
          <label>Link</label>
          <input
            type="text"
            value={item.link || ""}
            onChange={e => {
              const updated = [...types];
              updated[idx].link = e.target.value;
              setData({ ...data, entertainmentTypes: updated });
            }}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
    </div>
  );
}
