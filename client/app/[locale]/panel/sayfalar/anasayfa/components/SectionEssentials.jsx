"use client";

export default function SectionEssentials({ data, setData }) {
  const langs = ["tr", "en", "de", "ru"];

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-2">🌟 Essentials Bölümü</h2>

      {langs.map((lang) => (
        <input
          key={lang}
          type="text"
          placeholder={`Alt Başlık (${lang.toUpperCase()})`}
          value={data.essentials?.subtitle?.[lang] || ""}
          onChange={(e) =>
            setData({
              ...data,
              essentials: {
                ...data.essentials,
                subtitle: {
                  ...data.essentials?.subtitle,
                  [lang]: e.target.value,
                },
              },
            })
          }
          className="w-full border p-2 rounded"
        />
      ))}

      {langs.map((lang) => (
        <input
          key={lang}
          type="text"
          placeholder={`Başlık (${lang.toUpperCase()})`}
          value={data.essentials?.title?.[lang] || ""}
          onChange={(e) =>
            setData({
              ...data,
              essentials: {
                ...data.essentials,
                title: {
                  ...data.essentials?.title,
                  [lang]: e.target.value,
                },
              },
            })
          }
          className="w-full border p-2 rounded"
        />
      ))}

      {data.essentials?.items?.map((item, index) => (
        <div key={index} className="border p-2 rounded bg-gray-50">
          <h4 className="font-semibold mb-2">Kart #{index + 1}</h4>

          {langs.map((lang) => (
            <div key={lang}>
              <label>Başlık ({lang.toUpperCase()})</label>
              <input
                type="text"
                value={item.title?.[lang] || ""}
                onChange={(e) => {
                  const updatedItems = [...data.essentials.items];
                  updatedItems[index].title = {
                    ...item.title,
                    [lang]: e.target.value,
                  };
                  setData({
                    ...data,
                    essentials: { ...data.essentials, items: updatedItems },
                  });
                }}
                className="w-full border p-2 rounded mb-2"
              />

              <label>Açıklama ({lang.toUpperCase()})</label>
              <textarea
                rows={2}
                value={item.description?.[lang] || ""}
                onChange={(e) => {
                  const updatedItems = [...data.essentials.items];
                  updatedItems[index].description = {
                    ...item.description,
                    [lang]: e.target.value,
                  };
                  setData({
                    ...data,
                    essentials: { ...data.essentials, items: updatedItems },
                  });
                }}
                className="w-full border p-2 rounded"
              />
            </div>
          ))}

          <label>Link</label>
          <input
            type="text"
            value={item.link}
            onChange={(e) => {
              const updatedItems = [...data.essentials.items];
              updatedItems[index].link = e.target.value;
              setData({
                ...data,
                essentials: { ...data.essentials, items: updatedItems },
              });
            }}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
    </div>
  );
}