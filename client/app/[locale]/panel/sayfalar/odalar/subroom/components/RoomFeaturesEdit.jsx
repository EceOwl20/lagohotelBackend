const langs = ["tr", "en", "de", "ru"];

export default function RoomFeaturesEdit({ data, setData }) {
  const features = data.features || {
    span: { tr: "", en: "", de: "", ru: "" },
    header: { tr: "", en: "", de: "", ru: "" },
    text: { tr: "", en: "", de: "", ru: "" },
    header2: { tr: "", en: "", de: "", ru: "" },
    header3: { tr: "", en: "", de: "", ru: "" },
    text2: { tr: "", en: "", de: "", ru: "" },
    iconsTexts: [{ tr: "", en: "", de: "", ru: "" }, { tr: "", en: "", de: "", ru: "" }, { tr: "", en: "", de: "", ru: "" }],
    pool: false,
    roomName: "",
  };

  const handleChange = (field, value, idx, lang) => {
    setData(prev => {
      const updated = { ...features };
      if (field === "iconsTexts") {
        updated.iconsTexts[idx][lang] = value;
      } else if (typeof updated[field] === "object" && updated[field] !== null) {
        updated[field][lang] = value;
      } else {
        updated[field] = value;
      }
      return { ...prev, features: updated };
    });
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">Oda Özellikleri</h3>
      {["span", "header", "text", "header2", "header3", "text2"].map(field => (
        <div key={field} className="mb-3">
          <label className="font-semibold block mb-1">{field}</label>
          <div className="grid grid-cols-2 gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2"
                placeholder={`${field} (${lang})`}
                value={features[field]?.[lang] || ""}
                onChange={e => handleChange(field, e.target.value, null, lang)}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="mb-3">
        <label className="font-semibold block mb-1">İkon Açıklamaları</label>
        {features.iconsTexts.map((icon, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2 mb-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2"
                placeholder={`İkon ${idx + 1} (${lang})`}
                value={icon[lang] || ""}
                onChange={e => handleChange("iconsTexts", e.target.value, idx, lang)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={features.pool}
          id="pool"
          onChange={e => handleChange("pool", e.target.checked)}
        />
        <label htmlFor="pool">Havuzlu Oda</label>
      </div>
    </div>
  );
}
