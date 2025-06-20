"use client";

export default function Section1({ data, setData }) {
  const languages = ["tr", "en", "de", "ru"];

  return (
    <div className="border p-4 rounded bg-white space-y-4">
      <h2 className="text-xl font-bold mb-2">🎯 Section 1 (Giriş Bloğu)</h2>

      {languages.map((lang) => (
        <div key={lang} className="mb-4 border-b pb-4">
          <label className="block font-semibold">Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.section1?.title?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                section1: {
                  ...data.section1,
                  title: { ...data.section1?.title, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block font-semibold">Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.section1?.subtitle?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                section1: {
                  ...data.section1,
                  subtitle: { ...data.section1?.subtitle, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block font-semibold">Açıklama ({lang.toUpperCase()})</label>
          <textarea
            rows={3}
            value={data.section1?.text?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                section1: {
                  ...data.section1,
                  text: { ...data.section1?.text, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block font-semibold">Buton Metni ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.section1?.discoverMoreText?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                section1: {
                  ...data.section1,
                  discoverMoreText: { ...data.section1?.discoverMoreText, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded mb-2"
          />

          <label className="block font-semibold">Buton Linki ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={data.section1?.discoverMoreLink?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                section1: {
                  ...data.section1,
                  discoverMoreLink: { ...data.section1?.discoverMoreLink, [lang]: e.target.value }
                }
              })
            }
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
    </div>
  );
}