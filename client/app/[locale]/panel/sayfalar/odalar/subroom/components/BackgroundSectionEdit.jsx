import ImageUploadInput from "@/app/[locale]/panel/components/ImageUploadInput";
const langs = ["tr", "en", "de", "ru"];

export default function BackgroundSectionEdit({ data, setData }) {
  const bg = data.backgroundSection || {
    span: { tr: "", en: "", de: "", ru: "" },
    header: { tr: "", en: "", de: "", ru: "" },
    texts: [
      { tr: "", en: "", de: "", ru: "" },
      { tr: "", en: "", de: "", ru: "" },
      { tr: "", en: "", de: "", ru: "" }
    ],
    link: "",
    img: ""
  };

  const handleChange = (field, value, idx, lang) => {
    setData(prev => {
      const updated = { ...bg };
      if (field === "img" || field === "link") {
        updated[field] = value;
      } else if (field === "span" || field === "header") {
        updated[field][lang] = value;
      } else if (field === "texts") {
        updated.texts[idx][lang] = value;
      }
      return { ...prev, backgroundSection: updated };
    });
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">Background Section</h3>
      <div className="mb-3">
        <label className="font-semibold block mb-1">Görsel</label>
        <ImageUploadInput value={bg.img} onChange={val => handleChange("img", val)} />
      </div>
      {["span", "header"].map(field => (
        <div key={field} className="mb-3">
          <label className="font-semibold block mb-1">{field}</label>
          <div className="grid grid-cols-2 gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2"
                placeholder={`${field} (${lang})`}
                value={bg[field]?.[lang] || ""}
                onChange={e => handleChange(field, e.target.value, null, lang)}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="mb-3">
        <label className="font-semibold block mb-1">Açıklama Paragrafları</label>
        {bg.texts.map((text, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 mb-2">
            {langs.map(lang => (
              <input
                key={lang}
                className="border p-2"
                placeholder={`Açıklama ${i + 1} (${lang})`}
                value={text?.[lang] || ""}
                onChange={e => handleChange("texts", e.target.value, i, lang)}
              />
            ))}
          </div>
        ))}
      </div>
      <input
        className="border p-2 w-full"
        placeholder="Link"
        value={bg.link || ""}
        onChange={e => handleChange("link", e.target.value)}
      />
    </div>
  );
}
