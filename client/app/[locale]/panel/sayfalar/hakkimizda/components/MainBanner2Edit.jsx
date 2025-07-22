// app/.../MainBanner2Edit.jsx
"use client";
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function MainBanner2Edit({ data, setData, langs }) {
  const value = data.mainBanner2 || {};

  const handleChange = (field, langOrValue, value2) => {
    setData(prev => ({
      ...prev,
      mainBanner2: {
        ...prev.mainBanner2,
        [field]:
          // langOrValue null ise doğrudan value2’yi ata
          langOrValue && typeof value2 === "string"
            ? { ...(prev.mainBanner2?.[field] || {}), [langOrValue]: value2 }
            : // değilse bu field’e doğrudan gelen value2’yi ata
              value2,
      },
    }));
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-3">Main Banner</h3>

      {/* Görsel upload artık ImageUploadInput ile */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Banner Görsel</label>
        <ImageUploadInput
          value={value.img || ""}
          onChange={url => handleChange("img", null, url)}
        />
      </div>

      {/* multilanguage span / header */}
      {["span", "header"].map(field => (
        <div key={field} className="mb-4">
          <label className="block font-semibold mb-1">{field}</label>
          <div className="flex flex-wrap gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2 rounded w-[180px]"
                placeholder={`${field} (${lang})`}
                value={value[field]?.[lang] || ""}
                onChange={e => handleChange(field, lang, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* opacity checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!value.opacity}
          onChange={e => handleChange("opacity", null, e.target.checked)}
        />
        <label>Opacity</label>
      </div>
    </div>
  );
}
