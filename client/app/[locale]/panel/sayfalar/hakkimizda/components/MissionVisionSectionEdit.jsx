
import ImageUploadInput from "../../../components/ImageUploadInput";

export default function MissionVisionSectionEdit({ data, setData, langs }) {
  const section = data.missionVisionSection || {};

  const handleLangField = (field, lang, val) => {
    setData(prev => ({
      ...prev,
      missionVisionSection: {
        ...prev.missionVisionSection,
        [field]: {
          ...(prev.missionVisionSection?.[field] || {}),
          [lang]: val
        }
      }
    }));
  };

  const handleImageField = (field, url) => {
    setData(prev => ({
      ...prev,
      missionVisionSection: {
        ...prev.missionVisionSection,
        [field]: url
      }
    }));
  };

  const fields = [
    "span", "header", "text",
    "span2", "header2", "text2",
    "span3", "header3", "text3"
  ];

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-4">Misyon / Vizyon</h3>

      {fields.map(field => (
        <div key={field} className="mb-4">
          <label className="block font-semibold mb-2">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {langs.map(lang => (
              <input
                key={lang}
                type="text"
                placeholder={`${field} (${lang.toUpperCase()})`}
                value={section[field]?.[lang] || ""}
                onChange={e =>
                  handleLangField(field, lang, e.target.value)
                }
                className="border rounded p-2 w-full"
              />
            ))}
          </div>
        </div>
      ))}

      <div className="mb-4">
        <label className="block font-semibold mb-2">Sol Görsel</label>
        <ImageUploadInput
          value={section.leftImg || ""}
          onChange={url => handleImageField("leftImg", url)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Sağ Görsel</label>
        <ImageUploadInput
          value={section.rightImg || ""}
          onChange={url => handleImageField("rightImg", url)}
        />
      </div>
    </div>
  );
}
