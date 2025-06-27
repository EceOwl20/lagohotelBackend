import ImageUploadInput from "../../../components/ImageUploadInput";

export default function MissionVisionSectionEdit({ data, setData, langs }) {
  const value = data.missionVisionSection || {};

  // Çok dilli dizi girişleri için yardımcı
  const handleTextsChange = (field, idx, lang, val) => {
    setData(prev => {
      const oldArr = prev.missionVisionSection?.[field] || [];
      const newArr = [...oldArr];
      newArr[idx] = { ...(newArr[idx] || {}), [lang]: val };
      return {
        ...prev,
        missionVisionSection: { ...prev.missionVisionSection, [field]: newArr },
      };
    });
  };

  const handleTextsAdd = field => {
    setData(prev => ({
      ...prev,
      missionVisionSection: {
        ...prev.missionVisionSection,
        [field]: [...(prev.missionVisionSection?.[field] || []), {}],
      },
    }));
  };

  const handleTextsDelete = (field, idx) => {
    setData(prev => ({
      ...prev,
      missionVisionSection: {
        ...prev.missionVisionSection,
        [field]: (prev.missionVisionSection?.[field] || []).filter((_, i) => i !== idx),
      },
    }));
  };

  return (
    <div className="border p-4 rounded bg-white mb-8">
      <h3 className="font-bold text-lg mb-3">Misyon / Vizyon</h3>
      {["texts", "texts2", "texts3"].map(field => (
        <div key={field} className="mb-4">
          <label className="block font-bold mb-1">{field}</label>
          {(value[field] || []).map((obj, idx) => (
            <div key={idx} className="flex flex-row items-center gap-2 mb-2">
              {langs.map(lang => (
                <input
                  key={lang}
                  className="border p-2 w-1/4"
                  placeholder={`${field} (${lang})`}
                  value={obj?.[lang] || ""}
                  onChange={e =>
                    handleTextsChange(field, idx, lang, e.target.value)
                  }
                />
              ))}
              <button
                type="button"
                className="ml-2 text-red-600"
                onClick={() => handleTextsDelete(field, idx)}
              >
                Sil
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-1 px-3 py-1 border rounded"
            onClick={() => handleTextsAdd(field)}
          >
            + {field} Ekle
          </button>
        </div>
      ))}
      <div className="mb-2 flex gap-3">
        <ImageUploadInput
          value={value.leftImg || ""}
          onChange={url =>
            setData(prev => ({
              ...prev,
              missionVisionSection: { ...prev.missionVisionSection, leftImg: url },
            }))
          }
        />
        <ImageUploadInput
          value={value.rightImg || ""}
          onChange={url =>
            setData(prev => ({
              ...prev,
              missionVisionSection: { ...prev.missionVisionSection, rightImg: url },
            }))
          }
        />
      </div>
      <div className="mb-2">
        <label className="block">Show Link</label>
        <input
          type="checkbox"
          checked={!!value.showLink}
          onChange={e =>
            setData(prev => ({
              ...prev,
              missionVisionSection: { ...prev.missionVisionSection, showLink: e.target.checked },
            }))
          }
        />
      </div>
      <div className="mb-2">
        <label className="block">Button Text</label>
        {langs.map(lang => (
          <input
            key={lang}
            className="border p-2 w-full mb-2"
            placeholder={`buttonText (${lang})`}
            value={value.buttonText?.[lang] || ""}
            onChange={e =>
              setData(prev => ({
                ...prev,
                missionVisionSection: {
                  ...prev.missionVisionSection,
                  buttonText: { ...(value.buttonText || {}), [lang]: e.target.value },
                },
              }))
            }
          />
        ))}
      </div>
    </div>
  );
}
