
const langs = ["tr", "en", "de", "ru"];

export default function SectionEssentials({ data, setData }) {
  // 1. Essentials altındaki item ekle
  const addItem = () => {
    const emptyItem = {
      title: { tr: "", en: "", de: "", ru: "" },
      description: { tr: "", en: "", de: "", ru: "" },
      icon: "",   // string, ör: "Beach"
      link: "",
    };
    setData({
      ...data,
      essentials: {
        ...data.essentials,
        items: [...(data.essentials?.items || []), emptyItem],
      },
    });
  };

  // 2. Item sil
  const removeItem = (idx) => {
    const updated = [...(data.essentials?.items || [])];
    updated.splice(idx, 1);
    setData({
      ...data,
      essentials: { ...data.essentials, items: updated },
    });
  };

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-4">✨ Essentials Bölümü</h2>
      
      {/* Subtitle & Title */}
      {langs.map(lang => (
        <div key={lang} className="grid grid-cols-2 gap-2">
          <input
            placeholder={`Alt Başlık (${lang.toUpperCase()})`}
            value={data.essentials?.subtitle?.[lang] || ""}
            onChange={e =>
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
            className="border p-2 rounded"
          />
          <input
            placeholder={`Başlık (${lang.toUpperCase()})`}
            value={data.essentials?.title?.[lang] || ""}
            onChange={e =>
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
            className="border p-2 rounded"
          />
        </div>
      ))}

      {/* Item Listesi */}
      {(data.essentials?.items || []).map((item, idx) => (
        <div key={idx} className="border rounded bg-gray-50 p-3 my-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Özellik #{idx + 1}</span>
            <button
              type="button"
              className="px-2 py-1 text-red-600 hover:bg-red-100 rounded"
              onClick={() => removeItem(idx)}
            >
              Sil
            </button>
          </div>
          {langs.map(lang => (
            <div key={lang} className="mb-2 grid grid-cols-2 gap-2">
              <input
                placeholder={`Başlık (${lang.toUpperCase()})`}
                value={item.title?.[lang] || ""}
                onChange={e => {
                  const updated = [...data.essentials.items];
                  updated[idx].title = { ...item.title, [lang]: e.target.value };
                  setData({
                    ...data,
                    essentials: { ...data.essentials, items: updated },
                  });
                }}
                className="border p-2 rounded"
              />
              <input
                placeholder={`Açıklama (${lang.toUpperCase()})`}
                value={item.description?.[lang] || ""}
                onChange={e => {
                  const updated = [...data.essentials.items];
                  updated[idx].description = { ...item.description, [lang]: e.target.value };
                  setData({
                    ...data,
                    essentials: { ...data.essentials, items: updated },
                  });
                }}
                className="border p-2 rounded"
              />
            </div>
          ))}
          <input
            placeholder="Icon adı (örn: Beach, Pool)"
            value={item.icon || ""}
            onChange={e => {
              const updated = [...data.essentials.items];
              updated[idx].icon = e.target.value;
              setData({
                ...data,
                essentials: { ...data.essentials, items: updated },
              });
            }}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            placeholder="Link"
            value={item.link || ""}
            onChange={e => {
              const updated = [...data.essentials.items];
              updated[idx].link = e.target.value;
              setData({
                ...data,
                essentials: { ...data.essentials, items: updated },
              });
            }}
            className="border p-2 rounded w-full"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Özellik Ekle
      </button>

      {/* Buton Text ve Link (4 dil) */}
      <div className="mt-6">
        {langs.map(lang => (
          <div key={lang} className="flex gap-2 mb-2">
            <input
              placeholder={`Buton Metni (${lang.toUpperCase()})`}
              value={data.essentials?.buttonText?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  essentials: {
                    ...data.essentials,
                    buttonText: {
                      ...data.essentials?.buttonText,
                      [lang]: e.target.value,
                    },
                  },
                })
              }
              className="border p-2 rounded"
            />
            <input
              placeholder={`Buton Link (${lang.toUpperCase()})`}
              value={data.essentials?.buttonLink?.[lang] || ""}
              onChange={e =>
                setData({
                  ...data,
                  essentials: {
                    ...data.essentials,
                    buttonLink: {
                      ...data.essentials?.buttonLink,
                      [lang]: e.target.value,
                    },
                  },
                })
              }
              className="border p-2 rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
