"use client";

export default function SectionBanner({ data, setData }) {
  const langs = ["tr", "en", "de", "ru"];

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-2">📢 Banner Alanı</h2>

      {langs.map((lang) => (
        <div key={lang}>
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.banner?.subtitle?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                banner: {
                  ...data.banner,
                  subtitle: {
                    ...data.banner?.subtitle,
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
            value={data.banner?.title?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                banner: {
                  ...data.banner,
                  title: {
                    ...data.banner?.title,
                    [lang]: e.target.value,
                  },
                },
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label>Açıklama ({lang.toUpperCase()})</label>
          <textarea
            value={data.banner?.text?.[lang] || ""}
            onChange={(e) =>
              setData({
                ...data,
                banner: {
                  ...data.banner,
                  text: {
                    ...data.banner?.text,
                    [lang]: e.target.value,
                  },
                },
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      <label>Buton Metni</label>
      <input
        type="text"
        value={data.banner?.discoverMoreText || ""}
        onChange={(e) =>
          setData({
            ...data,
            banner: {
              ...data.banner,
              discoverMoreText: e.target.value,
            },
          })
        }
        className="w-full border p-2 rounded"
      />

      <label>Buton Linki</label>
      <input
        type="text"
        value={data.banner?.discoverMoreLink || ""}
        onChange={(e) =>
          setData({
            ...data,
            banner: {
              ...data.banner,
              discoverMoreLink: e.target.value,
            },
          })
        }
        className="w-full border p-2 rounded"
      />

      <label>Arka Plan Görsel URL</label>
      <input
        type="text"
        value={data.banner?.backgroundImage || ""}
        onChange={(e) =>
          setData({
            ...data,
            banner: {
              ...data.banner,
              backgroundImage: e.target.value,
            },
          })
        }
        className="w-full border p-2 rounded"
      />
    </div>
  );
}