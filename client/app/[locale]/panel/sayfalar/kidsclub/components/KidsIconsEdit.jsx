"use client";
export default function KidsIconsEdit({ data, setData, langs }) {
  const iconsSection = data.iconsSection || {};

  const handleChange = (key, lang, value) => {
    setData({
      ...data,
      iconsSection: {
        ...iconsSection,
        [key]: { ...(iconsSection[key] || {}), [lang]: value }
      }
    });
  };

  return (
    <section className="bg-gray-100 rounded-md p-4 mb-6">
      <h3 className="font-bold text-xl mb-2">Kids Icons Section</h3>
      {["icon1", "icon2", "icon3", "icon4"].map((key, i) => (
        <div key={key} className="mb-2">
          <label className="block font-semibold mb-1">{`İkon ${i + 1}`}</label>
          <div className="flex gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                placeholder={lang.toUpperCase()}
                className="border p-2 rounded w-full"
                value={iconsSection?.[key]?.[lang] || ""}
                onChange={e => handleChange(key, lang, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
