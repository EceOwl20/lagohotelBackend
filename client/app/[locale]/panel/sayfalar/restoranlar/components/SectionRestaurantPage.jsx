import React from "react";
const langs = ["tr", "en", "de", "ru"];

export default function SectionRestaurantPage({ data, setData }) {
  // mainBanner örneği (diğer blokları da benzer şekilde çoğalt)
  return (
    <div className="border p-4 bg-white rounded space-y-6">
      <h2 className="text-xl font-bold">🍽️ Restaurant Sayfası</h2>
      <h3 className="font-semibold">Ana Banner</h3>
      <label>Banner Görsel URL</label>
      <input
        type="text"
        value={data.mainBanner?.image || ""}
        onChange={e => setData({
          ...data,
          mainBanner: { ...data.mainBanner, image: e.target.value }
        })}
        className="w-full border p-2 rounded mb-2"
      />
      {langs.map(lang => (
        <div key={lang}>
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.mainBanner?.subtitle?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainBanner: {
                  ...data.mainBanner,
                  subtitle: { ...data.mainBanner?.subtitle, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-2"
          />
          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.mainBanner?.title?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainBanner: {
                  ...data.mainBanner,
                  title: { ...data.mainBanner?.title, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-2"
          />
          <label>Açıklama ({lang.toUpperCase()})</label>
          <textarea
            value={data.mainBanner?.text?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                mainBanner: {
                  ...data.mainBanner,
                  text: { ...data.mainBanner?.text, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-2"
          />
        </div>
      ))}

      {/* Devamında diğer bloklar: clinaryInfo, mainRestaurantSection, cuisines, ... */}
      {/* Her blok için benzer çok dilli yapı ve input'lar */}
    </div>
  );
}
