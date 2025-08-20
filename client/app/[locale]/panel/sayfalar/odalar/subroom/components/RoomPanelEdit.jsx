
import React from "react";
const langs = ["tr", "en", "de", "ru"];

export default function RoomPanelEdit({ room, onSave }) {
  const [edit, setEdit] = React.useState(room);

  // Banner textleri array olarak tutulduğu için özel bir fonksiyon
  const handleTextsChange = (idx, lang, value) => {
    const texts = edit.banner.texts ? [...edit.banner.texts] : Array(3).fill({ tr:"", en:"", de:"", ru:"" });
    if (!texts[idx]) texts[idx] = { tr:"", en:"", de:"", ru:"" };
    texts[idx][lang] = value;
    setEdit(prev => ({
      ...prev,
      banner: { ...prev.banner, texts }
    }));
  };

  return (
    <div className="p-4 bg-white rounded space-y-6 shadow">
      <h2 className="text-xl font-bold mb-2">Banner Ayarları</h2>

      <label className="font-semibold block mb-1">Banner Resmi (URL)</label>
      <input
        type="text"
        value={edit.banner?.image || ""}
        onChange={e => setEdit(prev => ({
          ...prev,
          banner: { ...prev.banner, image: e.target.value }
        }))}
        className="w-full border p-2 rounded mb-2"
      />

      <div className="mb-2">
        <label className="font-semibold block mb-1">Başlık</label>
        {langs.map(lang => (
          <input
            key={lang}
            type="text"
            placeholder={`Başlık (${lang.toUpperCase()})`}
            value={edit.banner?.title?.[lang] || ""}
            onChange={e =>
              setEdit(prev => ({
                ...prev,
                banner: {
                  ...prev.banner,
                  title: {
                    ...prev.banner?.title,
                    [lang]: e.target.value,
                  }
                }
              }))
            }
            className="w-full border p-2 rounded mb-2"
          />
        ))}
      </div>

      <div>
        <label className="font-semibold block mb-1">Span (Alt Başlık)</label>
        {langs.map(lang => (
          <input
            key={lang}
            type="text"
            placeholder={`Span (${lang.toUpperCase()})`}
            value={edit.banner?.span?.[lang] || ""}
            onChange={e =>
              setEdit(prev => ({
                ...prev,
                banner: {
                  ...prev.banner,
                  span: {
                    ...prev.banner?.span,
                    [lang]: e.target.value,
                  }
                }
              }))
            }
            className="w-full border p-2 rounded mb-2"
          />
        ))}
      </div>

      <div>
        <label className="font-semibold block mb-1">Texts (Metinler, 3 Satır)</label>
        {[0, 1, 2].map(idx => (
          <div key={idx} className="mb-3 border p-2 rounded">
            <span className="block font-bold">Metin {idx + 1}</span>
            {langs.map(lang => (
              <input
                key={lang}
                type="text"
                placeholder={`Metin ${idx + 1} (${lang.toUpperCase()})`}
                value={edit.banner?.texts?.[idx]?.[lang] || ""}
                onChange={e => handleTextsChange(idx, lang, e.target.value)}
                className="w-full border p-2 rounded mb-1"
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center mt-4">
        <label className="font-semibold">Baby Özelliği</label>
        <input
          type="checkbox"
          checked={!!edit.banner?.baby}
          onChange={e =>
            setEdit(prev => ({
              ...prev,
              banner: { ...prev.banner, baby: e.target.checked }
            }))
          }
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => onSave(edit)}
      >
        Kaydet
      </button>
    </div>
  );
}
