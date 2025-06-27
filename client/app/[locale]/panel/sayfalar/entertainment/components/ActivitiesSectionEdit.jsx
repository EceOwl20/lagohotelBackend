"use client";
export default function ActivitiesSectionEdit({ data, setData, langs }) {
  const value = data.activitiesSection || {};
  return (
    <div className="mb-8 bg-gray-50 rounded p-4">
      <h4 className="font-bold text-lg mb-2">Aktiviteler Bölümü</h4>
      {langs.map(lang => (
        <div key={lang} className="mb-4">
          <label>Alt Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={value.subtitle?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                activitiesSection: {
                  ...value,
                  subtitle: { ...value.subtitle, [lang]: e.target.value },
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Başlık ({lang.toUpperCase()})</label>
          <input
            type="text"
            value={value.title?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                activitiesSection: {
                  ...value,
                  title: { ...value.title, [lang]: e.target.value },
                }
              })
            }
            className="w-full border p-2 rounded mb-1"
          />
          <label>Açıklama ({lang.toUpperCase()})</label>
          <textarea
            value={value.text?.[lang] || ""}
            onChange={e =>
              setData({
                ...data,
                activitiesSection: {
                  ...value,
                  text: { ...value.text, [lang]: e.target.value },
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
