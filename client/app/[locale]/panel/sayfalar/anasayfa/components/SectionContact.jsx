"use client";

export default function SectionContact({ data, setData }) {
  const langs = ["tr", "en", "de", "ru"];

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-2">📞 İletişim Bölümü</h2>

      {langs.map((lang) => (
        <div key={lang}>
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.contact?.subtitle?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                contact: {
                  ...data.contact,
                  subtitle: {
                    ...data.contact?.subtitle,
                    [lang]: e.target.value,
                  },
                },
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.contact?.title?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                contact: {
                  ...data.contact,
                  title: {
                    ...data.contact?.title,
                    [lang]: e.target.value,
                  },
                },
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      <label>Adres HTML</label>
      <textarea
        rows={3}
        value={data.contact?.addressHtml || ""}
        onChange={(e) =>
          setData({
            ...data,
            contact: {
              ...data.contact,
              addressHtml: e.target.value,
            },
          })
        }
        className="w-full border p-2 rounded"
      />

      <label>Instagram Linki</label>
      <input
        type="text"
        value={data.contact?.instagram || ""}
        onChange={(e) =>
          setData({
            ...data,
            contact: {
              ...data.contact,
              instagram: e.target.value,
            },
          })
        }
        className="w-full border p-2 rounded"
      />

      <label>Facebook Linki</label>
      <input
        type="text"
        value={data.contact?.facebook || ""}
        onChange={(e) =>
          setData({
            ...data,
            contact: {
              ...data.contact,
              facebook: e.target.value,
            },
          })
        }
        className="w-full border p-2 rounded"
      />

      <label>YouTube Linki</label>
      <input
        type="text"
        value={data.contact?.youtube || ""}
        onChange={(e) =>
          setData({
            ...data,
            contact: {
              ...data.contact,
              youtube: e.target.value,
            },
          })
        }
        className="w-full border p-2 rounded"
      />
    </div>
  );
}