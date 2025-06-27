import ImageUploadInput from "../../../components/ImageUploadInput";

export default function MainBanner2Edit({ data, setData, langs }) {
  const value = data.mainBanner2 || {};

  const handleChange = (field, langOrValue, value2) => {
    setData(prev => ({
      ...prev,
      mainBanner2: {
        ...prev.mainBanner2,
        [field]:
          langOrValue && typeof value2 === "string"
            ? { ...(prev.mainBanner2?.[field] || {}), [langOrValue]: value2 }
            : value2,
      },
    }));
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-3">Main Banner</h3>
      <ImageUploadInput
        value={value.img || ""}
        onChange={url => handleChange("img", null, url)}
      />
      {["span", "header"].map(field => (
        <div key={field} className="mb-3">
          <label className="block font-bold mb-1">{field}</label>
          {langs.map(lang => (
            <input
              key={lang}
              className="border p-2 w-full mb-2"
              placeholder={`${field} (${lang})`}
              value={value?.[field]?.[lang] || ""}
              onChange={e => handleChange(field, lang, e.target.value)}
            />
          ))}
        </div>
      ))}
      <div className="mb-2">
        <label className="block font-bold mb-1">Opacity</label>
        <input
          type="checkbox"
          checked={!!value.opacity}
          onChange={e => handleChange("opacity", null, e.target.checked)}
        />
      </div>
    </div>
  );
}
